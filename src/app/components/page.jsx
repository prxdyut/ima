"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AppBar,
  Avatar,
  Backdrop,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardHeader,
  Checkbox,
  Collapse,
  Container,
  Divider,
  Fade,
  FormControlLabel,
  FormGroup,
  Grid,
  Grow,
  IconButton,
  ImageList,
  ImageListItem,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Slide,
  Stack,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowBackIosNew,
  ArrowForwardIos,
  Assignment,
  CalendarToday,
  Close,
  ExpandMore,
  Help,
  HomeMax,
  Inbox,
  LibraryAdd,
  LibraryMusic,
  Logout,
  Menu as MenuIcon,
  MoreVert,
  ReceiptLong,
  Schedule,
  Search as SearchIcon,
  Timelapse,
} from "@mui/icons-material";
import { useDebounce } from "@uidotdev/usehooks";
import React, { useEffect, useState } from "react";
import Section from "@/components/section";
import { UserButton } from "@clerk/nextjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import SunEditor from "suneditor-react";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";

const ReactViewer = dynamic(() => import("react-viewer"), { ssr: false });

import "suneditor/dist/css/suneditor.min.css";
import Link from "next/link";
import { TransitionGroup } from "react-transition-group";

const Navbar = () => (
  <Paper
    component="form"
    elevation={0}
    sx={{
      display: "flex",
      alignItems: "center",
      bgcolor: "primary.light",
      borderRadius: 10,
      px: 1,
      py: 0.6,
      maxWidth: 400,
    }}
  >
    <IconButton>
      <MenuIcon />
    </IconButton>
    <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search IMA" />
    <IconButton type="button" sx={{ mr: 1 }}>
      <SearchIcon />
    </IconButton>
    <UserButton afterSignOutUrl="/" />
  </Paper>
);

const Buttons = () => (
  <Stack direction={"row"} spacing={2} sx={{ width: "min-content" }}>
    <Button variant="contained">Button</Button>
    <Button variant="outlined">Button</Button>
    <Button variant="text">Button</Button>
  </Stack>
);

const Checkboxes = () => (
  <FormGroup>
    <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
  </FormGroup>
);

