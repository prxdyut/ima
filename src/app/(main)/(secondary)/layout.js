"use client";
import React from "react";
import { Box, Container, Grid, useMediaQuery } from "@mui/material";
import Drawer from "@/components/drawer";
import Topbar from "@/components/app-bar";
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
                }}>
                <Drawer />
              </Box>
            </Grid>
            <Grid item xs sx={{ mt: 2 }}>
              {children}
            </Grid>
            <Grid xs={3}>
              <Box
              >
                Notifications
              </Box>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <React.Fragment>
          <Topbar />
          <Container sx={{ my: 2 }}>{children}</Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
