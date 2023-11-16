import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

export default function Loading(params) {
  
  return (
    <List spacing={1}>
      {[...Array(5)].map((_, i) => (
        <ListItem key={i}>
          <ListItemAvatar>
            <Skeleton variant="circular" height={40} width={40} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton width={120 + Math.ceil(Math.random() * 100)}/>}
            secondary={<Skeleton width={80 + Math.ceil(Math.random() * 100)}/>}
          />
        </ListItem>
      ))}

      <Skeleton width={120} sx={{mt:2, mb:1, fontSize: 30}}/>
      {[...Array(5)].map((_, i) => (
        <ListItem key={i}>
          <ListItemAvatar sx={{ minWidth: 36 }}>
            <Skeleton variant="circular" height={24} width={24} />
          </ListItemAvatar>
          <ListItemText
            primary={<Skeleton width={120 + Math.ceil(Math.random() * 100)}/>}
          />
        </ListItem>
      ))}
    </List>
  );
}
