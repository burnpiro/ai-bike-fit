import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Session } from "../../utils/session";
import { getRecording, getSession } from "../../utils/storage";
import {
  AVAILABLE_POSITIONS,
  FaceDirection,
  RECORDING_POSTFIX,
} from "../../utils/constants";
import { Skeleton, Stack } from "@mui/material";
import ResultImage from "../../components/Session/ResultImage";
import PositionCanvas from "../../components/Session/PositionCanvas";
import SessionPositionsDrawer from "../../components/Session/SessionPositionsDrawer";
import { PoseWithTimestamp } from "../../utils/types";
import { Keypoint } from "../../utils/pose-detection";
import { string } from "@tensorflow/tfjs-core";

function SessionPage() {
  let { id } = useParams<"id">();
  const [recording, setRecording] = useState<Blob | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currPosition, setCurrPosition] = useState<AVAILABLE_POSITIONS>(
    AVAILABLE_POSITIONS.TOP
  );
  const [positions, setPositions] =
    useState<Record<AVAILABLE_POSITIONS, PoseWithTimestamp>>();

  const [[scale, translate], setScaleAndTranslate] = useState<
    [number | undefined, string | undefined]
  >([1, `translate(0px, 0px)`]);

  useEffect(() => {
    if (id) {
      const getRecordingAsync = async () => {
        try {
          const idbSession = await getSession(id as string);
          const idbRecording = await getRecording(
            `${id}${RECORDING_POSTFIX}` as string
          );
          setSession(idbSession);
          setRecording(idbRecording);
          setPositions(
            Object.values(AVAILABLE_POSITIONS).reduce<
              Record<AVAILABLE_POSITIONS, PoseWithTimestamp> | any
            >((acc, position) => {
              if (idbSession[position]) {
                acc[position] = idbSession[position];
              }
              return acc;
            }, {})
          );
        } catch (e) {
          console.error(e);
        }
      };

      getRecordingAsync();
    }
  }, [id]);

  const handlePositionChange = (newPosition: AVAILABLE_POSITIONS) => {
    if (session && session[newPosition]) {
      setCurrPosition(newPosition);
    }
  };

  const handleKeypointChange = (keypoint: Keypoint) => {
    if (positions) {
      const newKeypoints = positions[currPosition].pose.keypoints.map((el) =>
        el.name === keypoint.name ? { ...keypoint } : el
      );

      setPositions({
        ...positions,
        [currPosition]: {
          ...positions[currPosition],
          pose: {
            ...positions[currPosition].pose,
            keypoints: newKeypoints,
          },
        },
      });
    }
  };

  const handleScaleChange = (newScale?: number, newTranslate?: string) => {
    setScaleAndTranslate([newScale, newTranslate]);
  };

  return (
    <Stack sx={{ height: "100%", width: "100%", position: "relative" }}>
      {recording && session && currPosition && (
        <SessionPositionsDrawer
          session={session}
          recording={recording}
          position={currPosition}
          onPositionSelect={handlePositionChange}
        />
      )}
      {recording && session && currPosition && positions && (
        <ResultImage
          session={session}
          recording={recording}
          scale={scale}
          translate={translate}
          position={positions[currPosition]}
        />
      )}
      {recording && session && currPosition && positions && (
        <PositionCanvas
          points={positions[currPosition].pose.keypoints}
          faceDirection={session.faceDirection as FaceDirection}
          onKeypointChange={handleKeypointChange}
          onScaleChange={handleScaleChange}
          scale={scale}
          translate={translate}
        />
      )}
      {(!recording || !session) && (
        <Skeleton variant="rectangular" height={"100vw"} />
      )}
    </Stack>
  );
}

export default SessionPage;
