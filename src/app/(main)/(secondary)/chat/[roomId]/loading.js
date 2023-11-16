import { Box, CircularProgress } from "@mui/material";

export default function Loading(params) {
  return (
    <Box
      sx={{
        height: "60vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
