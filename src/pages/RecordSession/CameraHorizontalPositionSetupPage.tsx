import React, { Fragment, useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Iconify from "../../components/Iconify";

interface CameraHorizontalPositionSetupPageProps {
  onNext: () => void;
}

function CameraHorizontalPositionSetupPage({
  onNext,
}: CameraHorizontalPositionSetupPageProps) {
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
      <Stack direction={"row"} justifyContent="center" alignItems="center">
        <Iconify
          icon={"ic:baseline-smartphone"}
          width={48}
          sx={{ mr: "2vw", mt: 2 }}
        />
        <Stack
          direction={"column"}
          justifyContent="center"
          alignItems="center"
          sx={{ mr: "2vw" }}
        >
          <Typography>2-3m (6.5-10ft)</Typography>
          <div
            style={{
              marginTop: 24,
              width: "30vw",
              height: "1vh",
              backgroundColor: "white",
              position: "relative",
            }}
          >
            <Iconify
              icon={"ic:baseline-arrow-left"}
              width={68}
              sx={{ position: "absolute", top: -30, left: -30 }}
            />
            <Iconify
              icon={"ic:baseline-arrow-right"}
              width={68}
              sx={{ position: "absolute", top: -30, right: -30 }}
            />
          </div>
        </Stack>
        <img
          src={"/assets/images/top-bicycle.png"}
          style={{ height: "60vh" }}
        />
      </Stack>
      <Typography sx={{ pl: 4, pr: 4, textAlign: "center" }}>
        Position your phone 3m from bicycle. You should be able to view bottom
        of the tyre and top of the rider's head
      </Typography>
      <Button variant={"contained"} onClick={onNext}>
        Next
      </Button>
    </Box>
  );
}

export default CameraHorizontalPositionSetupPage;
