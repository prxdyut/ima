"use client";
import BatchSelect from "@/components/batch-select";
import { getAttendanceByDateAndBatch, getAllUsers } from "@/helper/apis";
import { getFormattedName } from "@/helper/functions";
import { CancelIcon } from "@/helper/icons";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
 
import React, { useEffect, useState } from "react";
import useKeypress from "react-use-keypress";

export default function AttendancePage(params) {
  const [keys, setkeys] = useState([]);
  const [batch, setBatch] = useState(null);
  const [date, setDate] = useState(new Date());
  const [users, setUsers] = useState([]);
  const [allKeys, updateKeys] = useState([]);
  const [auto, setAuto] = useState(true);
  const [loading, setLoading] = useState(true);

  const type = "POST";
  const uri = "/api/attendance";

  const submit = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: type,
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(uri, requestOptions)
      .then((result) => {
        setLoading(false);
        // params.reload();
      })
      .catch((error) => console.log("error", error));
  };

  const findUserByCard = (card) =>
    users.find(({ publicMetadata }) => publicMetadata.card == card);
  const findUserById = (userId) => users.find(({ id }) => id == userId);

  const punchedUsers = allKeys.map((key) => findUserByCard(key) || {});
  const data = {
    logs: {
      students: punchedUsers.map(({ id }) => id || false).filter((_) => _),
      date: moment(date).format("L"),
      batch,
    },
  };

  useEffect(() => {
    if (date && batch) {
      setLoading(true);
      getAttendanceByDateAndBatch(moment(date).format("L"), batch)
        .then((e) => e?.students)
        .then(
          (res) => res?.map((_) => findUserById(_)?.publicMetadata.card) || []
        )
        .then((e) => updateKeys(e))
        .finally(() => setLoading(false));
    }
  }, [date, batch]);

  useEffect(() => {
    getAllUsers().then(setUsers).finally(setLoading(false));
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={"Date"}
            value={dayjs(date || new Date())}
            onChange={(e) => setDate(new Date(e))}
          />
        </LocalizationProvider>
        <BatchSelect value={batch} onChange={(e) => setBatch(e.target.value)} />
        {batch && (
          <React.Fragment>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <React.Fragment>
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
                    variant="outlined"
                    onClick={() => {
                      setkeys([]);
                    }}
                  >
                    Reset
                  </Button>
                </Stack>
                <Stack spacing={2}>
                  {punchedUsers.map((user, index) => (
                    <Box display={"flex"} key={index}>
                      <Typography>{getFormattedName(user)}</Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Box
                        onClick={() =>
                          updateKeys([
                            ...allKeys.filter(
                              (_) => _ != user.publicMetadata.card
                            ),
                          ])
                        }
                      >
                        <CancelIcon />
                      </Box>
                    </Box>
                  ))}
                </Stack>
                <Box textAlign={"end"}>
                  <Button onClick={submit} variant="contained">
                    Update
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Stack>
    </React.Fragment>
  );
}
