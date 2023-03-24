import { Pose } from "./pose-detection";

export interface PoseWithTimestamp {
  pose: Pose;
  frameIdx: number;
  frameTime: number;
}

export type ValueOf<T> = T[keyof T];