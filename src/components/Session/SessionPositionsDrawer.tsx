import { Fragment, useEffect, useState } from "react";

// @mui
import { styled } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Global } from "@emotion/react";
// utils
import { Session } from "../../utils/session";
import { PoseWithTimestamp } from "../../utils/types";
import { STATE } from "../../utils/pose-detection/params";
import { setMany } from "idb-keyval";
import { AVAILABLE_POSITIONS, RECORDING_POSTFIX } from "../../utils/constants";
import { Box, Card, Paper, Skeleton, Typography } from "@mui/material";
import Iconify from "../Iconify";
import { extractFrameFromRecording } from "../../utils/imageHelper";
import { Pose } from "../../utils/pose-detection";

const drawerBleeding = 56;

// ----------------------------------------------------------------------

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

// --------
interface ResultImageProps {
  session: Session;
  recording: Blob;
  position: AVAILABLE_POSITIONS;
  onPositionSelect: (newPosition: AVAILABLE_POSITIONS) => void;
}
export default function SessionPositionsDrawer({
  session,
  recording,
  position,
  onPositionSelect,
}: ResultImageProps) {
  const [imageUrls, setImageUrls] = useState<
    Record<AVAILABLE_POSITIONS, string> | undefined
  >();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (recording && session) {
      const extractFrames = async () => {
        const newImageUrls = await Promise.all(
          Object.values(AVAILABLE_POSITIONS).map((availablePosition) => {
            return extractFrameFromRecording(
              recording,
              (session[availablePosition] as PoseWithTimestamp).frameTime
            );
          })
        );

        setImageUrls(
          newImageUrls.reduce<Record<AVAILABLE_POSITIONS, string> | any>(
            (acc, imageUrl, idx) => {
              acc[Object.values(AVAILABLE_POSITIONS)[idx]] = imageUrl;
              return acc;
            },
            {}
          )
        );
      };

      extractFrames();
    }
  }, [recording, session]);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handlePositionSelect = (newPosition: AVAILABLE_POSITIONS) => {
    onPositionSelect(newPosition);
    setOpen(false);
  };

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <Fragment>
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            width: `calc(35% - ${drawerBleeding}px)`,
            minWidth: "200px",
            height: "calc(100%)",
            overflow: "visible",
          },
        }}
      />
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            left: -drawerBleeding / 2,
            borderBottomLeftRadius: 8,
            borderTopLeftRadius: 8,
            visibility: "visible",
            bottom: 0,
            top: 0,
          }}
        >
          <Paper
            sx={{
              height: "100%",
              width: drawerBleeding / 2,
            }}
          >
            <Iconify
              icon={"mdi:drag-vertical"}
              style={{
                width: 48,
                height: 48,
                borderRadius: 3,
                position: "absolute",
                // backgroundColor: theme.palette.grey["200"],
                left: -12,

                top: "calc(50% - 24px)",
              }}
            />
          </Paper>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pr: 2,
            overflow: "auto",
          }}
        >
          {Object.values(AVAILABLE_POSITIONS).map((availablePosition) => (
            <Card
              key={availablePosition}
              sx={{
                mb: 1,
                mt: 1,
                p: "0px",
                border:
                  position === availablePosition ? "4px solid grey" : "none",
                borderRadius: "5px",
              }}
              onClick={() => handlePositionSelect(availablePosition)}
            >
              {imageUrls && imageUrls[availablePosition] && (
                <img alt={availablePosition} src={imageUrls[availablePosition]} />
              )}
              {(!imageUrls || !imageUrls[availablePosition]) && (
                <Skeleton variant={"rectangular"} height={130} />
              )}
            </Card>
          ))}
        </StyledBox>
      </SwipeableDrawer>
    </Fragment>
  );
}
