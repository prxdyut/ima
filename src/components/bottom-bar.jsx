"use client";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

const bottomBar = ({ tabs = [{ label: "", icon: <></>, link: "" }], ...props }) => {
  const [value, setValue] = useState(props.default);

  return (
    <React.Fragment>
      <Box sx={{height: 84}} />
      <BottomNavigation
        sx={{
          bgcolor: "primary.light",
          height: 84,
          position: "fixed",
          bottom: "0",
          right: "0",
          width: "100%",
        }}
        value={value}
      >
        {tabs.map(({ label, icon, link }, idx) => (
          <BottomNavigationAction
          LinkComponent={Link}
          href={link}
            label={label}
            value={idx}
            key={idx}
            icon={
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  color: idx == value ? "white" : "primary.main",
                  bgcolor: idx == value && "primary.main",
                  borderRadius: 6,
                  transition: "500ms",
                }}
              >
                {icon}
              </Box>
            }
            onClick={() => setValue(idx)}
            sx={{
              color: "primary.main",
              fontWeight: 500,
              "& .Mui-selected": {
                mt: 1,
              },
              transition: "background 1s, color 1s",
              paddingInline: "0",
            }}
          />
        ))}
      </BottomNavigation>
    </React.Fragment>
  );
};

export default bottomBar;
