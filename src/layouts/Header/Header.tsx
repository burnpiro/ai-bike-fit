// @mui
import { styled } from "@mui/material/styles";
import {
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Fab,
  SxProps,
} from "@mui/material";
import { red } from "@mui/material/colors";
// utils
import { bgBlur } from "../../utils/cssStyles";
// components
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

// @ts-ignore
const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: "none",
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

interface HeaderProps {
  onOpenNav: () => void;
}

const fabStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  p: 1,
  pb: 0,
  borderBottomRightRadius: 4,
};

const fabRedStyle = {
  color: "secondary.contrastText",
  bgcolor: "grey.400",
  "&:hover": {
    bgcolor: "grey.300",
  },
};

const fabConfig = {
  color: "inherit" as "inherit",
  sx: { ...fabStyle, ...fabRedStyle } as SxProps,
};

export default function Header({ onOpenNav }: HeaderProps) {
  return (
    <StyledRoot>
      <Box sx={fabConfig.sx} aria-label={"Menu"} onClick={onOpenNav}>
        <Iconify icon="eva:menu-2-fill" width={28} />
      </Box>
    </StyledRoot>
  );
}
