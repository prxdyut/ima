import { createTheme } from "@mui/material";
import { blueGrey, cyan, pink, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[700],
      light: teal[100],
    },
  },
});

export default theme;
