"use client";
import {
  Avatar, Box, Card,
  CardHeader, Divider, IconButton, List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem, Typography
} from "@mui/material";
import {
  Assignment,
  CalendarToday, Help, InstallMobile, LibraryMusic,
  Logout, MoreVert,
  ReceiptLong
} from "@mui/icons-material";
import React from "react";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
import "react-toastify/dist/ReactToastify.css";

import {getFormattedName} from './../helper/functions'
const ReactViewer = dynamic(() => import("react-viewer"), { ssr: false });

import "suneditor/dist/css/suneditor.min.css";
import Link from "next/link";
import { usePWAInstall } from "react-use-pwa-install";
import { AttendanceIcon, FeesIcon, SettingsIcon } from "../helper/icons";

const Drawer = () => {
  const menuItems = [
    "divider",
    { text: "Academics" },
    {
      label: "Assignments",
      url: "/assignments",
      icon: <Assignment />,
    },
    { label: "Tests", url: "/tests", icon: <ReceiptLong /> },
    { label: "Doubts", url: "/doubts", icon: <Help /> },
    "divider",
    { label: "Schedule", url: "/schedule", icon: <CalendarToday /> },
    { label: "Library", url: "/library", icon: <LibraryMusic /> },
    "divider",
    { label: "Attendance", url: "/attendance", icon: <AttendanceIcon /> },
    { label: "Fees", url: "/fees", icon: <FeesIcon /> },
    { label: "Settings", url: "/settings", icon: <SettingsIcon /> },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
const {user, isLoaded} = useUser()
  const install = usePWAInstall();

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Help</MenuItem>
        <MenuItem onClick={handleClose}>Report a Problem</MenuItem>
      </Menu>
      <Box sx={{ mt: 1, width: "100%", maxWidth: "75vw" }}>
        <Box
          sx={{
            p: 0,
            bgcolor: "primary.light",
            zIndex: "2",
            borderRadius: 2,
            mx: 1,
          }}
        >
          <Card
            elevation={4}
            sx={{
              overflow: "unset",
              color: "primary.main",
            }}
            component={Link}
            href={""}
          >
            <CardHeader
              avatar={
                <Avatar>
                  <UserButton afterSignOutUrl="/" />
                </Avatar>
              }
              sx={{ pb: 0 }}
            />
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVert
                    sx={{
                      color: "primary.main",
                    }}
                  />
                </IconButton>
              }
              title={<Typography fontWeight={600}>{isLoaded && getFormattedName(user)}</Typography>}
              subheader={<Typography variant="caption">{isLoaded && user.publicMetadata.type}</Typography>}
            />
          </Card>
        </Box>
        <List sx={{ mt: 0 }}>
          {menuItems.map((menu, index) => (
            <React.Fragment key={index}>
              {menu?.label && (
                <ListItem
                  disablePadding
                  secondaryAction={<Typography>{menu?.helper}</Typography>}
                >
                  <ListItemButton LinkComponent={Link} href={ menu.url}>
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.label} />
                  </ListItemButton>
                </ListItem>
              )}
              {menu?.text && (
                <ListItem disablePadding sx={{ px: 2 }}>
                  <ListItemText
                    primary={<Typography>{menu.text}</Typography>}
                  />
                </ListItem>
              )}
              {menu == "divider" && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List>

        <List sx={{ p: 0 }}>
          {install && (
            <ListItem disablePadding >
              <ListItemButton
                sx={{ borderRadius: 2, m: 1 }}
                onClick={install}
              >
                <ListItemIcon>
                  <InstallMobile />
                </ListItemIcon>
                <ListItemText primary={"Install App"} />
              </ListItemButton>
            </ListItem>
          )}
          <ListItem disablePadding>
            <ListItemButton
              sx={{ background: "#ef535033 !important", borderRadius: 2, m: 1 }}
              LinkComponent={SignOutButton}
            >
              <ListItemIcon>
                <Logout sx={{ color: "error.main" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ color: "error.main" }}>Logout</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

export default Drawer;
