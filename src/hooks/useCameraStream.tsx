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

  useEffect(() => {
    const awaitCamera = async () => {
      const mediaDevice = await navigator.mediaDevices.getUserMedia(props);
      console.log(mediaDevice)
      mediaDeviceRef.current = mediaDevice;
    };

    console.log(props)

    awaitCamera();

    // return () => {
    //   if (mediaDeviceRef.current) {
    //     stopMediaStream(mediaDeviceRef.current);
    //     mediaDeviceRef.current = undefined;
    //   }
    // };
  }, [props]);

  return mediaDeviceRef.current;
}
