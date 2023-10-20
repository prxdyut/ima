"use client";
import React from "react";
import ThemeRegistry from "./themeRegistry";
import Navbar from "@/components/nav-bar";
import { MantineProvider, createTheme } from "@mantine/core";

export default function RootTemplate({ children }) {
  return (
    <React.Fragment>
      <ThemeRegistry>
        {children}
      </ThemeRegistry>
    </React.Fragment>
  );
}
