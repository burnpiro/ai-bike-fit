import { useState, useEffect, useRef } from "react";

export interface useCameraStreamProps {
  audio: boolean;
  video: {
    facingMode: "user" | "environment";
    frameRate: { ideal: number };
    width: number;
    height: number;
  };
}


export default function useCameraStream(props: useCameraStreamProps) {
  const mediaDeviceRef = useRef<MediaStream | undefined>();

  useEffect(() => {
    const awaitCamera = async () => {
      mediaDeviceRef.current = await navigator.mediaDevices.getUserMedia(props);
    };

    awaitCamera();
  }, [props]);

  return mediaDeviceRef;
}
