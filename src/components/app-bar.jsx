"use client";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { ArrowBackIosNew } from "@mui/icons-material";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

const TopBar = () => {
  const pathname = usePathname();
  const router = useRouter()
  return (
    <>
      <AppBar position="fixed" sx={{ width: "100vw" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => router.back()}
          >
            <ArrowBackIosNew />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            #&nbsp;
            {pathname.split("/")[pathname.split("/").length - 1]
              ? pathname.split("/")[pathname.split("/").length - 1]
              : null}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: 56 }} />
    </>
  );
};

export default TopBar;
