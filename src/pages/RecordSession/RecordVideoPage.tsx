import React, { Fragment, useEffect, useRef, useState } from "react";
import Camera, { CameraProps } from "../../components/Camera/Camera";
import useDeviceOrientation from "../../hooks/useDeviceOrientation";
import BubbleLevelTool from "../../components/BubbleLevelTool";
import { Stack } from "@mui/material";

import "./RecordVideoPage.css";
import useAudio from "../../hooks/useAudio";
import {
  RecordingTimer,
  PhoneOrientationChange,
} from "../../components/Messages";
import RecordingControls, {
  DELAYS,
} from "../../components/Camera/RecordingControls";
import {
  RECORDING_TIME,
  videoConfig,
  videoOptions,
} from "../../utils/constants";

interface RecordVideoPageProps {
  onNext: (recording: Blob[]) => void;
}

function RecordVideoPage({ onNext }: RecordVideoPageProps) {
  const [delay, setDelay] = useState<number>(DELAYS[0]);
  const [timer, setTimer] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const orientation = useDeviceOrientation();
  const [recorderRef, setRecorderRef] = useState<MediaRecorder | null>(null);
  const [startRecordingAudio] = useAudio("/assets/sounds/start-recording.mp3");
  const [endRecordingAudio] = useAudio("/assets/sounds/end-recording.mp3");

  const handleCameraStreamAvailable = (mediaStream: MediaStream) => {
    if (mediaStream) {
      setRecorderRef(new MediaRecorder(mediaStream, videoOptions));
    }
  };

  const changeDelay = (newDelay: number) => {
    setDelay(newDelay);
  };

  const recordVideo = () => {
    if (recorderRef) {
      let chunks: Blob[] = [];
      recorderRef.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      recorderRef.onstop = (e) => {
        endRecordingAudio.play();
        onNext(chunks);
      };
      const getStreamData = () => {
        recorderRef.start();
        setIsRecording(true);

        setTimeout(() => {
          recorderRef.stop();
          setIsRecording(false);
        }, RECORDING_TIME);
      };

      setTimeout(() => {
        startRecordingAudio.addEventListener("ended", getStreamData);
        startRecordingAudio.play();
      }, delay * 1000);

      const timerInterval = setInterval(() => {
        setTimer((currTimer) => {
          if (currTimer + 1 > delay) {
            clearInterval(timerInterval);
            return 0;
          }
          return currTimer + 1;
        });
      }, 1000);
      console.log("recording");
    }
  };
  const isLandscape =
    orientation.beta == null ||
    Math.abs(orientation.beta) < 20 ||
    Math.abs(orientation.beta) > 160;
  return (
    <Fragment>
      <Stack
        direction={"row"}
        className={"StackContainer"}
        sx={{ backgroundColor: "common.black" }}
      >
        <Camera
          cameraSettings={videoConfig}
          onCameraReady={handleCameraStreamAvailable}
        />

        <RecordingControls
          isLandscape={isLandscape}
          delay={delay}
          isRecording={isRecording}
          onDelayChange={changeDelay}
          onRecordClicked={recordVideo}
        />
        <BubbleLevelTool
          sx={{ position: "absolute", top: "2vh", right: "1vw" }}
        />
        {!isLandscape && <PhoneOrientationChange />}
        {timer > 0 && <RecordingTimer time={delay - timer} />}
      </Stack>
    </Fragment>
  );
}

export default RecordVideoPage;
