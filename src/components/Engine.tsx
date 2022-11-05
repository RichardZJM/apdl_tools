import { Button, Card, TextField, Typography } from "@mui/material";
import React from "react";
import parseInput from "../functions/parseInput";

function Engine() {
  parseInput("Hello");
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
        <Button variant="contained" sx={{ maxWidth: "13rem" }}>
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
