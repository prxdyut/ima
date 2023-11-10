import React from "react";
import { Box, Grid, Skeleton, Stack, Typography } from "@mui/material";

export default async function Page({ }) {
  
  return (
    <React.Fragment>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"column"} spacing={1}>
          <Skeleton variant="text" sx={{fontSize: '2rem'}} width={200}></Skeleton>
          <Skeleton variant="text" sx={{fontSize: '1.6rem'}} width={160}></Skeleton>
          <Skeleton variant="text" sx={{fontSize: '.8rem'}} width={80}></Skeleton>
          <Skeleton variant="text" width={100}></Skeleton>
        </Stack>
        <Typography variant="caption">Questions</Typography>
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
        <Typography variant="caption">Answers</Typography>
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
