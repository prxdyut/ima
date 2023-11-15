"use client";
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3001");

export default function Page(params) {
  const [stringifieddata, setData] = useState([]);
  const data = stringifieddata.map((data) => JSON.parse(data));

  useEffect(() => {
    let currentData = new Set();
    socket.on("new-change", (value) => {
      currentData.add(JSON.stringify(value));
      setData([...currentData]);
    });
    return () => {
      socket.off("new-change");
    };
  }, [socket]);

  return (
    <React.Fragment>
      {JSON.stringify(data)}
      {console.log(data)}
      <Button onClick={() => pushAlert("New Message")}>Send</Button>
      <Stack
        sx={{
          "& > div": {
            width: "100%",
            display: "flex",
            justifyItems: "space-between",
          },
        }}
      >
        <Box>
          <Typography>Notifications</Typography>
          <Switch />
        </Box>
      </Stack>
    </React.Fragment>
  );
}
