import { CameraProps } from "../components/Camera";
import { COCO_KEYPOINTS } from "./pose-detection/constants";

export const videoOptions = MediaRecorder.isTypeSupported(
  "video/webm; codecs=vp9"
)
  ? {
      mimeType: "video/webm; codecs=vp9",
      videoBitsPerSecond: 2500000,
    }
  : {
      mimeType: "video/webm; codecs=vp8",
      videoBitsPerSecond: 2500000,
    };

export const RECORDING_POSTFIX = "-recording";

export const RECORDING_TIME = 3000;

export const videoConfig: CameraProps["cameraSettings"] = {
  audio: false,
  video: {
    facingMode: "back",
    frameRate: 60,
    width: 640,
    height: 480,
  },
};

export enum FaceDirection {
  LEFT = "left",
  RIGHT = "right",
}