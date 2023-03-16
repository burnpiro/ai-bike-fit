import { forwardRef } from "react";
// icons
import { Icon } from "@iconify/react";
// @mui
import { Box, BoxProps } from "@mui/material";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

// ----------------------------------------------------------------------

interface IconifyProps extends BoxProps {
  icon: string | ReactJSXElement;
  width?: number;
}

const Iconify = forwardRef(
  ({ icon, width = 20, sx, ...other }: IconifyProps, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default Iconify;
