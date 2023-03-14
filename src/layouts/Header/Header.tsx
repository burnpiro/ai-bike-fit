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

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

interface HeaderProps {
  onOpenNav: () => void;
}

const fabStyle = {
  position: "absolute",
  top: 16,
  left: 16,
};

const fabRedStyle = {
  color: "secondary.contrastText",
  bgcolor: 'secondary.main',
  "&:hover": {
    bgcolor: 'secondary.light',
  },
};

const fabConfig = {
  color: "inherit" as "inherit",
  sx: { ...fabStyle, ...fabRedStyle } as SxProps,
};

export default function Header({ onOpenNav }: HeaderProps) {
  return (
    <StyledRoot>
      {/*<StyledToolbar>*/}
      <Fab
        sx={fabConfig.sx}
        aria-label={"Menu"}
        color={fabConfig.color}
        onClick={onOpenNav}
        size={"medium"}
      >
        <Iconify icon="eva:menu-2-fill" width={28}/>
      </Fab>
      {/*</StyledToolbar>*/}
    </StyledRoot>
  );
}
