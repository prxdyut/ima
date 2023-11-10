"use client";
import React from "react";
import {
  getFormattedDate,
  getFormattedName,
  getSubjectName,
} from "@/helper/functions";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ImageViewer from "@/components/images-viewer";
import { getTest, getUsersByBatch } from "@/helper/apis";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./loading";

function UpdateMarks(params) {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    
    getUsersByBatch(params.data.batch).then((res) => setUsers(res)).finally( () => setLoading(false));
  }, [params.data.batch]);
  useEffect(() => {
    setData(params.data.scores);
  }, [params.data.scores]);

  const type = "POST";
  const uri = "/api/scores?test=" + params.id;
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
        params.reload();
      })
      .catch((error) => console.log("error", error));
  };
  
if(loading) return <Box sx={{p:4, textAlign: 'center'}}> <CircularProgress/></Box>

  return (
    <React.Fragment>
      <Stack divider={<Divider />} spacing={2}>
        {users.map((user, index) => (
          <Grid container key={index}>
            <Grid item xs={1}>
              {index + 1}.
            </Grid>
            <Grid item xs={8}>
              <Typography component={"label"} htmlFor={"input-" + index}>
                <b>{getFormattedName(user)}</b>
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <InputBase
                id={"input-" + index}
                size="small"
                inputProps={{
                  type: "number",
                  placeholder: "00",
                  style: { textAlign: "right" },
                }}
                value={
                  data.find(({ user: user0 }) => user0 == user.id)?.obtained ||
                  ""
                }
                onChange={(e) => {
                  setData([
                    ...data.filter(({ user: user0 }) => user0 != user.id),
                    { user: user.id, obtained: e.target.value },
                  ]);
                }}
              />
            </Grid>
          </Grid>
        ))}
      </Stack>
      <Box textAlign={"end"}>
        <Button variant="contained" onClick={submit}>
          Update
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default function Page({ params: { id } }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadId, setLoadId] = useState(false);

  useEffect(() => {
    getTest(id)
      .then((res) => setData(res))
      .then(() => setLoading(false));
  }, [loadId]);
  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"column"} spacing={1}>
          <Typography variant="h5" fontWeight={600}>
            {getSubjectName(data?.subject)}
          </Typography>
          <Typography variant="h6" fontWeight={600}>
            {data?.title}
          </Typography>
          <Typography>{data?.teacher}</Typography>
          <Typography fontWeight={600}>
            {getFormattedDate(data?.created)}
          </Typography>
        </Stack>
        <Divider textAlign="right">Test</Divider>
        <Typography variant="caption">Questions</Typography>
        <ImageViewer contents={data?.questions || []} />
        <Typography variant="caption">Answers</Typography>
        <ImageViewer contents={data?.answers || []} />
        <Divider textAlign="right">Grades</Divider>
        <UpdateMarks
          data={data}
          id={data._id}
          reload={() => setLoadId(Math.random())}
        />
      </Stack>
    </React.Fragment>
  );
}
