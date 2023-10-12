import { Paper, Stack, Typography } from "@mui/material";

export default function Section(params) {
  const { title, children } = params;
  return (
    <Stack  sx={{ p:2 }} spacing={1} >
      <Typography variant="h6">{title}</Typography>
        {children}
    </Stack>
  );
}
