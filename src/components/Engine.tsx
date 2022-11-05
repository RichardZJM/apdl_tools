import { Button, Card, TextField, Typography } from "@mui/material";
import React from "react";
import parseInput from "../functions/parseInput";

function Engine() {
  const [userInputString, setUserInputString] = React.useState("");

  const generateCommands = () => {
    const parsedInput = parseInput(userInputString);
    if (!parseInput) {
      alert("Invalid Input!!! Please try again.");
      return;
    }
    alert(
      "Verify that these are the first 50 lines you specified. \n" +
        parsedInput.lines
          .slice(0, 50)
          .map(
            (ele) =>
              `Line from keypoint ${ele[0]} to keypoint ${ele[1]}. \t L, ${ele[0]}, ${ele[1]}\n`
          )
    );
  };

  return (
    <Card
      sx={{
        padding: "1rem",
        width: "70vw",
        maxWidth: "100%",
        display: "flex",
        maxHeight: "300rem",
      }}
    >
      <TextField
        multiline
        minRows={6}
        placeholder={`Your APDL Script
One Command Per Line`}
        sx={{ width: "100%" }}
        onChange={(event) => {
          setUserInputString(event?.target.value);
        }}
      />

      <Card
        sx={{
          maxWidth: "20vw",
          width: "6.9rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
          padding: "0.5rem",
          height: "fit-content",
          position: "fixed",
          right: "2rem",
        }}
      >
        <Button
          variant="contained"
          onClick={generateCommands}
          sx={{ maxWidth: "13rem" }}
        >
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            Generate Commands
          </Typography>
        </Button>
        <Button variant="contained" disabled sx={{ maxWidth: "13rem" }}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            Copy Areas to Clipboard
          </Typography>
        </Button>
        <Button variant="contained" disabled sx={{ maxWidth: "13rem" }}>
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            Copy Volumes to Clipboard
          </Typography>
        </Button>
      </Card>
    </Card>
  );
}

export default Engine;
