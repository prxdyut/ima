"use client";
import { Image } from "@mui/icons-material";
import { CancelIcon, RefreshIcon, SendIcon, UploadIcon } from "@/helper/icons";
import {
  AppBar,
  IconButton,
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  InputBase,
  Paper,
  LinearProgress,
  useMediaQuery,
  AvatarGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getUser, getChat } from "@/helper/apis";
import { getFormattedName } from "@/helper/functions";
import ImageViewer from "../../../../../components/images-viewer";
import { useRouter } from "next/navigation";
import UploadComponent from "@/components/image-uploader";
import { useUser } from "@clerk/nextjs";
import { io } from "socket.io-client";
import Loading from "./loading";
import moment from "moment";
// const socket = io("http://localhost:3001");

function ResponseBar(params) {
  const [uploadedImages, setuploadedImages] = useState(<></>);
  const [data, setdata] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isLargeScreen = useMediaQuery("(min-width:768px)");

  const type = "PATCH";
  const uri = "/api/chats?id=" + params.id;
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
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <Box sx={{ height: 56, pb: isLargeScreen ? 16 : 0 }} />
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
        {data.images?.length > 0 && (
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
        {loading && <LinearProgress />}
        <Toolbar
          sx={{
            "& > button": { mx: 0.2 },
            bgcolor: (theme) => theme.palette.primary.light,
            borderRadius: isLargeScreen && 2,
          }}
        >
          <UploadComponent
            buttonOnly
            buttonOnlyImageControls={setuploadedImages}
            onChange={(_) => setdata({ ...data, images: _ })}
            value={data?.images || []}
          />
          <InputBase
            size="small"
            placeholder="Enter Text"
            sx={{ flexGrow: 1, mx: 1 }}
            value={data?.content}
            onChange={(e) => setdata({ ...data, content: e.target.value })}
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

function Message({ children, type, time, images = [], imgSrc, sender }) {
  if (type == "recieved")
    return (
      <Box sx={{ display: "flex" }}>
        <Avatar
          src={imgSrc}
          sx={{
            height: 24,
            width: 24,
            ml: -1,
            mr: 1,
            mt: 2,
            visibility: !imgSrc && "hidden",
            display: imgSrc == "no" && "none",
          }}
        />
        <Box
          sx={{
            position: "relative",
            top: 20,
            width: "0",
            height: "0",
            borderStyle: "solid",
            borderWidth: "9px 10px 9px 0",
            borderColor: (theme) =>
              `transparent ${theme.palette.primary.main} transparent transparent`,
          }}
        />
        <Box>
          <Typography fontSize={12} color={"text.secondary"} sx={{ pt: 0.2 }}>
            <b>{sender}</b>
          </Typography>
          <Box
            sx={{
              bgcolor: "primary.main",
              p: 1,
              color: "primary.contrastText",
              borderRadius: 2,
              borderTopLeftRadius: 0,
              maxWidth: "70vw",
              transform: "translateX(-0.4px)",
            }}
          >
            {children}
            <Box sx={{ mt: 1 }} />
            <ImageViewer contents={images} cols={4} />
          </Box>
          <Typography fontSize={12} color={"text.secondary"} sx={{ pt: 0.2 }}>
            {time && <>&#128337;&nbsp;{time}</>}
          </Typography>
        </Box>
      </Box>
    );

  if (type == "sent")
    return (
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box>
          <Box
            sx={{
              bgcolor: "primary.light",
              p: 1,
              borderRadius: 2,
              borderTopRightRadius: 0,
              maxWidth: "75vw",
              transform: "translateX(0.4px)",
            }}
          >
            {children}
            <Box sx={{ mt: 1 }} />
            <ImageViewer contents={images} cols={4} />
          </Box>

          <Typography
            fontSize={12}
            color={"text.secondary"}
            sx={{ pt: 0.2, textAlign: "end" }}
          >
            {time && <>&#128337;&nbsp;{time}</>}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "0",
            height: "0",
            borderStyle: "solid",
            borderWidth: "9px 0 9px 10px",
            borderColor: (theme) =>
              `transparent transparent transparent ${theme.palette.primary.light}`,
          }}
        />
      </Box>
    );
}

export default function Page({ params: { roomId } }) {
  const [loading, updateLoading] = useState(true);
  const [replyTo, setReplyTo] = useState(false);
  const { user, isLoaded } = useUser();
  const [chatroom, updatechatroom] = useState({});

  const personalChatSenders =
    chatroom?.members?.filter((_) => _?.id != user?.id) || [];
  const isPersonalChat = personalChatSenders.length == 1;

  // useEffect(() => {
  //   socket.on("new-chat-" + roomId, (value) => {
  //     updatechatroom({ ...chatroom, messages: value.messages });
  //   });
  //   return () => {
  //     socket.off("new-chat-" + roomId);
  //   };
  // }, [socket, chatroom]);

  const isLargeScreen = useMediaQuery("(min-width:768px)");
  useEffect(() => {
    if (isLoaded)
      getChat(roomId)
        .then(async (res) => ({
          ...res,
          members: await Promise.all(
            res.members
              .filter((_) => _ != user.id)
              .map(async (_) => await getUser(_))
          ),
        }))
        .then((res) => updatechatroom(res))
        .finally((_) => updateLoading(false));
  }, [isLoaded]);

  if (loading) return <Loading />;

  return (
    <React.Fragment>
      <Box sx={{ height: 56 }} />
      <Box
        sx={{
          position: "fixed",
          top: isLargeScreen ? 36 : 56 + 24,
          zIndex: (theme) => theme.zIndex.appBar,
          bgcolor: "primary.light",
          px: 2,
          py: 1,
          borderRadius: 2,
          mx: -1,
          mt: -1,
          border: 1,
          borderColor: "primary.main",
        }}
        display={"flex"}
        alignItems={"center"}
      >
        <AvatarGroup>
          {chatroom.members?.map((user) => (
            <Avatar
              sx={{ height: 24, width: 24 }}
              src={user?.imageUrl}
              key={user.id}
            />
          ))}
        </AvatarGroup>

        <Typography sx={{ ml: 2 }}>
          {chatroom.roomName
            ? chatroom.roomName
            : chatroom.members
                ?.map((user) => getFormattedName(user))
                .join(", ")}
        </Typography>
      </Box>
      <Stack spacing={0.5}>
        {chatroom?.messages?.map((message, index) => {
          const time = moment(message?.timestamp).format("LT");
          const sent = message.sender == user?.id;

          const showTime = !(
            moment(message?.timestamp).format("LT") ==
            moment(chatroom?.messages[index + 1]?.timestamp).format("LT")
          );
          const showName = !(
            message?.sender == chatroom?.messages[index - 1]?.sender
          );

          return (
            <Message
              sender={
                showName &&
                getFormattedName(
                  chatroom.members.find((_) => _?.id == message.sender)
                )
              }
              imgSrc={
                isPersonalChat
                  ? "no"
                  : showName
                  ? chatroom.members.find((_) => _?.id == message.sender)
                      ?.imageUrl
                  : false
              }
              key={index}
              type={sent ? "sent" : "recieved"}
              time={showTime && time}
              images={[...message.images]}
            >
              {message.content}
            </Message>
          );
        })}
      </Stack>
      <ResponseBar replyTo={replyTo} id={roomId} />
    </React.Fragment>
  );
}
