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

function SessionPage() {
  let { id } = useParams<"id">();
  const [recording, setRecording] = useState<Blob | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currPosition, setCurrPosition] = useState<AVAILABLE_POSITIONS>(
    AVAILABLE_POSITIONS.TOP
  );

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
      {recording && session && currPosition && (
        <ResultImage
          session={session}
          recording={recording}
          position={session[currPosition] as PoseWithTimestamp}
        />
      )}
      {recording && session && currPosition && (
        <PositionCanvas
          points={(session[currPosition] as PoseWithTimestamp).pose.keypoints}
          faceDirection={session.faceDirection as FaceDirection}
        />
      )}
      {(!recording || !session) && (
        <Skeleton variant="rectangular" height={"100vw"} />
      )}
    </Stack>
  );
}

export default SessionPage;
