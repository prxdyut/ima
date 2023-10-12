import React from "react";
import ThemeRegistry from "./themeRegistry";
import Navbar from "@/components/nav-bar";

export default function RootTemplate({ children }) {
  return (
    <React.Fragment>
      <ThemeRegistry>
        {/* <Navbar /> */}
        {children}
      </ThemeRegistry>
    </React.Fragment>
  );
}
