import { useRef, useEffect, useState } from "react";
// @mui
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import { PoseWithTimestamp } from "../../utils/types";
import { FaceDirection } from "../../utils/constants";
import { FITTING_KEYPOINTS_BY_SIDE } from "../../utils/pose-detection/constants";
import { drawPose } from "../../utils/pose-drawing";

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
}

export default function PositionCanvas({
  points,
  faceDirection = FaceDirection.LEFT,
  threshold = 0.4,
}: PositionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    if (canvasRef.current) {
      const selectedPoints = points.filter((point) => {
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
      drawPose(selectedPoints, canvasRef.current, faceDirection, true, true);
    }
  }, [points, faceDirection, canvasRef.current]);

  useEffect(() => {}, [canvasRef.current]);

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
      ref={canvasRef}
      width={640}
      height={480}
      sx={{ transform: `scale(${scale}, ${scale})` }}
    ></ResultCanvas>
  );
}
