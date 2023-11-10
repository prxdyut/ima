"use client";
import React from "react";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar, ListItemText,
  Skeleton,
  Stack
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

export default function Loading(params) {
  return (
    <Stack>

      <List
        sx={{
          mx: -2,
        }}
        component={Stack}
        divider={<Divider />}
      >
        {[...Array(7)].map((_, index) => (
          <React.Fragment key={index}>
          <ListItem
            secondaryAction={
              <Stack direction={"column"} spacing={0}>
                <Skeleton variant="text" sx={{ width: 70 }} />
                <Stack spacing={1} justifyContent={'flex-end'} direction={'row'}>
                  <Skeleton variant="circular" width={24} height={24} />
                  <Skeleton variant="circular" width={24} height={24} />
                </Stack>
              </Stack>
            }
          >
            <ListItemAvatar>
              <Skeleton variant="rounded" width={38} height={38} />
            </ListItemAvatar>
            <ListItemText
              primary={<Skeleton variant="text" sx={{ width: 140 }} />}
              secondary={<Skeleton variant="text"  sx={{ width: 80, fontSize:'0.8rem' }} />}
            />
          </ListItem></React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
