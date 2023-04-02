import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import {PoseWithTimestamp} from "./types";
import {KEYPOINT_NAMES} from "./pose-detection/constants";
import {filterPosition} from "./pose-detection";
import {FaceDirection} from "./constants";

dayjs.extend(localizedFormat);

export type SessionData = {
  timestamp: number;
  bicycle?: string;
  image?: string;
  faceDirection?: FaceDirection;
  poses?: PoseWithTimestamp[];
  lowAnklePos?: PoseWithTimestamp;
  highAnklePos?: PoseWithTimestamp;
  forwardAnklePos?: PoseWithTimestamp;
};

export class Session {
  timestamp: number;
  date: dayjs.Dayjs;
  id: string;
  bicycle?: string;
  image?: string;
  faceDirection?: FaceDirection;
  lowAnklePos?: PoseWithTimestamp;
  highAnklePos?: PoseWithTimestamp;
  forwardAnklePos?: PoseWithTimestamp;
  poses?: PoseWithTimestamp[];
  constructor(data?: SessionData) {
    this.timestamp = data?.timestamp || new Date().getTime();
    this.id = `session-${this.timestamp}`;
    this.image = data?.image;
    this.bicycle = data?.bicycle;
    this.poses = data?.poses;
    this.lowAnklePos = data?.lowAnklePos;
    this.highAnklePos = data?.highAnklePos;
    this.forwardAnklePos = data?.forwardAnklePos;
    this.date = dayjs(this.timestamp);
  }

  export(): SessionData {
    return {
      timestamp: this.timestamp,
      bicycle: this.bicycle,
      image: this.image,
      poses: this.poses,
      lowAnklePos: this.lowAnklePos,
      highAnklePos: this.highAnklePos,
      forwardAnklePos: this.forwardAnklePos,
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

    this.lowAnklePos = filterPosition(
      newPoses,
      this.faceDirection === FaceDirection.LEFT
        ? KEYPOINT_NAMES.LEFT_ANKLE
        : KEYPOINT_NAMES.RIGHT_ANKLE,
      (a, b) => a.y > b.y
    );

    this.highAnklePos = filterPosition(
      newPoses,
      this.faceDirection === FaceDirection.LEFT
        ? KEYPOINT_NAMES.LEFT_ANKLE
        : KEYPOINT_NAMES.RIGHT_ANKLE,
      (a, b) => a.y < b.y
    );

    this.forwardAnklePos = filterPosition(
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
