"use client";
import { getAttendanceByBatch } from "@/helper/apis";
import { useUser } from "@clerk/nextjs";
import {
  ArrowBackIosNew,
  ArrowBackIosNewRounded,
  ArrowForwardIos,
  ArrowForwardIosRounded,
  ArrowRightAltRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment/moment";
import React, { useEffect, useState } from "react";

export default function Page(params) {
  const [month, setMonth] = useState(new Date().getMonth());
  const year = new Date().getFullYear() + Math.floor(month / 12);
  const [data, setData] = useState([]);

  const formattedDate = new Date(new Date().setMonth(month)).setFullYear(year);

  // const backDate = new Date(new Date().setMonth(month + 1)).setFullYear(year);

  // const nextDate = new Date(new Date().setMonth(month + 1)).setFullYear(year);

  function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  const incrementMonth = () => {
    setMonth(month + 1);
  };
  const decrementMonth = () => {
    setMonth(month - 1);
  };
  const incrementYear = () => {
    setMonth(month + 12);
  };
  const decrementYear = () => {
    setMonth(month - 12);
  };
  const { user, isLoaded } = useUser();
  useEffect(() => {
    if (isLoaded)
      getAttendanceByBatch(user.publicMetadata.batch)
        .then((_) => _.logs)
        .then(setData);
  }, [isLoaded]);

  return (
    <React.Fragment>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ px: 2, pt: 1 }}
      >
        <IconButton onClick={decrementMonth}>
          <ArrowBackIosNewRounded fontSize="small" />
        </IconButton>

        <Typography>
          <b>{getMonthName(month)}</b>
        </Typography>

        <IconButton
          disabled={Boolean(
            moment()
              .set({ month: month + 1, year })
              .isAfter()
          )}
          onClick={incrementMonth}
        >
          <ArrowForwardIosRounded fontSize="small" />
        </IconButton>
      </Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ px: 6, pt: 1 }}
      >
        <IconButton onClick={decrementYear}>
          <ArrowBackIosNewRounded fontSize="small" />
        </IconButton>

        <Typography>
          <b>{year}</b>
        </Typography>

        <IconButton
          onClick={incrementYear}
          disabled={Boolean(
            moment()
              .set({ month, year: year + 1 })
              .isAfter()
          )}
        >
          <ArrowForwardIosRounded fontSize="small" />
        </IconButton>
      </Stack>
      <Grid container spacing={2} sx={{ pt: 2 }}>
        {[...new Array(moment(formattedDate).daysInMonth())].map((a, i) => {
          const currentDate = moment()
            .set({ month, year, date: i + 1 })
            .format("L");

          const currentDay = data.find(({ date }) => date == currentDate);
          const checkHoliday = !Boolean(currentDay);
          const checkPresent = currentDay?.students?.find((_) => _ == user.id);
          const passed = Boolean(moment(currentDate).isAfter());

          return (
            <Grid item xs={6} key={i}>
              <Box sx={{ borderRadius: 1, display: passed ? 'none' : 'flex' }} display={"flex"}>
                <Box
                  sx={{
                    border: 3,
                    borderColor: "primary.main",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                    pl: 1,
                    pr: 2,
                    py: 0.5,
                    borderRight: 0,
                    color: null,
                  }}
                >
                  {i + 1}.
                </Box>
                <Box
                  sx={{
                    
                    bgcolor: checkHoliday
                      ? "primary.light"
                      : checkPresent
                      ? null
                      : "primary.main",
                    flexGrow: 1,
                    borderTopRightRadius: 8,
                    borderBottomRightRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: checkHoliday
                      ? "primary.main"
                      : checkPresent
                      ? null
                      : "white",
                    border: checkHoliday ? 0 : checkPresent ? 3 : 0,
                    borderLeft: 0,
                    borderColor: "primary.main",
                    fontWeight: checkHoliday
                      ? "bold"
                      : checkPresent
                      ? null
                      : null,
                  }}
                >
                  {
                     checkHoliday
                    ? "Holiday"
                    : checkPresent
                    ? "Present"
                    : "Absent"}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
