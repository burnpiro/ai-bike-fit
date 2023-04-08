import { useEffect, useState } from "react";

// utils
import { Session } from "../../utils/session";
import { PoseWithTimestamp } from "../../utils/types";
import {AVAILABLE_POSITIONS, RECORDING_POSTFIX} from "../../utils/constants";
import { extractFrameFromRecording } from "../../utils/imageHelper";
import {Box} from "@mui/material";

type Angles = {

}

// --------
interface FittingResultsProps {
    session: Session;
    position: AVAILABLE_POSITIONS;
    onPositionSelect: (newPosition: AVAILABLE_POSITIONS) => void;
}

export default function FittingResults({
                                        session,
                                        position,
                                           onPositionSelect,
                                    }: FittingResultsProps) {
    useEffect(() => {

    }, [session, position]);

    return (
        <Box>

        </Box>
    );
}
