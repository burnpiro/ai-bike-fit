import React, { Fragment, useEffect, useState } from "react";
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
import Camera, { CameraProps } from "../../components/Camera/Camera";
import PhoneOrientationChange from "../../components/Messages";
import useDeviceOrientation from "../../hooks/useDeviceOrientation";
import BubbleLevelTool from "../../components/BubbleLevelTool";
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

const videoConfig: CameraProps["cameraSettings"] = {
  audio: false,
  video: {
    facingMode: "front",
    frameRate: 30,
    width: 640,
    height: 480,
  },
};

interface RecordVideoPageProps {
  onPrev: () => void;
}

const DELAYS = [10, 20, 30];

function RecordVideoPage({ onPrev }: RecordVideoPageProps) {
  const [detector, setDetector] = useState<PoseDetector | null>(null);
  const [delay, setDelay] = useState<number>(10);
  const orientation = useDeviceOrientation();

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

  const changeDelay = (newDelay: number) => {
    setDelay(newDelay);
  };

  // console.log(detector);
  console.log(orientation);
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
        <Camera cameraSettings={videoConfig} />
        <Stack direction={"row"} className={"StackContainer-Menu"}>
          <Box
            sx={{
              width: 64,
              height: 64,
              "@media screen and (orientation: portrait)": {
                display: "none",
              },
            }}
          />
          <Iconify
            icon={"ph:record-fill"}
            sx={{
              width: 64,
              height: 64,
            }}
          />
          <SpeedDial
            ariaLabel="Select delay"
            FabProps={{
              size: "medium",
              sx: {
                bgcolor: "background.light",
                "&:hover": {
                  bgcolor: "background.light",
                },
              },
            }}
            sx={{
              mr: 1,
              mb: isLandscape ? 0 : 1,

              "@media screen and (orientation: portrait)": {
                display: "none",
              },
            }}
            icon={
              <Iconify
                icon={"mingcute:stopwatch-line"}
                sx={{
                  width: 36,
                  height: 36,
                }}
              />
            }
            direction={"left"}
          >
            {DELAYS.map((elDelay) => (
              <SpeedDialAction
                key={elDelay + "s"}
                sx={{
                  color: "#212B36",
                }}
                FabProps={{
                  size: delay === elDelay ? "medium" : "small",
                  sx: {
                    mt: delay === elDelay ? "4px" : "8px",
                    bgcolor:
                      delay === elDelay
                        ? "background.light"
                        : "background.neutral",
                    color: delay === elDelay ? "common.black" : "text.primary",
                    "&:hover": {
                      bgcolor:
                        delay === elDelay
                          ? "background.light"
                          : "background.neutral",
                    },
                  },
                }}
                icon={
                  <Typography sx={{ fontWeight: "bold" }}>
                    {elDelay}s
                  </Typography>
                }
                tooltipTitle={`${elDelay}s`}
                onClick={() => {
                  changeDelay(elDelay);
                }}
              />
            ))}
          </SpeedDial>
        </Stack>
      </Stack>
      <BubbleLevelTool
        sx={{ position: "absolute", top: "2vh", right: "1vw" }}
      />
      {!isLandscape && <PhoneOrientationChange />}
    </Fragment>
  );
}

export default RecordVideoPage;
