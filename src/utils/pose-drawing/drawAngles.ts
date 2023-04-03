import { Angle } from "../types";
import { DEFAULT_LINE_WIDTH, DEFAULT_RADIUS } from "../pose-detection/params";
import { calculateAngles } from "../fitting";

export function drawAngles(angles: Angle[], ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "rgba(0,255,0,0.3)";
  ctx.strokeStyle = "green";
  ctx.lineWidth = DEFAULT_LINE_WIDTH * 2;

  for (const angle of angles) {
    const [startAngle, endAngle] = calculateAngles(
      angle.point1,
      angle.point2,
      angle.point3
    );
    ctx.beginPath();
    ctx.arc(
      angle.point2.x,
      angle.point2.y,
      DEFAULT_RADIUS * 8,
      endAngle,
      startAngle
    );
    ctx.fill();
    ctx.stroke();
  }
}
