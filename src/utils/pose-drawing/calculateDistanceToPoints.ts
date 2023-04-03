import { Keypoint } from "../pose-detection";
import {MAX_TOUCH_DISTANCE_TO_POINT} from "../constants";

export function getClosestPoint(
  x: number,
  y: number,
  points: Keypoint[]
) {
    const closestKeypoint = points.reduce((acc, point) => {
        const distance = Math.sqrt(
            Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2)
        );
        const orgDistance = Math.sqrt(
            Math.pow(acc.x - x, 2) + Math.pow(acc.y - y, 2)
        );
        if (distance < orgDistance) {
            return point;
        }

        return acc;
    });

    if (
        Math.sqrt(
            Math.pow(closestKeypoint.x - x, 2) +
            Math.pow(closestKeypoint.y - y, 2)
        ) > MAX_TOUCH_DISTANCE_TO_POINT
    ) {
        return undefined;
    }

    return closestKeypoint
}
