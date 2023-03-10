import useDeviceOrientation from "../../hooks/useDeviceOrientation";
import { Box, BoxProps } from "@mui/material";
import Quaternion from "quaternion";

const orientations = [
  ["landscape left", "landscape right"], // device x axis points up/down
  ["portrait", "portrait upside down"], // device y axis points up/down
  ["display up", "display down"], // device z axis points up/down
];

const rad = Math.PI / 180;

// ----------------------------------------------------------------------

interface BubbleLevelToolProps extends BoxProps {
  onLevel?: () => void;
  correctRange?: [number, number];
  width?: number;
  height?: number;
}
export default function BubbleLevelTool({
  correctRange = [-0.05, 0.05], // min and maximum tilt as % of 90deg
  width = 200,
  height = 25,
}: BubbleLevelToolProps) {
  const orientation = useDeviceOrientation();

  const sinBeta = orientation.beta
    ? Math.sin(((orientation.beta * 2) / 360) * Math.PI)
    : 0;

  let bubbleOrientation = 1;

  let devOrientation = "";

  if (orientation.alpha && orientation.beta && orientation.gamma) {
    const q = Quaternion.fromEuler(
      orientation.alpha * rad,
      orientation.beta * rad,
      orientation.gamma * rad,
      "ZXY"
    );

    // transform an upward-pointing vector to device coordinates
    const vec = q.conjugate().rotateVector([0, 0, 1]);

    // find the axis with the largest absolute value
    const [value, axis] = vec.reduce(
      (acc, cur, idx) => (Math.abs(cur) < Math.abs(acc[0]) ? acc : [cur, idx]),
      [0, 0]
    );

    devOrientation = orientations[axis][Number(value < 0)];

    if (devOrientation === "landscape left") {
      bubbleOrientation = -1;
    }
  }

  return (
    <Box sx={{ width }}>
      <svg
        version="1.1"
        viewBox={`0 0 ${width} ${height}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient
            id="linearGradient-1"
            x1="50%"
            x2="50%"
            y1="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#B2F85A"></stop>
            <stop offset="46.4465083%" stopColor="#E6FFC7"></stop>
            <stop offset="100%" stopColor="#B4F661"></stop>
          </linearGradient>
        </defs>
        <g id="water_level">
          <rect
            fill="url(#linearGradient-1)"
            height={height}
            id="Water"
            strokeWidth="2"
            stroke="#E0DDDD"
            width={width}
            x="0"
            y="0"
          ></rect>
          <g
            fill="#FFFFFF"
            id="Bubble"
            stroke="#979797"
            transform={`translate(${
              width / 2 -
              width / 7 / 2 +
              (sinBeta * bubbleOrientation * width) / 2
            }, 1.000000)`}
          >
            <path
              d={`M45.0879765,33 C69.9893784,33 90.1759531,22.6116071 90.1759531,9.796875 C90.1759531,-3.01785709 69.9893784,0.584773242 45.0879765,0.584773242 C20.1865747,0.584773242 0,-3.01785709 0,9.796875 C0,22.6116071 20.1865747,33 45.0879765,33 Z`}
              id="Oval-1"
              transform={`scale(${(width / 1000) * 1.5})`}
            ></path>
          </g>
          <g
            id="MiddleLine"
            strokeLinecap="square"
            strokeWidth="3"
            stroke={`${
              sinBeta > correctRange[0] && sinBeta < correctRange[1]
                ? "green"
                : "red"
            }`}
            transform={`translate(${width / 2 - width / 7 / 2}, 1.000000)`}
          >
            <path
              d={`M${width / 7},0 L${width / 7},${height}`}
              id="Line"
            ></path>
            <path d={`M0.13313783,0 L0.13313783,${height}`} id="Line-2"></path>
          </g>
        </g>
      </svg>
    </Box>
  );
}
