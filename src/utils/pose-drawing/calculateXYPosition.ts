import { videoConfig } from "../constants";

export function calculateXYPosition(
  event: MouseEvent | TouchEvent,
  canvas: HTMLCanvasElement
) {
  const rect = canvas.getBoundingClientRect();
  const offsetX =
    (rect as DOMRect).width > videoConfig.video.width
      ? (videoConfig.video.width /
          (videoConfig.video.height / (rect as DOMRect).height) -
          (rect as DOMRect).width) /
        2
      : 0;
  const offsetY =
    (rect as DOMRect).height > videoConfig.video.height
      ? (videoConfig.video.height /
          (videoConfig.video.width / (rect as DOMRect).width) -
          (rect as DOMRect).height) /
        2
      : 0;
  const scale =
    offsetX === 0
      ? videoConfig.video.width / (rect as DOMRect).width
      : offsetY === 0
      ? videoConfig.video.height / (rect as DOMRect).height
      : 1;

  const x =
    event instanceof MouseEvent
      ? event.clientX - (rect as DOMRect).left
      : event.touches[0].clientX - (rect as DOMRect).left;
  const y =
    event instanceof MouseEvent
      ? event.clientY - (rect as DOMRect).top
      : event.touches[0].clientY - (rect as DOMRect).top;
  const canvasX = (x + offsetX) * scale;
  const canvasY = (y + offsetY) * scale;

  return [canvasX, canvasY];
}
