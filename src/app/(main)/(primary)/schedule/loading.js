"use client";
import React, { useState } from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  Stack,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import UICalender from "@/components/calender";
import dayjs from "dayjs";

export default function Loading(params) {
  const [value, setValue] = useState(dayjs.tz(new Date(), "Etc/GMT+1"));

  return (
    <Stack>
      <UICalender value={value} onChange={(date) => setValue(date)} />
      <List sx={{}} component={Stack} divider={<Divider />}>
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            <ListItem
              secondaryAction={<Skeleton variant="text"  sx={{ width: 70 , fontSize: '.8rem'}} />}
            >
              <ListItemAvatar>
                <Skeleton variant="circular" width={30} height={30} />
              </ListItemAvatar>
              <ListItemText
                primary={<Skeleton variant="text" sx={{ width: 140 }} />}
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
