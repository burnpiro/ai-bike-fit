import { Keypoint, Pose } from "./pose-detection";

export interface PoseWithTimestamp {
  pose: Pose;
  frameIdx: number;
  frameTime: number;
}

export type Line = {
  fromPoint: Keypoint;
  toPoint: Keypoint;
  color?: string;
};

export type Angle = {
  point1: Keypoint;
  point2: Keypoint;
  point3: Keypoint;
  color?: string;
};

export type ValueOf<T> = T[keyof T];
