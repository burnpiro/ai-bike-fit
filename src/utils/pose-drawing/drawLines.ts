import { DEFAULT_LINE_WIDTH } from "../pose-detection/params";
import { Line } from "../types";

export function drawLines(lines: Line[], ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = "blue";
  ctx.strokeStyle = "blue";
  ctx.lineWidth = DEFAULT_LINE_WIDTH;

  for (const line of lines) {
    ctx.beginPath();
    ctx.moveTo(line.fromPoint.x, line.fromPoint.y);
    ctx.lineTo(line.toPoint.x, line.toPoint.y);
    ctx.stroke();
  }
}
