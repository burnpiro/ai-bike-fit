export interface PinchState {
  initialPinchDistance: number;
  initialScale: number;
  initialX: number;
  initialY: number;
  x: number;
  y: number;
}

let currScale: number = 1;

export const handlePinch = (
  pinchState: PinchState | null,
  event: TouchEvent,
  initScale: number,
  translate?: string
): [number, string] => {
  if (pinchState) {
    // Calculate pinch distance
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    const currentPinchDistance = Math.sqrt(
      (touch1.pageX - touch2.pageX) ** 2 + (touch1.pageY - touch2.pageY) ** 2
    );
    const currScale = Math.max(
      1,
      Math.min(
        (currentPinchDistance / pinchState.initialPinchDistance) * initScale,
        4
      )
    );

    const dx = touch1.pageX - pinchState.initialX + pinchState.x;
    const dy = touch1.pageY - pinchState.initialY + pinchState.y;

    return [currScale, `translate(${dx}px, ${dy}px)`];
  }

  return [currScale, ""];
};
