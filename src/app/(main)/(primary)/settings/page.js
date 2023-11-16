"use client";
import { Box, Button, Stack, Switch, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Page(params) {
  const [stringifieddata, setData] = useState([]);
  const data = stringifieddata.map((data) => JSON.parse(data));

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
