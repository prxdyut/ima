"use client";
import React from "react";
import ThemeRegistry from "./themeRegistry";
import ModalContextProvider from "@/helper/modal-context";

export default function RootTemplate({ children }) {
  return (
    <React.Fragment>
      <ThemeRegistry value={"value"}>
        <ModalContextProvider>{children}</ModalContextProvider>
      </ThemeRegistry>
    </React.Fragment>
  );
}
