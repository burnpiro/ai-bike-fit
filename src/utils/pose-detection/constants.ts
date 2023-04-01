import {FaceDirection} from "../constants";

/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */
// Don't change the order. The order needs to be consistent with the model
// keypoint result list.
export const COCO_KEYPOINTS = [
  "nose",
  "left_eye",
  "right_eye",
  "left_ear",
  "right_ear",
  "left_shoulder",
  "right_shoulder",
  "left_elbow",
  "right_elbow",
  "left_wrist",
  "right_wrist",
  "left_hip",
  "right_hip",
  "left_knee",
  "right_knee",
  "left_ankle",
  "right_ankle",
];

export const KEYPOINT_NAMES = {
  NOSE: "nose",
  LEFT_EYE: "left_eye",
  RIGHT_EYE: "right_eye",
  LEFT_EAR: "left_ear",
  RIGHT_EAR: "right_ear",
  LEFT_SHOULDER: "left_shoulder",
  RIGHT_SHOULDER: "right_shoulder",
  LEFT_ELBOW: "left_elbow",
  RIGHT_ELBOW: "right_elbow",
  LEFT_WRIST: "left_wrist",
  RIGHT_WRIST: "right_wrist",
  LEFT_HIP: "left_hip",
  RIGHT_HIP: "right_hip",
  LEFT_KNEE: "left_knee",
  RIGHT_KNEE: "right_knee",
  LEFT_ANKLE: "left_ankle",
  RIGHT_ANKLE: "right_ankle",
};
export const COCO_KEYPOINTS_BY_SIDE = {
  left: [1, 3, 5, 7, 9, 11, 13, 15],
  right: [2, 4, 6, 8, 10, 12, 14, 16],
  middle: [0],
};

export const FITTING_KEYPOINTS_BY_SIDE = {
  [FaceDirection.LEFT]: [
    KEYPOINT_NAMES.LEFT_SHOULDER,
    KEYPOINT_NAMES.LEFT_ELBOW,
    KEYPOINT_NAMES.LEFT_WRIST,
    KEYPOINT_NAMES.LEFT_HIP,
    KEYPOINT_NAMES.LEFT_KNEE,
    KEYPOINT_NAMES.LEFT_ANKLE,
  ],
  [FaceDirection.RIGHT]: [
    KEYPOINT_NAMES.RIGHT_SHOULDER,
    KEYPOINT_NAMES.RIGHT_ELBOW,
    KEYPOINT_NAMES.RIGHT_WRIST,
    KEYPOINT_NAMES.RIGHT_HIP,
    KEYPOINT_NAMES.RIGHT_KNEE,
    KEYPOINT_NAMES.RIGHT_ANKLE,
  ],
};
export const COCO_CONNECTED_KEYPOINTS_PAIRS = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [5, 6],
  [5, 7],
  [5, 11],
  [6, 8],
  [6, 12],
  [7, 9],
  [8, 10],
  [11, 12],
  [11, 13],
  [12, 14],
  [13, 15],
  [14, 16],
];

export const FITTING_CONNECTED_KEYPOINTS_ANGLES = {
  [FaceDirection.LEFT]: [
    [
      KEYPOINT_NAMES.LEFT_SHOULDER,
      KEYPOINT_NAMES.LEFT_ELBOW,
      KEYPOINT_NAMES.LEFT_WRIST,
    ],
    [
      KEYPOINT_NAMES.LEFT_ELBOW,
      KEYPOINT_NAMES.LEFT_SHOULDER,
      KEYPOINT_NAMES.LEFT_HIP,
    ],
    [
      KEYPOINT_NAMES.LEFT_SHOULDER,
      KEYPOINT_NAMES.LEFT_HIP,
      KEYPOINT_NAMES.LEFT_KNEE,
    ],
    [
      KEYPOINT_NAMES.LEFT_ANKLE,
      KEYPOINT_NAMES.LEFT_KNEE,
      KEYPOINT_NAMES.LEFT_HIP,
    ],
  ],
  [FaceDirection.RIGHT]: [
    [
      KEYPOINT_NAMES.LEFT_WRIST,
      KEYPOINT_NAMES.LEFT_ELBOW,
      KEYPOINT_NAMES.LEFT_SHOULDER,
    ],
    [
      KEYPOINT_NAMES.LEFT_HIP,
      KEYPOINT_NAMES.LEFT_SHOULDER,
      KEYPOINT_NAMES.RIGHT_ELBOW,
    ],
    [
      KEYPOINT_NAMES.LEFT_KNEE,
      KEYPOINT_NAMES.LEFT_HIP,
      KEYPOINT_NAMES.RIGHT_SHOULDER,
    ],
    [
      KEYPOINT_NAMES.LEFT_HIP,
      KEYPOINT_NAMES.LEFT_KNEE,
      KEYPOINT_NAMES.RIGHT_ANKLE,
    ],
  ],
};
