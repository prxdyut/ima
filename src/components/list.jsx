import { Inbox } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

const UIList = ({ contents = [{}], style = {} }) => (
  <Stack direction={"row"} spacing={2} sx={{ ...style }}>
    <List
      sx={{
        width: 400,
        "& svg": {
          bgcolor: "primary.light",
          color: "primary.main",
          height: "2.4rem",
          width: "2.4rem",
          padding: "0.4rem",
          borderRadius: 1,
        },
      }}
      component={Stack}
      divider={<Divider />}
    >
      {contents.map((_, index) => (
        <ListItem
          key={index}
          disablePadding
          secondaryAction={
            <Typography variant="caption" color={"text.secondary"}>
              {_?.helper || ""}
            </Typography>
          }
        >
          <ListItemButton>
            {_?.icon && <ListItemIcon>{_.icon}</ListItemIcon>}
            <ListItemText
              primary={_?.title || ""}
              secondary={_?.description || ""}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Stack>
);

export default UIList;
