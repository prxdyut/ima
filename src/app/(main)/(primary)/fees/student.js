"use client";
import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { getFees } from "@/helper/apis";
import { useEffect } from "react";
import moment from "moment/moment";

export default function Page(params) {
  const [tab, updateTab] = useState(0);
  const [data, setData] = useState({});
  console.log(data);
  useEffect(() => {
    getFees().then(setData);
  }, []);
  const totalPaid =
    data?.transactions
      ?.map(({ amount }) => amount)
      .reduce((partialSum, a) => partialSum + a, 0) || 0;
  const totalPending = data?.total - totalPaid;

  
  return (
    <React.Fragment>
      <Box sx={{ textAlign: "center", pt: 2 }}>
        <ButtonGroup>
          <Button
            variant={tab == 0 ? "contained" : "outlined"}
            onClick={() => updateTab(0)}
          >
            Fees Summary
          </Button>
          <Button
            variant={tab == 1 ? "contained" : "outlined"}
            onClick={() => updateTab(1)}
          >
            Payment History
          </Button>
        </ButtonGroup>
      </Box>
      {tab == 0 && (
        <React.Fragment>
          <Grid container sx={{ textAlign: "center", pt: 2 }}>
            <Grid item xs={6} sx={{ p: 1 }}>
              <Typography variant="subtitle2">Term</Typography>
              <Typography variant="body2">
                <b>2022 - 2024</b>
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ p: 1 }}>
              <Typography variant="subtitle2">Enrolled</Typography>
              <Typography variant="body2">
                <b>{data?.enrolled}</b>
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ p: 1 }}>
              <Typography variant="subtitle2">Start</Typography>
              <Typography variant="body2">
                <b>04 June 2022</b>
              </Typography>
            </Grid>
            <Grid item xs={6} sx={{ p: 1 }}>
              <Typography variant="subtitle2">End</Typography>
              <Typography variant="body2">
                <b>31 Dec 2023</b>
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <TableContainer
              component={Paper}
              sx={{
                maxWidth: 360,
                border: 2,
                borderColor: "primary.light",
                p: 1,
                "& .MuiTableCell-root": { borderBottom: "none" },
                borderRadius: 2,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              }}
              elevation={0}
            >
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component={"th"}>
                      <Typography>Total Fees</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        <b>₹ {data?.total}</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component={"th"}>
                      <Typography>Paid Fees</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        <b>₹ {totalPaid}</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component={"th"}>
                      <Typography>Outstanding Fees</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography>
                        <b>₹ {totalPending}</b>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              sx={{
                maxWidth: 360,
                borderRadius: 2,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
              }}
              fullWidth
            >
              Pay Now
            </Button>
          </Box>
        </React.Fragment>
      )}
      {tab == 1 && (
        <Stack spacing={2} sx={{ mt: 2 }}>
          {data?.transactions?.map((transaction, i) => (
            <Stack
              key={i}
              component={Paper}
              spacing={1.5}
              elevation={0}
              sx={{ border: 1, borderColor: "primary.main", p: 1 }}
            >
              <Box sx={{position: 'relative', textAlign: 'end'}}>
              <Typography
                variant="caption"
                sx={{
                  marginLeft: '-72px',
                  bgcolor: "primary.light",
                  color: "primary.main",
                  position: "absolute",
                  // right: 24,
                  width: "max-content",
                  px: 1,
                  borderRadius: 1,
                }}
              >
                Succesful
              </Typography>
</Box>
              <Typography variant="body2">
                Date Of Payment : <b>{moment(transaction.created).format('ll')}</b>
              </Typography>
              <Typography variant="body2">
                Mode Of Payment : <b>{transaction.mode}</b>
              </Typography>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Payment Amount : </Typography>
                <Typography>
                  <b>₹ {transaction?.amount}</b>
                </Typography>
              </Box>
              <Box />
              <Typography
                variant="caption"
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.main",
                  textAlign: "center",
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                Reciept has been mailed to you.
              </Typography>
            </Stack>
          ))}
        </Stack>
      )}
    </React.Fragment>
  );
}
