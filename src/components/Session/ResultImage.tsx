import { useEffect, useState } from "react";

// @mui
import { styled } from "@mui/material/styles";
// utils
import { Session } from "../../utils/session";
import { PoseWithTimestamp } from "../../utils/types";
import { STATE } from "../../utils/pose-detection/params";
import { setMany } from "idb-keyval";
import { RECORDING_POSTFIX } from "../../utils/constants";
import { extractFrameFromRecording } from "../../utils/imageHelper";

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
  scale?: number;
  translate?: string;
}

export default function ResultImage({
  session,
  recording,
  position,
  scale,
  translate,
}: ResultImageProps) {
  const [imageURL, setImageURL] = useState<string>(session.image as string);
  useEffect(() => {
    const extractFrame = async () => {
      const frameURL = await extractFrameFromRecording(
        recording,
        position.frameTime
      );
      setImageURL(frameURL);
    };

    extractFrame();
  }, [recording, position]);

  return (
    <ResultImg
      src={imageURL}
      style={{
        transform: `${scale ? `scale(${scale})` : "scale(1)"} ${
          translate ? translate : ""
        }`,
      }}
    />
  );
}
