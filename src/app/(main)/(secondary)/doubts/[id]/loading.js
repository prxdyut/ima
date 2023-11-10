import React from "react";
import UIList from "@/components/list";
import { getAllAssignments, getAssignment } from "@/helper/apis";
import {
  getFormattedDate,
  getSubjectIcon,
  getSubjectName,
} from "@/helper/functions";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";
import ImageViewer from "@/components/images-viewer";
import { getDoubt } from "@/helper/apis";

export default  function Page({  }) {
  
  return (
    <React.Fragment>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"column"} spacing={1}>
          <Skeleton sx={{ width: 200, fontSize: "1.2rem", pb: 2 }} />
          <Skeleton sx={{ width: 100, fontSize: ".8rem" }} />
          <Skeleton sx={{ width: 160 }} />
        </Stack>
        <Typography variant="caption">Doubt</Typography>
        <Stack >
        <Skeleton sx={{ width: 260 }} />
        <Skeleton sx={{ width: 280 }} />
        <Skeleton sx={{ width: 240 }} /></Stack>
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
