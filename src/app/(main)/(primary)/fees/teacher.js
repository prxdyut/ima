"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import React, { useContext, useState } from "react";
import { getFees, getUser } from "@/helper/apis";
import { getFormattedName } from "@/helper/functions";
import { useEffect } from "react";
import moment from "moment/moment";
import { ExpandMore } from "@mui/icons-material";
import BatchSelect from "@/components/batch-select";
import FormBuilder from "@/components/form-builder";
import { ModalContext } from "@/helper/modal-context";

export default function Page(params) {
  const [batch, updateBatch] = useState("");
  const [data, setData] = useState([]);
  const createModal = useContext(ModalContext);

  useEffect(() => {
    getFees()
      .then(
        async (res) =>
          await Promise.all(
            res.map(async (_) => ({ ..._, student: await getUser(_?.student) }))
          )
      )
      .then(setData);
  }, []);

  return (
    <React.Fragment>
      <Stack spacing={2}>
        {/* <Box component={'iframe'}  frameBorder="0" src="./notification-button.html" sx={{width: 400, height: 56}}></Box> */}
        <BatchSelect
          value={batch}
          onChange={(e) => updateBatch(e.target.value)}
        />
        <Grid container sx={{ textAlign: "center", pt: 2 }}>
          <Grid item xs sx={{ p: 1 }}>
            <Typography variant="subtitle2">Term</Typography>
            <Typography variant="body2">
              <b>2022 - 2024</b>
            </Typography>
          </Grid>
          <Grid item xs sx={{ p: 1 }}>
            <Typography variant="subtitle2">Start</Typography>
            <Typography variant="body2">
              <b>04 June 2022</b>
            </Typography>
          </Grid>
          <Grid item xs sx={{ p: 1 }}>
            <Typography variant="subtitle2">End</Typography>
            <Typography variant="body2">
              <b>31 Dec 2023</b>
            </Typography>
          </Grid>
        </Grid>
        <Box>
          {data?.map((_, i) => {
            const form = (
              <FormBuilder
                formFields={[
                  { type: "short", label: "Reference ID", name: "ref" },
                  { type: "num", label: "Amount", name: "amount" },
                  {
                    type: "option",
                    label: "Payment Mode",
                    name: "mode",
                    options: [
                      { value: "cash", label: "Cash" },
                      { value: "cheque", label: "Cheque" },
                      { value: "upi", label: "UPI" },
                      { value: "wallets", label: "Online Wallet" },
                      { value: "deposit", label: "Bank Deposit" },
                    ],
                  },
                ]}
                defaultData_={{ student: _?.student?.id }}
                onSubmit={(result) => {
                  console.log(result);
                  createModal(
                    <Typography variant="h6" sx={{ textAlign: "center", p: 4 }}>
                      Payment Updated Successfully for{" "}
                      {getFormattedName(_?.student)}
                    </Typography>
                  );
                }}
                uri={`/api/fees`}
              />
            );
            const totalPaid =
              _?.transactions
                ?.map(({ amount }) => amount)
                .reduce((partialSum, a) => partialSum + a, 0) || 0;
            const totalPending = _?.total - totalPaid;
            return (
              <Accordion
                key={i}
                elevation={0}
                sx={
                  {
                    // border: 2,
                    // borderColor: "primary.main",
                  }
                }
              >
                <AccordionSummary
                  sx={{ bgcolor: "primary.light" }}
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    {getFormattedName(_?.student)}{" "}
                    <Typography variant="caption">
                      {_?.student?.publicMetadata?.card}
                    </Typography>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={1} sx={{ mt: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Enrollment Date : </Typography>
                      <Typography>
                        <b>21 June</b>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Total Fees : </Typography>
                      <Typography>
                        <b>₹ {_?.total}</b>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Paid Amount : </Typography>
                      <Typography>
                        <b>₹ {totalPaid}</b>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>Outstanding Amount : </Typography>
                      <Typography>
                        <b>₹ {totalPending}</b>
                      </Typography>
                    </Box>
                    <Box />
                    <Button
                      variant="contained"
                      sx={{ mx: 2, alignSelf: "end" }}
                      onClick={() => createModal(form, "Update Payment")}
                    >
                      Update Payment
                    </Button>
                    <Box />
                    <Typography variant="h6">History</Typography>

                    {_?.transactions?.map((__, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2">
                          {moment(__?.date).format("ll")} <i>{__?.mode} </i>
                        </Typography>
                        <Typography variant="body2">
                          <b>₹ {__?.amount}</b>
                        </Typography>
                      </Box>
                    ))}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Stack>
    </React.Fragment>
  );
}
