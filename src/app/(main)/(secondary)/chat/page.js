"use client";
import { Groups, Image } from "@mui/icons-material";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllUsers, getChats } from "@/helper/apis";
import { getFormattedName } from "@/helper/functions";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function Page(params) {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const router = useRouter();

  const type = "POST";
  const uri = "/api/chats";
  const submit = (id_) => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ member: id_ });

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
        router.push("/chat/" + result.roomId);
      })
      .catch((error) => console.log("error", error));
  };

  console.log();
  useEffect(() => {
    getChats().then((res) => setData(res));
    getAllUsers()
      .then((res) => setUsers(res))
      .then(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  const chats = data.map(({ members, ...restData }) => ({
    ...restData,
    members: members.map((_) => users.find(({ id }) => id == _)),
  }));
  const activeChatroomUsers = chats
    .flatMap(({ members }) =>
      members.length == 2 ? members.flatMap((_) => _.id) : []
    )
    .filter((id) => id != user?.id);

  const eligibleChatRoomsUsers = users
    .map((_) => _?.id)
    .filter((id) => id != user.id)
    .filter((item) => !activeChatroomUsers.includes(item))
    .map((_) => users.find(({ id }) => id == _));

  return (
    <React.Fragment>
      <List sx={{ mx: -2 }}>
        {chats.map((chat) => {
          const isGroupChat =
            chat.members.filter((_) => _?.id != user?.id).length > 1;
          const personalChatSenders = chat.members.filter(
            (_) => _?.id != user?.id
          );
          const isPersonalChat = personalChatSenders.length == 1;
          const chatSendersNames = personalChatSenders
            .map((user) => (user ? getFormattedName(user) : null))
            .join(", ");
          const chatSendersUserNames = personalChatSenders
            .map((user) => "@" + user?.username)
            .join(" ");

          if (isPersonalChat)
            return (
              <ListItemButton LinkComponent={Link} href={"chat/" + chat.roomId}>
                <ListItemAvatar>
                  <Avatar src={personalChatSenders[0].imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>{chatSendersNames}</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2">
                      <i> {chatSendersUserNames}</i>
                    </Typography>
                  }
                />
              </ListItemButton>
            );
          if (isGroupChat)
            return (
              <ListItemButton LinkComponent={Link} href={"chat/" + chat.roomId}>
                <ListItemAvatar>
                  <Avatar>
                    <Groups />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography>{chat.roomName}</Typography>
                    </Box>
                  }
                  secondary={
                    <Typography variant="body2">
                      {chatSendersNames}
                    </Typography>
                  }
                />
              </ListItemButton>
            );
        })}
      </List>
      <Typography>
        <b>Start a Chat</b>
      </Typography>
      <List sx={{ mx: -2 }}>
        {eligibleChatRoomsUsers.map((user) => (
          <ListItemButton onClick={() => submit(user.id)} key={user._id}>
            <ListItemAvatar sx={{ minWidth: 36 }}>
              <Avatar
                src={user?.imageUrl}
                sx={{ height: 24, width: 24 }}
              ></Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography>
                    {getFormattedName(user)}
                    <Typography variant="caption">
                      <i>
                        &nbsp;
                        {user?.publicMetadata?.type}
                      </i>
                    </Typography>
                  </Typography>
                  <Typography variant="caption">
                    <i> @{user.username}</i>
                  </Typography>
                </Box>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </React.Fragment>
  );
}
