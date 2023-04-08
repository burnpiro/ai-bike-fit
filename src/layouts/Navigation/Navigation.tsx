import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import {
  Box,
  Drawer,
} from "@mui/material";
// components
import Logo from "../../components/Logo";
import NavSection from "../../components/NavSection";
//
import navConfig from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

// ----------------------------------------------------------------------

interface NavigationProps {
  openNav: boolean;
  onCloseNav: () => void;
}

export default function Navigation({ openNav, onCloseNav }: NavigationProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Box
      sx={{
        overflowX: "auto",
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: "inline-flex", maxHeight: 50 }}>
        <Logo />
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <Box
      component="nav"
    >
      {
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      }
    </Box>
  );
}
