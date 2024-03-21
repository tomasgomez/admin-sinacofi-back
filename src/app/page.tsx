import { Build } from "@mui/icons-material";
import { Container } from "@mui/material";

export default function Home() {
  return (
    <Container sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff",
      color: "#0081A3",
    }}>
      <Build />
      <h1>Work in progress</h1>
    </Container>
  );
};
