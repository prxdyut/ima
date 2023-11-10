import { SignUp } from "@clerk/nextjs";
import { Container } from "@mui/material";

export default function Page() {
  return (
    <Container
      sx={{
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <SignUp />
    </Container>
  );
}
