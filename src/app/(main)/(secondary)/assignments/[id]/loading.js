import React from "react";
import UIList from "@/components/list";
import { getAllAssignments, getAssignment } from "@/helper/apis";
import {
  getFormattedDate,
  getSubjectIcon,
  getSubjectName,
} from "@/helper/functions";
import { Box, Divider, Grid, Skeleton, Stack, Typography } from "@mui/material";
import FilesViewer from "@/components/files-viewer";

export default function Loading({}) {
  return (
    <React.Fragment>
      <Stack direction={"column"} spacing={2}>
        <Skeleton sx={{ width: 200, fontSize: "1.2rem", pb: 2 }} />
        <Skeleton sx={{ width: 100, fontSize: ".8rem" }} />

        <Divider textAlign="right">Assignment</Divider>
        <Skeleton sx={{ width: 160 }} />

        <Stack>
          <Skeleton sx={{ width: 260 }} />
          <Skeleton sx={{ width: 280 }} />
          <Skeleton sx={{ width: 240 }} />
        </Stack>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs>
              <Skeleton variant="rectangular" height={160} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="rectangular" height={160} />
            </Grid>
            <Grid item xs>
              <Skeleton variant="rectangular" height={160} />
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </React.Fragment>
  );
}
