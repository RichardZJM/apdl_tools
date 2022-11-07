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
            By ②③⑧ and Gayan Abayaratna (Sci'22)
          </Typography>
        </Card>
        <Typography variant="h6" textAlign="center">
          A SOLID185 tool for generating area and volume commands from line
          commands in bottom-up meshing.
        </Typography>
        {!userAcknowledgedDisclaimer && (
          <>
            <Typography variant="h6">Disclaimer:</Typography>
            <Typography variant="body1" maxWidth="30rem">
              We do not assume responsibility for the outputs of these tools.
              While these tools can be used exclusively, they should be used as
              validation and sanity checks. Always verify your ANSYS scripts to
              make sure they are reasonable. There is an known issue with
              perfectly hexahedral voids which are ambigious with elements. This
              cannot be resolved with any algorithim and must be user corrected.
            </Typography>

            <Typography variant="h6">
              PROCEED WITH CAUTION AT YOUR OWN RISK
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setUserAcknowledgedDisclaimer(true);
              }}
            >
              I have read and acknowledge this disclaimer
            </Button>
            <Typography marginTop="2rem">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
              >
                Tutorial Here (not that you'd need it, the tool is dead simple
                to use)
              </a>
            </Typography>
          </>
        )}

        {userAcknowledgedDisclaimer && <Engine />}
      </Container>
    </>
  );
}

export default App;
