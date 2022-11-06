import { Button, Card, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import Engine from "./components/Engine";

function App() {
  const [userAcknowledgedDisclaimer, setUserAcknowledgedDisclaimer] =
    React.useState(false);
  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "1rem",
          gap: "1rem",
        }}
      >
        <Card sx={{ padding: "1rem" }}>
          <Typography variant="h1" textAlign="center">
            APDL Tools
          </Typography>
          <Typography variant="h5" textAlign="center">
            By Zijian Meng (Sci'22 + 1) and Gayan Abayaratna (Sci'22)
          </Typography>
        </Card>
        <Typography variant="h6">
          A SOLID185 tool for auto-generating areas and volume commands from
          line commands.
        </Typography>
        {!userAcknowledgedDisclaimer && (
          <>
            <Typography variant="h6">Disclaimer:</Typography>
            <Typography variant="body1" maxWidth="30rem">
              We do not take responsibility for the outputs of these tools.
              Always check your outputs to make sure they are reasonable. There
              are known issues with perfectly 1 by 1 square voids which are
              ambigious and cannot be resolvbed regardless of algorithim.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setUserAcknowledgedDisclaimer(true);
              }}
            >
              I have read and acknowledge this disclaimer
            </Button>
          </>
        )}

        {userAcknowledgedDisclaimer && <Engine />}
      </Container>
    </>
  );
}

export default App;
