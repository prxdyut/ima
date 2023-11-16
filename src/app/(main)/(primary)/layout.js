"use client";
import React from "react";
import Navbar from "@/components/nav-bar";
import BottomBar from "@/components/bottom-bar";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import { AcademicsIcon, LibraryIcon, ScheduleIcon } from "@/helper/icons";
import Drawer from "@/components/drawer";

export default function Layout({ children }) {
  const bigScreen = useMediaQuery("(min-width:786px)");
  return (
    <React.Fragment>
      {bigScreen ? (
        <Container sx={{ my: 2 }}>
          <Grid container spacing={4}>
            <Grid item xs={3}>
              <Box
                sx={{
                  position: "fixed",
                  top: "0",
                  overflow: "scroll",
                  height: "100vh",
                  scrollbarWidth: "none",
                  overflowX: "hidden",
                  "&::-webkit-scrollbar": {display: 'none'},
                }}
              >
                <Drawer />
              </Box>
            </Grid>
            <Grid item xs sx={{ mt: 2 }}>
              {children}
            </Grid>
            <Grid xs={3}>
              <Box
                sx={{
                  height: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Notifications
              </Box>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <React.Fragment>
          <Navbar />
          <Container sx={{ my: 2 }}>{children}</Container>
          <BottomBar
            tabs={[
              {
                label: "Academics",
                icon: <AcademicsIcon />,
                link: "/assignments",
              },
              {
                label: "Schedule",
                icon: <ScheduleIcon />,
                link: "/schedule",
              },
              {
                label: "Library",
                icon: <LibraryIcon />,
                link: "/library",
              },
            ]}
            default={0}
          />{" "}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
