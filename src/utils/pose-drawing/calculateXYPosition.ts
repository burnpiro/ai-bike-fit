import { videoConfig } from "../constants";

export function calculateXYPosition(
  event: MouseEvent,
  canvas: HTMLCanvasElement
) {
  const rect = canvas.getBoundingClientRect();
  const actualWidth = canvas.clientWidth;
  const actualHeight = canvas.clientHeight;

  const offsetX =
    actualWidth > videoConfig.video.width
      ? (videoConfig.video.width / (videoConfig.video.height / actualHeight) -
          actualWidth) /
        2
      : 0;
  const offsetY =
    actualHeight > videoConfig.video.height
      ? (videoConfig.video.height / (videoConfig.video.width / actualWidth) -
          actualHeight) /
        2
      : 0;

  const scale =
    offsetX === 0
      ? videoConfig.video.width / actualWidth
      : offsetY === 0
      ? videoConfig.video.height / actualHeight
      : 1;

  const x = event.offsetX;
  const y = event.offsetY;
  const canvasX = (x + offsetX) * scale;
  const canvasY = (y + offsetY) * scale;

  return [canvasX, canvasY];
}
