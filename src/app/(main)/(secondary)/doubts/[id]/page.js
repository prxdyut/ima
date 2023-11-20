"use client";
import React from "react";
import UIList from "@/components/list";
import { getAllAssignments, getAssignment, getUser } from "@/helper/apis";
import {
  getFormattedDate,
  getFormattedDateShort,
  getFormattedName,
  getSubjectIcon,
  getSubjectName,
} from "@/helper/functions";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  LinearProgress,
  NoSsr,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FilesViewer from "@/components/files-viewer";
import { getDoubt } from "@/helper/apis";
import Loading from "./loading";
import { useState } from "react";
import { useEffect } from "react";
import { CancelIcon, RefreshIcon, SendIcon, UploadIcon } from "@/helper/icons";
import UploadComponent from "@/components/file-uploader";
import { useRouter } from "next/navigation";
import UIAccordian from "@/components/accordians";
import { More, Reply } from "@mui/icons-material";

function ResponseBar(params) {
  const [uploadedImages, setuploadedImages] = useState(<></>);
  const [data, setdata] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setdata({
      ...data,
      replyTo: params.replyTo._id,
      replyToName: params.replyTo.user,
    });
  }, [params.replyTo]);

  const type = "POST";
  const uri = "/api/responses?doubt=" + params.id;
  const submit = () => {
    setdata({});
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
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        params.reload();
      })
      .catch((error) => console.log("error", error));
  };
  
  const isLargeScreen = useMediaQuery("(min-width:768px)");
  console.log(data);
  return (
    <React.Fragment key={params.loadId}>
      <Box sx={{ height: 56 }} />
      <Box
        sx={{
          bottom: isLargeScreen ? 16 : 0,
          left: 0,
          position: "fixed",
          height: "min-content",
          width: "100%",
          px: isLargeScreen && "30%",

        }}
      >
        {data.replyTo && (
          <Typography
            variant="caption"
            sx={{
              mx: 2,
              py: 0.5,
              p: 1,
              display: "flex",
            }}
            component={Paper}
            elevation={0}
          >
            <Reply fontSize="20px" />
            &nbsp; Replying To {data.replyToName}
            <Box sx={{ flexGrow: 1 }} />
            <Box
              onClick={() => {
                const { replyTo, replyToName, ...data0 } = data;
                setdata({ ...data0 });
              }}
            >
              <CancelIcon sx={{ fontSize: 18 }} />
            </Box>
          </Typography>
        )}
        {data.files?.length > 0 && (
          <Paper
            sx={{
              mx: 2,
              pb: 1,
              mt: 0,
            }}
            elevation={0}
          >
            {uploadedImages}
          </Paper>
        )}
        {params.loading && <LinearProgress />}
        <Toolbar
          sx={{
            "& > button": { mx: 0.2 },
            bgcolor: (theme) => theme.palette.primary.light,
            borderRadius: isLargeScreen && 2
          }}
        >
          <IconButton onClick={() => params.reload()}>
            <RefreshIcon />
          </IconButton>
          <InputBase
            size="small"
            placeholder="Enter Text"
            sx={{ flexGrow: 1, mx: 1 }}
            value={data?.content}
            onChange={(e) => setdata({ ...data, content: e.target.value })}
          />
          <UploadComponent
            buttonOnly
            buttonOnlyImageControls={setuploadedImages}
            onChange={(_) => setdata({ ...data, files: _ })}
            value={data?.files || []}
          />
          <IconButton
            onClick={submit}
            sx={{
              bgcolor: (theme) =>
                Boolean(data?.content) &&
                theme.palette.primary.main + " !important",
              color: (theme) => theme.palette.primary.contrastText,
            }}
            disabled={!Boolean(data?.content)}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </Box>
    </React.Fragment>
  );
}

export default function Page({ params: { id } }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [softloading, setsoftLoading] = useState(false);
  const [loadId, setLoadId] = useState(false);
  const [replyTo, setReplyTo] = useState(false);

  const Comment = ({
    user,
    content,
    files,
    profileImg,
    created,
    _id,
    replyTo,
    reply = false,
  }) => {
    const [click, setClick] = useState(false);
    
    return (
      <Card
        elevation={0}
        sx={{
          mx: -2,
          "& .MuiCardHeader-avatar": { mr: 1 },
          pl: reply && 3,
          pr: reply && 2,
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ height: 24, width: 24 }} src={profileImg}></Avatar>
          }
          action={
            <Typography
              variant="caption"
              component={"div"}
              sx={{ pt: 0.5, pr: 2 }}
            >
              {getFormattedDateShort(new Date(created))}
            </Typography>
          }
          title={<b>{user}</b>}
          sx={{ pb: 0, pt: 1 }}
          onClick={() => setClick(!click)}
        />
        <CardContent sx={{ pt: 0, pl: 6, pb: 0 }}>
          {content}
          <Box sx={{ height: 4 }} />
          <FilesViewer contents={files} cols={6} />
        </CardContent>
        {
          <CardActions sx={{ pl: 6, pb: 0 }}>
            <Collapse in={click}>
              <Button
                size="small"
                variant="text"
                onClick={() => {
                  reply
                    ? setReplyTo({ _id: replyTo, user })
                    : setReplyTo({ _id, user });
                }}
              >
                <Reply fontSize="small" /> &nbsp; Reply
              </Button>
            </Collapse>
          </CardActions>
        }
      </Card>
    );
  };

  useEffect(() => {
    if (loadId) setsoftLoading(true);
    getDoubt(id)
      .then(async ({ user, ...res }) => ({
        ...res,
        user: await getUser(user).then(
          (user0) => getFormattedName(user0)
        ),
      }))
      .then(async (res) => ({
        ...res,
        responses: await Promise.all(
          res.responses.map(async (_) => {
            const user = await getUser(_.user);
            return {
              ..._,
              user: (user.firstName || "") + " " + (user.lastName || ""),
              profileImg: user.imageUrl,
            };
          })
        ),
      }))
      .then((res) => setData(res))
      .then(() => setLoading(false))
      .then(() => setsoftLoading(false))
      .then(() =>
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: "smooth",
        })
      );
  }, [loadId]);
  const comments = data?.responses?.filter(({ replyTo }) => !replyTo) || [];
  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <Stack direction={"column"} spacing={2}>
        <Stack direction={"column"} spacing={1}>
          <Typography variant="h6" fontWeight={600}>
            {data?.topic}
          </Typography>
          <Typography>{data?.user}</Typography>
          <Typography fontWeight={600}>
            {getFormattedDate(data?.created)}
          </Typography>
          <Divider textAlign="right">Doubt</Divider>
        </Stack>
        <NoSsr>
          <div dangerouslySetInnerHTML={{ __html: data?.content }} />
        </NoSsr>
        <FilesViewer contents={data?.files || []} />
        <Box />
        <Divider textAlign="right">Responses</Divider>
        <Box>
          {comments.map((params) => {
            const replies = data.responses.filter(
              ({ replyTo }) => replyTo == params._id
            );
            return (
              <React.Fragment key={params}>
                <Box sx={{ height: 24 }} />
                <Comment {...params} />
                {replies.map((params) => (
                  <Comment {...params} reply key={params} />
                ))}
              </React.Fragment>
            );
          })}
        </Box>
      </Stack>
      <ResponseBar
        id={id}
        reload={() => setLoadId(Math.random() * Math.random())}
        loadId={loadId}
        loading={softloading}
        replyTo={replyTo}
      />
    </React.Fragment>
  );
}
