"use client";
import React, { useEffect } from "react";
import ThemeRegistry from "./themeRegistry";
import ModalContextProvider from "@/helper/modal-context";

const initializeWebPushr = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "./script.js";

    script.onload = () => {
      console.log('Loaded Script')
      resolve(true);
    };
    script.onerror = () => {
      console.error('Error Loading Script')
      resolve(false);
    };

    document.body.appendChild(script);
  });
};
export default function RootTemplate({ children }) {
  useEffect(() => { initializeWebPushr() }, [])
  return (
    <React.Fragment>
      <ThemeRegistry value={"value"}>
        <ModalContextProvider>{children}</ModalContextProvider>
      </ThemeRegistry>
    </React.Fragment>
  );
}
