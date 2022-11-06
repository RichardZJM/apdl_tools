import {
  Button,
  Card,
  Dialog,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import parseInput from "../functions/parseInput";
import solveAL from "../functions/solveAL";

function Engine() {
  const [userInputString, setUserInputString] = React.useState("");
  const [commandsAL, setCommandsAL] = React.useState("");
  const [viewingAL, setViewingAL] = React.useState([""]);

  const [modalALOpen, setModalALOpen] = React.useState(false);

  const generateCommands = () => {
    const lines = parseInput(userInputString);
    if (!lines) {
      alert("Invalid Input!!! Please try again.");
      return;
    }
    alert(
      "Verify that these are the first few lines you specified. \n" +
        lines
          .slice(0, 50)
          .map(
            (ele) =>
              `Line from keypoint ${ele[0]} to keypoint ${ele[1]}. \t L, ${ele[0]}, ${ele[1]}\n`
          )
    );
    const solutionAL = solveAL(lines);
    console.log(solutionAL.commands);
    const areaCommandString = solutionAL.commands.reduce(
      (prev, ele) => prev + `\n ${ele}`,
      ""
    );
    setCommandsAL(areaCommandString);
    setViewingAL(solutionAL.commands);
    alert(
      `Generated ${solutionAL.commands.length} areas: \n` + areaCommandString
    );
    console.log(areaCommandString);
  };

  const copyALCommands = () => {
    setModalALOpen(true);
    navigator.clipboard.writeText(commandsAL);
  };

  return (
    <>
      <Dialog open={modalALOpen}>
        <Card sx={{ height: "80vh", padding: "1rem", overflow: "scroll" }}>
          <Typography variant="h5" textAlign="center">
            AL Commands
          </Typography>

          <Typography variant="h6" textAlign="center" paddingBottom="1rem">
            ✅ Copied to Clipboard ✅{" "}
          </Typography>
          {viewingAL.map((ele) => (
            <Typography>{ele}</Typography>
          ))}
        </Card>
        <Button
          variant="outlined"
          onClick={() => {
            setModalALOpen(false);
          }}
          sx={{ position: "fixed", top: "2rem", right: "2rem" }}
        >
          <Typography variant="h3">X</Typography>
        </Button>
      </Dialog>
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
          maxRows={50}
          placeholder={`Your APDL Script
One Command Per Line`}
          sx={{ width: "100%", fontSize: "0.3rem" }}
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
          <Button
            variant="contained"
            disabled={commandsAL === ""}
            sx={{ maxWidth: "13rem" }}
            onClick={copyALCommands}
          >
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
    </>
  );
}

export default Engine;
