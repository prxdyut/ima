"use client";
import React from "react";
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
                  <Skeleton variant="text" sx={{ width: 80, fontSize: '1.8rem' }} />
              }
            >
              <ListItemText
                primary={<Skeleton variant="text" sx={{ width: 100 }} />}
                secondary={<Skeleton variant="text" sx={{ width: 60, fontSize:'0.8rem' }} />}
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Stack>
  );
}
