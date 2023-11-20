"use client";
import { getSettings } from "@/helper/apis";
import { Box, Button, Divider, Stack, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";

export default function Page(params) {
  const notificationSettings = [
    { key: "assignments", Label: "Assignments", main: false },
    { key: "tests", Label: "Tests", main: false },
    { key: "results", Label: "Results", main: false },
    { key: "doubts", Label: "Doubts", main: false },
    { key: "attendance", Label: "Attendance", main: false },
    { key: "schedule", Label: "Schedule", main: false },
    { key: "library", Label: "Library", main: false },
  ];

  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSettings()
      .then((res) => setSettings(res))
      .finally(() => setLoading(false));
  }, [router]);

  const update = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(settings);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/settings", requestOptions)
      .then(() => router.refresh())
      .catch((error) => console.log("error", error));
  };

  if (loading) return <Loading />;
  return (
    <React.Fragment>
      <Stack spacing={1}>
        <Typography variant="h5">
          <b>Settings</b>
        </Typography>
        <Box />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",px:2
          }}
        >
          <Typography variant="h6">Notifications</Typography>
          
        </Box>
        {notificationSettings.map((setting, i) => (
          <Box
            key={i}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              px: 2,
            }}
          >
            <Typography>{setting.Label}</Typography>
            <Switch
              checked={settings?.[setting.key] || false}
              disabled={!settings.notifications}
              onClick={() =>
                setSettings({
                  ...settings,
                  [setting.key]: !settings?.[setting.key] || false,
                })
              }
            />
          </Box>
        ))}
        <Box />
        <Box />
        <Box />
        <Box textAlign={"end"} sx={{ px: 2 }}>
          <Button onClick={update} variant="contained" sx={{px:4}}>
            Save
          </Button>
        </Box>
      </Stack>
    </React.Fragment>
  );
}
