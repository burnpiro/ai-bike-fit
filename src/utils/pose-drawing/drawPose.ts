import { Angle, Line, PoseWithTimestamp } from "../types";
import { drawKeypoints } from "./drawKeypoints";
import { FaceDirection } from "../constants";
import { Keypoint } from "../pose-detection";
import {
  COCO_CONNECTED_KEYPOINTS_PAIRS,
  COCO_KEYPOINTS,
  FITTING_CONNECTED_KEYPOINTS_ANGLES,
} from "../pose-detection/constants";
import { drawLines } from "./drawLines";
import { drawAngles } from "./drawAngles";
import {generateAnglesFromPoints} from "../fitting";

function generateLinesFromPointsReducer(
  acc: Line[],
  keypoint: Keypoint,
  currIdx: number,
  allPoints: Keypoint[]
): Line[] {
  const currPointIdx = COCO_KEYPOINTS.indexOf(keypoint.name as string);
  for (const pair of COCO_CONNECTED_KEYPOINTS_PAIRS) {
    if (pair[0] === currPointIdx) {
      for (const existingPoint of allPoints) {
        const existingPointIdx = COCO_KEYPOINTS.indexOf(
          existingPoint.name as string
        );
        if (existingPointIdx === pair[1]) {
          acc.push({
            fromPoint: keypoint,
            toPoint: existingPoint,
          });
        }
      }
    }
  }
  return acc;
}


export function drawPose(
  keypoints: PoseWithTimestamp["pose"]["keypoints"],
  canvas: HTMLCanvasElement,
  faceDirection: FaceDirection = FaceDirection.LEFT,
  shouldDrawLines: boolean = false,
  shouldDrawAngles: boolean = false
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw Error("Cannot get context from canvas");
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawKeypoints(keypoints, ctx);

  if (shouldDrawLines) {
    const lines: Line[] = keypoints.reduce<Line[]>(
      generateLinesFromPointsReducer,
      []
    );

    drawLines(lines, ctx);
  }

  if (shouldDrawAngles) {
    const angles: Angle[] = generateAnglesFromPoints(
      keypoints,
      faceDirection
    );

    drawAngles(angles, ctx);
  }
}