const Lists = () => (
  <Stack direction={"row"} spacing={2} sx={{ width: "100%" }}>
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
      {Array(2)
        .fill()
        .map((_, index) => (
          <ListItem
            key={index}
            disablePadding
            secondaryAction={
              <Typography variant="caption" color={"text.secondary"}>
                Helper
              </Typography>
            }
          >
            <ListItemButton>
              <ListItemIcon>
                <Inbox />
              </ListItemIcon>
              <ListItemText primary="Title" secondary="Description" />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
    <List sx={{ width: 400 }} component={Stack} divider={<Divider />}>
      {Array(2)
        .fill()
        .map((_, index) => (
          <ListItem
            key={index}
            disablePadding
            secondaryAction={
              <Typography fontWeight={600} color={"primary.main"}>
                0 / 100
              </Typography>
            }
          >
            <ListItemButton>
              <ListItemText primary="Title" secondary="Description" />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
    <List sx={{ width: 400 }} component={Stack} divider={<Divider />}>
      {Array(2)
        .fill()
        .map((_, index) => (
          <ListItem
            key={index}
            disablePadding
            secondaryAction={
              <Typography variant="caption" color={"text.secondary"}>
                Helper
              </Typography>
            }
          >
            <ListItemButton>
              <ListItemText primary="Long Title" secondary="Long Description" />
            </ListItemButton>
          </ListItem>
        ))}
    </List>
    <List
      sx={{ width: 400 }}
      component={Stack}
      divider={<Divider />}
      spacing={2}
    >
      {Array(2)
        .fill()
        .map((_, index) => (
          <ListItem
            key={index}
            disablePadding
            secondaryAction={
              <Typography variant="caption" color={"text.secondary"}>
                Helper
              </Typography>
            }
          >
            <ListItemIcon>
              <Inbox />
            </ListItemIcon>
            <ListItemText primary="Schedule" />
          </ListItem>
        ))}
    </List>
  </Stack>
);

const BotBar = () => {
  const [value, setValue] = React.useState(0);
  const tabs = [
    { icon: <HomeMax />, label: "Activity" },
    { icon: <Timelapse />, label: "Academics" },
    { icon: <Schedule />, label: "Schedule" },
    { icon: <LibraryAdd />, label: "Library" },
  ];
  return (
    <Paper elevation={0} sx={{ width: 400 }}>
      <BottomNavigation
        sx={{
          bgcolor: "primary.light",
          height: 84,
        }}
        value={value}
      >
        {tabs.map(({ label, icon, href }, idx) => (
          <BottomNavigationAction
            label={label}
            value={idx}
            key={idx}
            icon={
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  color: idx == value ? "white" : "primary.main",
                  bgcolor: idx == value && "primary.main",
                  borderRadius: 6,
                  transition: "500ms",
                }}
              >
                {icon}
              </Box>
            }
            onClick={() => setValue(idx)}
            sx={{
              color: "primary.main",
              fontWeight: 500,
              "& .Mui-selected": {
                mt: 1,
              },
              transition: "background 1s, color 1s",
              paddingInline: "0",
            }}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
};

const Tabs_ = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabs = ["Tab 1", "Tab 2", "Tab 3"];

  return (
    <Box sx={{ width: 400 }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            style: {
              height: 2.5,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
            },
          }}
          variant="fullWidth"
        >
          {tabs.map((tab, i) => (
            <Tab key={i} label={tab} sx={{ color: "primary.main" }} />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
};

const Calender_ = () => {
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
    </LocalizationProvider>
  );
};

const TextEditor = () => <SunEditor />;

const TopBar_ = () => (
  <AppBar position="static" sx={{ width: 400 }}>
    <Toolbar>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
      >
        <ArrowBackIosNew />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        News
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

const ImageViewer = () => {
  const [visible, setVisible] = useState(false);
  const itemData = [
    {
      src: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format",
      alt: "Breakfast",
    },
    {
      src: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=164&h=164&fit=crop&auto=format",
      alt: "Burger",
    },
    {
      src: "https://images.unsplash.com/photo-1522770179533-24471fcdba45?w=164&h=164&fit=crop&auto=format",
      alt: "Camera",
    },
    {
      src: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=164&h=164&fit=crop&auto=format",
      alt: "Coffee",
    },
    {
      src: "https://images.unsplash.com/photo-1533827432537-70133748f5c8?w=164&h=164&fit=crop&auto=format",
      alt: "Hats",
    },
  ];
  return (
    <>
      <ImageList sx={{ width: 400 }} cols={3} rowHeight={164}>
        {itemData.map((item, idx) => (
          <ImageListItem key={item.img} onClick={() => setVisible(idx)}>
            <img
              srcSet={`${item.src}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.src}?w=164&h=164&fit=crop&auto=format`}
              alt={item.alt}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <ReactViewer
        visible={Boolean(visible)}
        onClose={() => setVisible(false)}
        images={itemData}
        activeIndex={visible}
      />
    </>
  );
};

const Attendance = () => {
  const [month, setMonth] = useState(new Date().getMonth());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <Box sx={{ width: 300 }}>
      <Grid container>
        <Grid item xs="auto">
          <IconButton
            onClick={() => (month <= 0 ? setMonth(11) : setMonth(month - 1))}
          >
            <ArrowBackIosNew fontSize="small" />
          </IconButton>
        </Grid>
        <Grid
          item
          xs
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography fontWeight={"bold"}>{months[month]}</Typography>
        </Grid>
        <Grid item xs="auto">
          <IconButton
            onClick={() => (month >= 11 ? setMonth(0) : setMonth(month + 1))}
          >
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Box sx={{ height: 8 }} />
      <Box
        bgcolor={"primary.light"}
        sx={{ p: 1, borderRadius: 1 }}
        display={"flex"}
      >
        <Box
          bgcolor={"primary.main"}
          color={"primary.contrastText"}
          sx={{ width: "min-content", p: 1, borderRadius: 1 }}
        >
          <Typography variant="h6" fontWeight={"bold"}>
            03
          </Typography>
          <Typography variant="caption">Wed</Typography>
        </Box>
        <Grid container alignItems={"center"}>
          <Grid item xs textAlign={"center"}>
            <Typography
              variant="caption"
              fontWeight={"bold"}
              color={"text.secondary"}
            >
              Check In
            </Typography>
            <Typography fontWeight={"bold"}>09:26 AM</Typography>
          </Grid>
          <Divider orientation="vertical" flexItem sx={{ my: 1 }} />
          <Grid item xs textAlign={"center"}>
            <Typography
              variant="caption"
              fontWeight={"bold"}
              color={"text.secondary"}
            >
              Check Out
            </Typography>
            <Typography fontWeight={"bold"}>12:09 PM</Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Accordian_ = () => (
  <Accordion elevation={0} sx={{ width: 300 }}>
    <AccordionSummary
      expandIcon={<ExpandMore />}
      aria-controls="panel1a-content"
      id="panel1a-header"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        "& svg": { color: "primary.contrastText" },
        borderRadius: 2,
        mb: 1,
      }}
    >
      <Typography>Accordion 1</Typography>
    </AccordionSummary>
    <AccordionDetails sx={{ bgcolor: "primary.light", borderRadius: 2 }}>
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        malesuada lacus ex, sit amet blandit leo lobortis eget.
      </Typography>
    </AccordionDetails>
  </Accordion>
);

const Drawer_ = () => {
  const menuItems = [
    // { label: "Activity", url: "/activity", icon: <HomeIcon />, helper: "100+" },
    "divider",
    { text: "Academics" },
    {
      label: "Assignments",
      url: "/academics/assignments",
      icon: <Assignment />,
    },
    { label: "Tests", url: "/academics/tests", icon: <ReceiptLong /> },
    { label: "Doubts", url: "/academics/doubts", icon: <Help /> },
    "divider",
    { label: "Schedule", url: "/schedule", icon: <CalendarToday /> },
    { label: "Library", url: "/library", icon: <LibraryMusic /> },
    "divider",
    { text: "Profile" },
  ];

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Help</MenuItem>
        <MenuItem onClick={handleClose}>Report a Problem</MenuItem>
      </Menu>
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{ p: 1, bgcolor: "primary.light", zIndex: "2", borderRadius: 2 }}
        >
          <Card
            elevation={4}
            sx={{
              overflow: "unset",
              color: "primary.main",
            }}
            component={Link}
            href={""}
          >
            <CardHeader
              avatar={
                <Avatar>
                  <UserButton afterSignOutUrl="/" />
                </Avatar>
              }
              sx={{ pb: 0 }}
            />
            <CardHeader
              action={
                <IconButton aria-label="settings" onClick={handleClick}>
                  <MoreVert
                    sx={{
                      color: "primary.main",
                    }}
                  />
                </IconButton>
              }
              title={<Typography fontWeight={600}>Pradyut Das</Typography>}
              subheader={<Typography variant="caption">Student</Typography>}
            />
          </Card>
        </Box>
        <List>
          {menuItems.map((menu, index) => (
            <React.Fragment key={index}>
              {menu?.label && (
                <ListItem
                  disablePadding
                  secondaryAction={<Typography>{menu?.helper}</Typography>}
                >
                  <ListItemButton LinkComponent={Link} href={""}>
                    <ListItemIcon>{menu.icon}</ListItemIcon>
                    <ListItemText primary={menu.label} />
                  </ListItemButton>
                </ListItem>
              )}
              {menu?.text && (
                <ListItem disablePadding sx={{ px: 2 }}>
                  <ListItemText
                    primary={<Typography>{menu.text}</Typography>}
                  />
                </ListItem>
              )}
              {menu == "divider" && <Divider sx={{ my: 1 }} />}
            </React.Fragment>
          ))}
        </List>
        <List>
          <ListItem disablePadding onClick={() => signOut()}>
            <ListItemButton>
              <ListItemIcon>
                <Logout sx={{ color: "danger" }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography sx={{ color: "danger" }}>Logout</Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </>
  );
};

const Modal_ = () => {
  const router = useRouter();
  return (
    <div>
      <Button LinkComponent={Link} href="/photos/a">
        Open modal
      </Button>
    </div>
  );
};

const Alert_ = () => {
  const [alerts, setalerts] = React.useState(["This error occurs when the server cannot understand the request. This can be caused by a number of factors, such as a malformed request, a missing parameter, or an invalid request method."]);
  const smallScreen = useMediaQuery("(max-width:768px)");

  const handleAddAlert = () =>
    setalerts([...alerts, Math.random()]);

  const handleRemoveAlert = (index) =>
    setalerts((prev) => [...prev.filter((_, i) => i !== index)]);

  function renderItem({ item, handleRemoveAlert, index }) {
    return (
      <Alert
        variant="filled"
        sx={{ my: 1 }}
        severity="info"
        onClose={() => handleRemoveAlert(index)}
      >
        {item}
      </Alert>
    );
  }

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleAddAlert} sx={{width: 'max-content'}}>
        Add Alert
      </Button>
      <List
        sx={{
          p: 2,
          pb: 0,
          position: "fixed",
          bottom: "0",
          right: "0",
          width: smallScreen ?"100%": "24rem",
          zIndex: (theme) => theme.zIndex.modal,
        }}
      >
        <TransitionGroup>
          {alerts.map((item, index) => (
            <Collapse key={item}>
              {renderItem({ item, handleRemoveAlert, index })}
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    </React.Fragment>
  );
};
export default function Home() {
  return (
    <Container sx={{ py: 2 }}>
      <Stack spacing={2}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Components
        </Typography>
        <Section title="Navigation Bar" children={<Navbar />} />
        <Section title="Top Bar" children={<TopBar_ />} />
        <Section title="Bottom Bar" children={<BotBar />} />
        <Section title="Drawer" children={<Drawer_ />} />
        <Section title="Alerts" children={<Alert_ />} />
        <Section title="Button" children={<Buttons />} />
        <Section title="CheckBox" children={<Checkboxes />} />
        <Section title="List" children={<Lists />} />
        <Section title="Tabs" children={<Tabs_ />} />
        <Section title="Text Editor" children={<TextEditor />} />
        <Section title="Calender" children={<Calender_ />} />
        <Section title="Attendance" children={<Attendance />} />
        <Section title="Image Viewer" children={<ImageViewer />} />
        <Section title="Accordian" children={<Accordian_ />} />
        <Section title="Modal" children={<Modal_ />} />
      </Stack>
    </Container>
  );
}
