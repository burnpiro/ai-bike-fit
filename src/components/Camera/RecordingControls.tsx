import React from "react";
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Stack,
  Typography,
} from "@mui/material";
import Iconify from "../../components/Iconify";

interface RecordingControlsProps {
  isLandscape: boolean;
  delay: number;
  isRecording: boolean;
  onDelayChange: (newDelay: number) => void;
  onRecordClicked: () => void;
}

export const DELAYS = [1, 10, 20, 30, 60];

function RecordingControls({
  isRecording,
  delay,
  onDelayChange,
  isLandscape,
  onRecordClicked,
}: RecordingControlsProps) {
  return (
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
        color={isRecording ? "#FF4842" : undefined}
        sx={{
          width: isRecording ? 56 : 64,
          height: isRecording ? 56 : 64,
          marginRight: isRecording ? "4px" : 0,
          cursor: "pointer",
        }}
        onClick={isRecording ? undefined : onRecordClicked}
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
          disabled: isRecording,
        }}
        sx={{
          mr: 1,
          mb: isLandscape ? 0 : 1,

          "@media screen and (orientation: portrait)": {
            display: "none",
          },
          zIndex: 0,
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
                  delay === elDelay ? "background.light" : "background.neutral",
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
              <Typography sx={{ fontWeight: "bold" }}>{elDelay}s</Typography>
            }
            tooltipTitle={`${elDelay}s`}
            onClick={isRecording ? undefined : () => onDelayChange(elDelay)}
          />
        ))}
      </SpeedDial>
    </Stack>
  );
}

export default RecordingControls;
