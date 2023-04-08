import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {PoseWithTimestamp} from "./types";
import {KEYPOINT_NAMES} from "./pose-detection/constants";
import {filterPosition} from "./pose-detection";
import {AVAILABLE_POSITIONS, FaceDirection} from "./constants";

dayjs.extend(localizedFormat);

export type SessionData = {
  timestamp: number;
  bicycle?: string;
  image?: string;
  faceDirection?: FaceDirection;
  poses?: PoseWithTimestamp[];
  [AVAILABLE_POSITIONS.BOTTOM]?: PoseWithTimestamp;
  [AVAILABLE_POSITIONS.TOP]?: PoseWithTimestamp;
  [AVAILABLE_POSITIONS.FRONT]?: PoseWithTimestamp;
};

export class Session {
  timestamp: number;
  date: dayjs.Dayjs;
  id: string;
  bicycle?: string;
  image?: string;
  faceDirection?: FaceDirection;
  [AVAILABLE_POSITIONS.BOTTOM]?: PoseWithTimestamp;
  [AVAILABLE_POSITIONS.TOP]?: PoseWithTimestamp;
  [AVAILABLE_POSITIONS.FRONT]?: PoseWithTimestamp;
  poses?: PoseWithTimestamp[];
  constructor(data?: SessionData) {
    this.timestamp = data?.timestamp || new Date().getTime();
    this.id = `session-${this.timestamp}`;
    this.image = data?.image;
    this.bicycle = data?.bicycle;
    this.poses = data?.poses;
    this[AVAILABLE_POSITIONS.BOTTOM] = data?.[AVAILABLE_POSITIONS.BOTTOM];
    this[AVAILABLE_POSITIONS.TOP] = data?.[AVAILABLE_POSITIONS.TOP];
    this[AVAILABLE_POSITIONS.FRONT] = data?.[AVAILABLE_POSITIONS.FRONT];
    this.date = dayjs(this.timestamp);
  }

  export(): SessionData {
    return {
      timestamp: this.timestamp,
      bicycle: this.bicycle,
      image: this.image,
      poses: this.poses,
      [AVAILABLE_POSITIONS.BOTTOM]: this[AVAILABLE_POSITIONS.BOTTOM],
      [AVAILABLE_POSITIONS.TOP]: this[AVAILABLE_POSITIONS.TOP],
      [AVAILABLE_POSITIONS.FRONT]: this[AVAILABLE_POSITIONS.FRONT],
    };
  }

  setImageData(imageData: string) {
    this.image = imageData;
  }

  setPoses(newPoses: PoseWithTimestamp[]) {
    this.poses = newPoses;

    const rightAnklePosition = newPoses[0].pose.keypoints.find(
      (pose) => pose.name === KEYPOINT_NAMES.RIGHT_ANKLE
    );
    const leftAnklePosition = newPoses[0].pose.keypoints.find(
      (pose) => pose.name === KEYPOINT_NAMES.LEFT_ANKLE
    );
    const rightWristPosition = newPoses[0].pose.keypoints.find(
      (pose) => pose.name === KEYPOINT_NAMES.RIGHT_WRIST
    );
    const leftWristPosition = newPoses[0].pose.keypoints.find(
      (pose) => pose.name === KEYPOINT_NAMES.LEFT_WRIST
    );

    this.faceDirection = FaceDirection.LEFT;
    if (rightAnklePosition?.score && leftAnklePosition?.score) {
      if (rightAnklePosition.score > leftAnklePosition.score) {
        if (rightAnklePosition.x < (rightWristPosition?.x || 0)) {
          this.faceDirection = FaceDirection.RIGHT;
        }
      } else {
        if (leftAnklePosition.x < (leftWristPosition?.x || 0)) {
          this.faceDirection = FaceDirection.RIGHT;
        }
      }
    }

    this[AVAILABLE_POSITIONS.BOTTOM] = filterPosition(
      newPoses,
      this.faceDirection === FaceDirection.LEFT
        ? KEYPOINT_NAMES.LEFT_ANKLE
        : KEYPOINT_NAMES.RIGHT_ANKLE,
      (a, b) => a.y > b.y
    );

    this[AVAILABLE_POSITIONS.TOP] = filterPosition(
      newPoses,
      this.faceDirection === FaceDirection.LEFT
        ? KEYPOINT_NAMES.LEFT_ANKLE
        : KEYPOINT_NAMES.RIGHT_ANKLE,
      (a, b) => a.y < b.y
    );

    this[AVAILABLE_POSITIONS.FRONT] = filterPosition(
      newPoses,
      this.faceDirection === FaceDirection.LEFT
        ? KEYPOINT_NAMES.LEFT_ANKLE
        : KEYPOINT_NAMES.RIGHT_ANKLE,
      this.faceDirection === FaceDirection.LEFT ? (a, b) => a.x < b.x : (a, b) => a.x > b.x
    );
  }

  static import(data: SessionData): Session {
    return new Session(data);
  }
}
