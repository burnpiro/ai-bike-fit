import { useEffect, useState } from "react";

// @mui
import { styled } from "@mui/material/styles";
// utils
import { Session } from "../../utils/session";
import { PoseWithTimestamp } from "../../utils/types";
import { STATE } from "../../utils/pose-detection/params";
import { setMany } from "idb-keyval";
import { RECORDING_POSTFIX } from "../../utils/constants";

// ----------------------------------------------------------------------

const ResultImg = styled("img")({
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain",
  position: "absolute",
});

// --------
interface ResultImageProps {
  session: Session;
  recording: Blob;
  position: PoseWithTimestamp;
}

export default function ResultImage({
  session,
  recording,
  position,
}: ResultImageProps) {
  const [imageURL, setImageURL] = useState<string>(session.image as string);
  useEffect(() => {
    const extractFrameFromRecording = async () => {
      const videoUrl = URL.createObjectURL(recording);
      const videoElement = document.createElement("video");
      videoElement.addEventListener("loadedmetadata", () => {
        const canvas = document.createElement("canvas");
        const width = videoElement.videoWidth;
        const height = videoElement.videoHeight;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return;
        }

        videoElement.currentTime = position.frameTime;

        const render = () => {
          ctx.drawImage(videoElement, 0, 0, width, height);
          const imageDataURL = canvas.toDataURL();
          setImageURL(imageDataURL);

          videoElement.removeEventListener("timeupdate", render);
        };
        videoElement.addEventListener("timeupdate", render);
      });
      videoElement.src = videoUrl;
      videoElement.load();
    };

    extractFrameFromRecording();
  }, [recording, position]);

  return <ResultImg src={imageURL} />;
}
