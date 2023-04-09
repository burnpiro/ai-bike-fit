import React, { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import "@tensorflow/tfjs-backend-webgl";
import {
  initializeModel,
  setBackendAndEnvFlags,
} from "../../utils/modelHelper";
import { STATE } from "../../utils/pose-detection/params";
import {
  createDetector,
  PoseDetector,
  SupportedModels,
} from "../../utils/pose-detection";
import Iconify from "../../components/Iconify";
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Stack,
  Typography,
} from "@mui/material";

import "./RecordVideoPage.css";
import { getRecording, storeRecording } from "../../utils/storage";
import BikeLoader from "../../components/BikeLoader";
import { setMany } from "idb-keyval";
import { RECORDING_POSTFIX, videoOptions } from "../../utils/constants";
import { PoseWithTimestamp } from "../../utils/types";
import { Session } from "../../utils/session";

interface ProcessRecordingPageProps {
  recording: Blob[];
}

enum ProcessingSteps {
  frameProcessing,
  calculatingAngles,
}

function ProcessRecordingPage({ recording }: ProcessRecordingPageProps) {
  const navigate = useNavigate();
  const [detector, setDetector] = useState<PoseDetector | null>(null);
  const [step, setStep] = useState<ProcessingSteps>(
    ProcessingSteps.frameProcessing
  );
  const [processingStarted, setProcessingStarted] = useState<number>(
    new Date().getTime()
  );
  const [currFrame, setCurrFrame] = useState<number>(1);

  useEffect(() => {
    const setupTF = async () => {
      console.log("setting TF");
      await setBackendAndEnvFlags(
        STATE.flags,
        STATE.backend as SupportedModels
      );

      const newDetector = await createDetector(STATE.model, STATE.modelConfig);

      setDetector(newDetector);
    };

    setupTF();
  }, []);

  useEffect(() => {
    if (detector && recording) {
      let poses: PoseWithTimestamp[] = [];
      const processVideo = async function processVideo() {
        const blob = new Blob(recording, { type: videoOptions.mimeType });

        const videoUrl = URL.createObjectURL(blob);
        const videoElement = document.createElement("video");
        videoElement.src = videoUrl;

        await new Promise<void>((resolve, reject) => {
          videoElement.onloadedmetadata = () => {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            const width = videoElement.videoWidth;
            const height = videoElement.videoHeight;

            canvas.width = width;
            canvas.height = height;

            let currentFrame = 0;

            const drawFrame = async () => {
              if (context) {
                context.drawImage(videoElement, 0, 0, width, height);

                const imageData = context.getImageData(0, 0, width, height);

                try {
                  const framePoses = await detector.estimatePoses(imageData, {
                    maxPoses: STATE.modelConfig.maxPoses,
                    flipHorizontal: false,
                  });
                  currentFrame++;
                  setCurrFrame(currentFrame);

                  if (framePoses[0]) {
                    poses.push({
                      pose: framePoses[0],
                      frameIdx: currentFrame,
                      frameTime: videoElement.currentTime,
                    });
                  }
                  console.log(poses.length);
                  console.log(
                    videoElement.duration,
                    videoElement.playbackRate,
                    videoElement.currentTime
                  );
                } catch (error) {
                  console.error(error);
                  // detector.dispose();
                  // setDetector(null);
                  // alert(error);
                }

                // Check if there are more frames to process
                if (!videoElement.paused && !videoElement.ended) {
                  requestAnimationFrame(drawFrame);
                } else {
                  resolve();
                }
              }
            };
            videoElement.play();
            requestAnimationFrame(drawFrame);
          };

          videoElement.onerror = reject;
        });
        console.log(poses);
        setStep(ProcessingSteps.calculatingAngles);

        const newRecordingSession = new Session({
          timestamp: processingStarted,
        });
        newRecordingSession.setPoses(poses);

        storeRecording(newRecordingSession, recording).then((id) => {
          navigate(`${import.meta.env.BASE_URL}/dashboard/session/${id}`);
        });
      };

      processVideo();
    }
  }, [detector, recording]);

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      sx={{ height: "100%" }}
    >
      <BikeLoader />
      {step === ProcessingSteps.frameProcessing && currFrame === 1 && (
        <Typography sx={{ textAlign: "center" }} variant={"h6"}>
          Preparing recording for processing
        </Typography>
      )}
      {step === ProcessingSteps.frameProcessing && currFrame > 1 && (
        <Fragment>
          <Typography sx={{ textAlign: "center" }} variant={"h6"}>
            Processing Frame:
          </Typography>
          <Typography variant={"h2"} component={"span"}>
            {currFrame}
          </Typography>
        </Fragment>
      )}
      {step === ProcessingSteps.calculatingAngles && (
        <Typography sx={{ textAlign: "center" }} variant={"h6"}>
          Calculating your position...
        </Typography>
      )}
    </Stack>
  );
}

export default ProcessRecordingPage;
