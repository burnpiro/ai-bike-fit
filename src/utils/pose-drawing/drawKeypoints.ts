import { Keypoint } from "../pose-detection";
import { DEFAULT_LINE_WIDTH, DEFAULT_RADIUS } from "../pose-detection/params";

function drawKeypoint(
  keypoint: Keypoint,
  ctx: CanvasRenderingContext2D,
  radius = DEFAULT_RADIUS
) {
  const circle = new Path2D();
  circle.arc(keypoint.x, keypoint.y, radius, 0, 2 * Math.PI);
  ctx.fill(circle);
  ctx.stroke(circle);
}

export function drawKeypoints(
  keypoints: Keypoint[],
  ctx: CanvasRenderingContext2D
) {
  ctx.fillStyle = "Red";
  ctx.strokeStyle = "White";
  ctx.lineWidth = DEFAULT_LINE_WIDTH;

  for (const keypoint of keypoints) {
    if (keypoint.selected) {
      ctx.strokeStyle = "red";
    } else {
      ctx.strokeStyle = "white";
    }
    drawKeypoint(
      keypoint,
      ctx,
      keypoint.selected ? DEFAULT_RADIUS * 2 : DEFAULT_RADIUS
    );
  }
}
