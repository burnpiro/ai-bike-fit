import { useRef, useEffect, useState } from "react";
// @mui
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { PoseWithTimestamp } from "../../utils/types";
import {
  FaceDirection,
  MAX_TOUCH_DISTANCE_TO_POINT,
  videoConfig,
} from "../../utils/constants";
import { FITTING_KEYPOINTS_BY_SIDE } from "../../utils/pose-detection/constants";
import { drawPose } from "../../utils/pose-drawing";
import { Keypoint } from "../../utils/pose-detection";
import { calculateXYPosition } from "../../utils/pose-drawing/calculateXYPosition";
import { getClosestPoint } from "../../utils/pose-drawing/calculateDistanceToPoints";

// ----------------------------------------------------------------------

const ResultCanvas = styled("canvas")({
  top: 0,
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  position: "absolute",
});

let initialPinchDistance: number | null = null;

interface PinchEvent extends TouchEvent {
  scale: number;
}

function calculateNewScale(event: PinchEvent, initialScale: number) {
  const target = event.target as HTMLCanvasElement;

  // Calculate pinch distance
  const touch1 = event.touches[0];
  const touch2 = event.touches[1];
  const pinchDistance = Math.sqrt(
    (touch1.pageX - touch2.pageX) ** 2 + (touch1.pageY - touch2.pageY) ** 2
  );

  if (initialPinchDistance === null) {
    initialPinchDistance = pinchDistance;
  }

  return Math.max(
    1,
    Math.min((pinchDistance / initialPinchDistance) * initialScale, 4)
  );
}

// --------
interface PositionCanvasProps {
  points: PoseWithTimestamp["pose"]["keypoints"];
  faceDirection: FaceDirection;
  threshold?: number;
  scale?: { x: number; y: number };
  onKeypointChange?: (keypoint: Keypoint) => void;
}

export default function PositionCanvas({
  points,
  faceDirection = FaceDirection.LEFT,
  onKeypointChange,
  threshold = 0.4,
}: PositionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState<number>(1);
  const [selectedPoints, setSelectedPoints] =
    useState<PoseWithTimestamp["pose"]["keypoints"]>(points);
  const [selectedPoint, setSelectedPoint] = useState<Keypoint | undefined>();

  useEffect(() => {
    if (canvasRef.current) {
      const newSelectedPoints = points.filter((point) => {
        switch (faceDirection) {
          case FaceDirection.LEFT:
            return FITTING_KEYPOINTS_BY_SIDE[FaceDirection.LEFT].includes(
              point.name as string
            );
          case FaceDirection.RIGHT:
            return FITTING_KEYPOINTS_BY_SIDE[FaceDirection.RIGHT].includes(
              point.name as string
            );
          default:
            return false;
        }
      });

      setSelectedPoints(newSelectedPoints);
    }
  }, [points, faceDirection, canvasRef.current, selectedPoint]);

  useEffect(() => {
    if (canvasRef.current) {
      drawPose(
        selectedPoints.map((point) => {
          if (selectedPoint && selectedPoint.name === point.name) {
            return {
              ...point,
              selected: true,
            };
          }
          return point;
        }),
        canvasRef.current,
        faceDirection,
        true,
        true
      );
    }
  }, [canvasRef.current, selectedPoint, selectedPoints]);

  useEffect(() => {
    if (canvasRef.current && onKeypointChange) {
      const handleCanvasClick = (event: MouseEvent | TouchEvent) => {
        const [canvasX, canvasY] = calculateXYPosition(
          event,
          canvasRef.current as HTMLCanvasElement
        );

        setSelectedPoint(getClosestPoint(canvasX, canvasY, selectedPoints));
      };

      canvasRef.current.addEventListener("click", handleCanvasClick);

      return () => {
        canvasRef.current?.removeEventListener("click", handleCanvasClick);
      };
    }
  }, [canvasRef.current, onKeypointChange]);

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 2) {
      event.preventDefault(); // Prevent default pinch gesture behavior
      const newScale = calculateNewScale(event as PinchEvent, scale);
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    initialPinchDistance = null;
  };

  return (
    <ResultCanvas
      id={"keypoints_canvas"}
      ref={canvasRef}
      width={videoConfig.video.width}
      height={videoConfig.video.height}
      sx={{ transform: `scale(${scale}, ${scale})` }}
    ></ResultCanvas>
  );
}
