'use client'
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { ModalContext } from "@/helper/modal-context";

const UIList = ({ contents = [{}], style = {}, target = '' }) => {
  const createModal = useContext(ModalContext);

  return (
    <Stack
      direction={"row"}
      spacing={2}
      sx={style}
    >
      <List
        component={Stack}
        divider={<Divider />}
        sx={{
          width: "100%",
          "& .MuiListItemIcon-root svg": {
            height: "2.4rem",
            width: "2.4rem",
            padding: "0.4rem",
          },
        }}
      >
        {contents.map((_, index) => (
          <ListItem
            key={index}
            disablePadding
            secondaryAction={
              <Stack direction={"column"} textAlign={'end'}>
                <Typography variant="caption" color={"text.secondary"}>
                  {_?.helper || ""}
                </Typography>
                <Grid container>
                  {(_?.more || []).map((option, index) => (
                    <Grid item xs key={index}>
                      <IconButton
                        size="small"
                        onClick={() => createModal(option?.modal)}
                      >
                        {option?.icon}
                      </IconButton>
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            }
          >
            <ListItemButton
              // more={Boolean(_?.more)}
              LinkComponent={Link}
              href={_?.link}
              target={target}
            >
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
};

export default UIList;
