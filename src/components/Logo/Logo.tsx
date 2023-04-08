import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
// @mui
import { Box, BoxProps, Link } from "@mui/material";

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef(
  ({ disabledLink = false, sx, ...other }: LogoProps, ref) => {
    const logo = (
      <Box
        component="img"
        src={`${import.meta.env.BASE_URL}/logo.svg`}
        sx={{ width: 64, height: 64, cursor: 'pointer', ...sx }}
      />
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <Link to={`${import.meta.env.BASE_URL}`} component={RouterLink} sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  }
);
export default Logo;
