import {Keypoint} from "../pose-detection";
import {FaceDirection} from "../constants";
import {Angle} from "../types";
import {FITTING_CONNECTED_KEYPOINTS_ANGLES} from "../pose-detection/constants";

export function generateAnglesFromPoints(
    keypoints: Keypoint[],
    faceDirection: FaceDirection
): Angle[] {
    return FITTING_CONNECTED_KEYPOINTS_ANGLES[faceDirection].map(
        (pointNames) => ({
            point1: keypoints.find((el) => el.name === pointNames[0]) as Keypoint,
            point2: keypoints.find((el) => el.name === pointNames[1]) as Keypoint,
            point3: keypoints.find((el) => el.name === pointNames[2]) as Keypoint,
        })
    );
}

export function calculateAngles(
    point1: Keypoint,
    point2: Keypoint,
    point3: Keypoint
): [number, number] {
    const angle1 = Math.atan2(point1.y - point2.y, point1.x - point2.x);
    const angle2 = Math.atan2(point3.y - point2.y, point3.x - point2.x);
    return [angle1, angle2];
}