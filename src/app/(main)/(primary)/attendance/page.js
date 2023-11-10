"use client";
import { getAllUsers } from "@/helper/apis";
// import { getName } from "@global/helper/functions";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import useKeypress from "react-use-keypress";

export default function AttendancePage(params) {
  const [keys, setkeys] = useState([]);
  const [users, setUsers] = useState([]);
  const [allKeys, updateKeys] = useState([]);
  const [auto, setAuto] = useState(true);
  const [loading, setLoading] = useState(true);

  const findUser = (card) =>
    users.find(({ publicMetadata }) => publicMetadata.card == card);

  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .finally(setLoading(false));
  }, []);

  useKeypress(
    ["1", "2", "3", "4", "5", "6", "7", "8", "8", "9", "0"],
    (event) => {
      if (auto) {
        const key = [...keys, `${event.key}`];
        setkeys(key);
      }
    }
  );

  if (keys.length >= 10) {
    updateKeys([...new Set([...allKeys, `${keys.join("")}`])]);
    setkeys([]);
  }

  return (
    <React.Fragment>
      <Stack spacing={2}>
        <TextField
          size="small"
          value={keys.join("")}
          onChange={(e) => {
            setkeys(e.target.value.split(""));
          }}
          disabled={auto}
        />
        <Stack
          spacing={1}
          direction={"row"}
          component={FormControl}
          alignItems={"center"}
        >
          {loading && <CircularProgress size={24} />}
          
          <Switch
            checked={auto}
            onClick={() => {
              setAuto(!auto);
              setkeys([]);
            }}
          />
          <Typography>Card Punch Recognition</Typography>
          <Box />
          <Button
            size="small"
            variant="contained"
            onClick={() => {
              setkeys([]);
            }}
          >
            Reset
          </Button>
        </Stack>
        <Box>
          {JSON.stringify(
            allKeys
              .map((key) => findUser(key) || {})
              .map(({ username }) => username || false)
              .filter((_) => _)
          )}
        </Box>
      </Stack>
    </React.Fragment>
  );
}
