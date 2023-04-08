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
import {handlePinch, PinchState} from "../../utils/eventHelpers/pinchEventHandler";

// ----------------------------------------------------------------------

const ResultCanvas = styled("canvas")({
  top: 0,
  width: "100%",
  height: "100%",
  maxHeight: "100%",
  objectFit: "contain",
  position: "absolute",
});

// --------
interface PositionCanvasProps {
  selectedPoints: PoseWithTimestamp["pose"]["keypoints"];
  faceDirection: FaceDirection;
  threshold?: number;
  scale?: number;
  translate?: string;
  onKeypointChange?: (keypoint: Keypoint) => void;
  onScaleChange?: (newScale: number, newTransform: string) => void;
}

let prevTouch: Touch | null = null;
let pinchState: PinchState | null = null;

export default function PositionCanvas({
  selectedPoints,
  faceDirection = FaceDirection.LEFT,
  onKeypointChange,
  onScaleChange,
  translate = "",
  scale = 1,
  threshold = 0.4,
}: PositionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<Keypoint | undefined>();

  useEffect(() => {
    const handlePinchStart = (event: TouchEvent) => {
      if (event.touches.length > 1) {
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];

        pinchState = {
          initialPinchDistance: Math.sqrt(
            (touch1.pageX - touch2.pageX) ** 2 +
              (touch1.pageY - touch2.pageY) ** 2
          ),
          initialScale: scale || 1,
          initialX: touch1.pageX,
          initialY: touch1.pageY,
          x:
            parseFloat(
              translate.replace(/.*translate\(\s*(.*)\s*,\s*(.*)\s*\).*/, "$1")
            ) || 0,
          y:
            parseFloat(
              translate.replace(/.*translate\(\s*(.*)\s*,\s*(.*)\s*\).*/, "$2")
            ) || 0,
        };
      }
    };
    const handleKeypointMove = (event: TouchEvent) => {
      event.preventDefault(); // Prevent default pinch gesture behavior
      if (event.touches.length > 1) {
        const [newScale, newTransform] = handlePinch(pinchState, event, scale, translate);
        if (onScaleChange) {
          onScaleChange(newScale, newTransform);
        }
      } else if (selectedPoint) {
        const currTouch = event.changedTouches[0];

        let deltaX = 0;
        let deltaY = 0;
        if (prevTouch) {
          deltaX = currTouch.clientX - prevTouch.clientX;
          deltaY = currTouch.clientY - prevTouch.clientY;
        }

        prevTouch = currTouch;

        setSelectedPoint({
          ...selectedPoint,
          x: selectedPoint.x + deltaX,
          y: selectedPoint.y + deltaY,
        });
      }
    };

    const clearPrevTouch = () => {
      prevTouch = null;
      pinchState = null;
      if (onKeypointChange && selectedPoint) {
        onKeypointChange({
          ...selectedPoint,
          x: selectedPoint.x,
          y: selectedPoint.y,
        });
      }
    };

    if (canvasRef.current) {
      canvasRef.current.addEventListener("touchstart", handlePinchStart);
      canvasRef.current.addEventListener("touchmove", handleKeypointMove);
      canvasRef.current.addEventListener("touchend", clearPrevTouch);

      return () => {
        canvasRef.current?.removeEventListener("touchstart", handlePinchStart);
        canvasRef.current?.removeEventListener("touchmove", handleKeypointMove);
        canvasRef.current?.removeEventListener("touchend", clearPrevTouch);
      };
    }
  }, [onKeypointChange, onScaleChange, canvasRef.current, selectedPoint]);

  useEffect(() => {
    if (canvasRef.current) {
      drawPose(
        selectedPoints.map((point) => {
          if (selectedPoint && selectedPoint.name === point.name) {
            return {
              ...selectedPoint,
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
      const handleCanvasClick = (event: MouseEvent) => {
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

  return (
    <ResultCanvas
      id={"keypoints_canvas"}
      ref={canvasRef}
      width={videoConfig.video.width}
      height={videoConfig.video.height}
      sx={{
        transform: `${scale ? `scale(${scale})` : "scale(1)"} ${
          translate ? translate : ""
        }`,
      }}
    ></ResultCanvas>
  );
}
