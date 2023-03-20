import { useState, useEffect, useRef, Ref } from "react";

export interface useCameraStreamProps {
  audio: boolean;
  video: {
    facingMode: "user" | "environment";
    frameRate: { ideal: number };
    width: number;
    height: number;
  };
}

const emptyVideoSettings: useCameraStreamProps["video"] = {
  facingMode: "user",
  frameRate: { ideal: 30 },
  width: 0,
  height: 0,
};

function stopMediaStream(stream: MediaStream | null) {
  if (stream) {
    if (stream.getVideoTracks && stream.getAudioTracks) {
      stream.getVideoTracks().map((track) => {
        stream.removeTrack(track);
        track.stop();
      });
      stream.getAudioTracks().map((track) => {
        stream.removeTrack(track);
        track.stop();
      });
    } else {
      (stream as unknown as MediaStreamTrack).stop();
    }
  }
}

export default function useCameraStream(
  props: useCameraStreamProps
): MediaStream | undefined {
  const mediaDeviceRef = useRef<MediaStream | undefined>();
  const [prevCameraSettings, setPrevCameraSettings] =
    useState<useCameraStreamProps["video"]>(emptyVideoSettings);

  useEffect(() => {
    const awaitCamera = async () => {
      const mediaDevice = await navigator.mediaDevices.getUserMedia(props);
      mediaDeviceRef.current = mediaDevice;
      setPrevCameraSettings(props.video);
    };

    if (
      prevCameraSettings.height !== props.video.height ||
      prevCameraSettings.width !== props.video.width ||
      prevCameraSettings.facingMode !== props.video.facingMode ||
      prevCameraSettings.frameRate.ideal !== props.video.frameRate.ideal
    ) {
      awaitCamera();
    }

    // return () => {
    //   if (mediaDeviceRef.current) {
    //     stopMediaStream(mediaDeviceRef.current);
    //     mediaDeviceRef.current = undefined;
    //   }
    // };
  }, [props]);

  return mediaDeviceRef.current;
}
