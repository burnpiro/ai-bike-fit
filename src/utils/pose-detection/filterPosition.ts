import { PoseWithTimestamp } from "../types";
import { KEYPOINT_NAMES } from "./constants";
import { Keypoint } from "./calculators/interfaces/common_interfaces";

export function filterPosition(
  poses: PoseWithTimestamp[],
  poseName: (typeof KEYPOINT_NAMES)[keyof typeof KEYPOINT_NAMES],
  condition: (a: Keypoint, b: Keypoint) => boolean
) {
  return poses.reduce<PoseWithTimestamp>((acc, currPose) => {
    const accPoseAnklePos = acc.pose.keypoints.find(
      (keypoint) => keypoint.name === poseName
    );
    const currPoseAnklePos = currPose.pose.keypoints.find(
      (keypoint) => keypoint.name === poseName
    );

    if (!accPoseAnklePos) {
      return currPose;
    }

    if (
      currPoseAnklePos &&
      accPoseAnklePos &&
      condition(currPoseAnklePos, accPoseAnklePos)
    ) {
      return currPose;
    }

    return acc;
  }, poses[0]);
}
