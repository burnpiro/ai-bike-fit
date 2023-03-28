import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Iconify from "../../components/Iconify";

interface CameraVerticalPositionSetupPageProps {
  onNext: () => void;
  onPrev: () => void;
}

function CameraVerticalPositionSetupPage({
  onNext,
  onPrev,
}: CameraVerticalPositionSetupPageProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "background.default",
      }}
    >
      <Stack direction={"row"} justifyContent="center" alignItems="start">
        <Iconify
          icon={"ic:baseline-smartphone"}
          width={48}
          sx={{ mr: "6vw", mt: 0 }}
        />
        <Stack
          direction={"row"}
          justifyContent="center"
          alignItems="start"
          sx={{ mr: "6vw" }}
        >
          <div
            style={{
              width: 8,
              height: "calc(var(--vh, 1vh) * 60)",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <Iconify
              icon={"ic:baseline-arrow-drop-up"}
              width={68}
              sx={{ position: "absolute", top: -34, left: -30 }}
            />
            <Iconify
              icon={"ic:baseline-arrow-drop-down"}
              width={68}
              sx={{ position: "absolute", bottom: -34, left: -30 }}
            />
          </div>
        </Stack>
        <img
          src={"/assets/images/back-bicycle.png"}
          style={{ height: "calc(var(--vh, 1vh) * 60)" }}
        />
      </Stack>
      <Typography sx={{ pl: 4, pr: 4, textAlign: "center" }}>
        Position your phone at the same height as your saddle.
      </Typography>
      <Stack direction={"row"} spacing={2}>
        <Button variant={"outlined"} onClick={onPrev}>
          Back
        </Button>
        <Button variant={"contained"} onClick={onNext}>
          Next
        </Button>
      </Stack>
    </Box>
  );
}

export default CameraVerticalPositionSetupPage;
