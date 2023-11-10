"use client";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const BottomBar = ({
  tabs = [{ label: "", icon: <></>, link: "" }],
  ...props
}) => {
  const [value, setValue] = useState(props.default);
  const path = usePathname();
  const router = useRouter()
  useEffect(() => {
    tabs
      .map(({ link }) => link)
      .map(
        (item, index) =>
          item.split("/")[1] == path.split("/")[1] &&
          (() => {
            setValue(index);
          })()
      );
  }, [path]);
  console.log(value, path);

  return (
    <React.Fragment>
      <Box sx={{ height: 84 }} />
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
            onClick={() => router.push(link)}
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

export default BottomBar;
