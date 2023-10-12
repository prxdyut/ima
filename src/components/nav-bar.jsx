"use client";
import { Box, IconButton, InputBase, Paper } from "@mui/material";
import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [float, setFloat] = useState(true);

  // const logit = () => {
  //   window.scrollY > 56 ? setFloat(true) : setFloat(false);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", logit);
  //   return () => {
  //     window.removeEventListener("scroll", logit);
  //   };
  // }, []);

  return (
    <>
      <Box sx={{ height: 56 }} />
      <Box
        sx={{
          position: "fixed",
          top: 0,
          px: float ? 1 : 0,
          width: "100vw",
          backdropFilter: 'blur(2px)',
          zIndex: (theme) => theme.zIndex.appBar,
          "&, & *": {
            transition: "all 250ms, color 100ms",
            color: float ? "text.primary" : "primary.contrastText",
          },
        }}
      >
        <Paper
          component="form"
          elevation={0}
          sx={{
            display: "flex",
            alignItems: "center",
            bgcolor: float ? "primary.light" : "primary.main",
            color: float ? "text.primary" : "primary.contrastText",
            borderRadius: float ? 10 : 0,
            px: 1,
            py: 1,
            mt: float ? 1 : 0,
          }}
        >
          <IconButton>
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{
              ml: 1,
              flex: 1,
              color: float ? "text.primary" : "primary.contrastText",
            }}
            placeholder="Search IMA"
          />
          <IconButton
            type="button"
            sx={{ mr: 1 }}
            onClick={() => setFloat(!float)}
          >
            <SearchIcon />
          </IconButton>
          <UserButton afterSignOutUrl="/" />
        </Paper>
      </Box>
    </>
  );
};

export default Navbar;
