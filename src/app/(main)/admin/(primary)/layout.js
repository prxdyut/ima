import React from "react";
import Navbar from "../../../../components/nav-bar";
import BottomBar from "@/components/bottom-bar";
import { Container } from "@mui/material";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Navbar />
      <Container sx={{ my: 2 }}>{children}</Container>
      <BottomBar
        tabs={[
          { label: "Academics", icon: <></>, link: "/admin/assignments" },
          { label: "Schedule", icon: <></>, link: "/admin/schedule" },
          { label: "Library", icon: <></>, link: "/admin/library" },
        ]}
        default={0}
      />
    </React.Fragment>
  );
}
