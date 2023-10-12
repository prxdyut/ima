"use client";
import { ThemeProvider } from "@mui/material";
import theme from "../helper/theme";

export default function ThemeRegistry(params) {
  const { children } = params;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}