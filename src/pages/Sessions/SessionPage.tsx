import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Session } from "../../utils/session";
import { getRecording, getSession } from "../../utils/storage";
import { FaceDirection, RECORDING_POSTFIX } from "../../utils/constants";
import { Skeleton, Stack } from "@mui/material";
import ResultImage from "../../components/Session/ResultImage";
import { PoseWithTimestamp } from "../../utils/types";
import PositionCanvas from "../../components/Session/PositionCanvas";

enum AVAILABLE_POSITIONS {
  BOTTOM = "lowAnklePos",
  TOP = "highAnklePos",
  FRONT = "forwardAnklePos",
}
function SessionPage() {
  let { id } = useParams<"id">();
  const [recording, setRecording] = useState<Blob | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [currPosition, setCurrPosition] = useState<PoseWithTimestamp>();

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
          setCurrPosition(idbSession[AVAILABLE_POSITIONS.TOP]);
        } catch (e) {
          console.error(e);
        }
      };

      getRecordingAsync();
    }
  }, [id]);

  return (
    <Stack>
      {recording && session && currPosition && (
        <ResultImage
          session={session}
          recording={recording}
          position={currPosition}
        />
      )}
      {recording && session && currPosition && (
        <PositionCanvas
          points={currPosition?.pose.keypoints}
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
