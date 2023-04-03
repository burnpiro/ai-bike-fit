import React, { useEffect, useRef, useState } from "react";
import useCameraStream, {
  useCameraStreamProps,
} from "../../hooks/useCameraStream";
import "./Camera.css";
import { Box } from "@mui/material";
import {videoConfig} from "../../utils/constants";

export interface CameraProps {
  cameraSettings: {
    audio?: boolean;
    video: {
      facingMode: "front" | "back";
      frameRate: number;
      width: number;
      height: number;
    };
  };
  onCameraReady?: (mediaStream: MediaStream) => void;
}

export function generateCameraStreamConfig({
  audio,
  video: { facingMode, frameRate, width, height },
}: CameraProps["cameraSettings"]): useCameraStreamProps {
  return {
    audio: Boolean(audio),
    video: {
      facingMode: facingMode === "front" ? "user" : "environment",
      frameRate: { ideal: Number(frameRate) },
      width: width,
      height: height,
    },
  };
}

function Camera(props: CameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraConfig = generateCameraStreamConfig(props.cameraSettings);
  const cameraStreamRef = useCameraStream(cameraConfig);

  useEffect(() => {
    if (videoRef.current instanceof HTMLVideoElement && cameraStreamRef) {
      const awaitVideo = async () => {
        if (videoRef.current) {
          videoRef.current.srcObject = cameraStreamRef;
          console.log('set src')
          await new Promise((resolve) => {
            if (videoRef.current) {
              videoRef.current.onloadedmetadata = () => {
                resolve(null);
              };
            }
          });
          videoRef.current.play();

          videoRef.current.width = videoConfig.video.width;
          videoRef.current.height = videoConfig.video.height;
        }
      };

      awaitVideo();
    }
  }, [videoRef.current, cameraStreamRef]);

  useEffect(() => {
    if (props.onCameraReady && cameraStreamRef != null) {
      props.onCameraReady(cameraStreamRef);
    }
  }, [cameraStreamRef]);

  return (
    <Box className="videoContainer">
      <video
        ref={videoRef}
        className="videoContainer_media"
        width={videoConfig.video.width}
        height={videoConfig.video.height}
      />
      {!cameraStreamRef && (
        <Box
          className="loadingContainer"
        >
          <span>Loading camera...</span>
        </Box>
      )}
    </Box>
  );
}

export default Camera;
