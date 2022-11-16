import { Button, Card, Dialog, TextField, Typography } from "@mui/material";
import React from "react";
import parseInput from "../functions/parseInput";
import solveAL from "../functions/solveAL";
import solveVA from "../functions/solveVA";

function Engine() {
  const [userInputString, setUserInputString] = React.useState("");
  const [commandsAL, setCommandsAL] = React.useState("");
  const [viewingAL, setViewingAL] = React.useState([""]);
  const [modalALOpen, setModalALOpen] = React.useState(false);

  const [commandsVA, setCommandsVA] = React.useState("");
  const [viewingVA, setViewingVA] = React.useState([""]);
  const [modalVAOpen, setModalVAOpen] = React.useState(false);

  const generateCommands = () => {
    const userInput = parseInput(userInputString);

    //Apprise user of duplicates
    if (userInput.duplicates.length !== 0) {
      alert(
        "Duplicates lines found!!! Please correct issue before runing again! \n" +
          userInput.duplicates.map((ele) => "Duplicate: " + ele + "\n")
      );
      return;
    }

    const lines = userInput.lines;

    //Apprise issue of insufficent input
    if (lines.length < 4) {
      alert(
        "Invalid Input!!! Not enough lines to form a quadrilateral! Please try again."
      );
      return;
    }

    //Alert user of parsing results
    alert(
      ` ${lines.length} lines detected! \n Verify that these are the first few lines you specified. \n` +
        lines
          .slice(0, 50)
          .map(
            (ele) =>
              `Line from keypoint ${ele[0]} to keypoint ${ele[1]}. \t L, ${ele[0]}, ${ele[1]}\n`
          )
    );

    //AL Solution and Processing
    const solutionAL = solveAL(lines);
    const areaCommandString = solutionAL.commands.reduce(
      (prev, ele) => prev + `\n${ele}`,
      ""
    );
    setCommandsAL(areaCommandString);
    setViewingAL(solutionAL.commands);
    alert(
      `Generated ${solutionAL.commands.length} areas: \n` + areaCommandString
    );

    //VA Solution and Processing
    const solutionVA = solveVA(lines, solutionAL.areas);
    let volCommandString = solutionVA.commands.reduce(
      (prev, ele) => prev + `\n${ele}`,
      ""
    );
    setCommandsVA(volCommandString);
    setViewingVA(solutionVA.commands);
    alert(`Generated ${solutionVA.vols.length} volumes: \n` + volCommandString);
  };

  const copyALCommands = () => {
    setModalALOpen(true);
    navigator.clipboard.writeText(commandsAL);
  };

  const copyVACommands = () => {
    setModalVAOpen(true);
    navigator.clipboard.writeText(commandsVA);
  };

  return (
    <>
      <Dialog open={modalALOpen}>
        <Card sx={{ height: "80vh", padding: "1rem", overflow: "auto" }}>
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
          variant="contained"
          onClick={() => {
            setModalALOpen(false);
          }}
          sx={{ position: "fixed", top: "2rem", right: "2rem" }}
        >
          <Typography variant="h3">X</Typography>
        </Button>
      </Dialog>

      <Dialog open={modalVAOpen}>
        <Card sx={{ height: "80vh", padding: "1rem", overflow: "auto" }}>
          <Typography variant="h5" textAlign="center">
            VA Commands
          </Typography>

          <Typography variant="h6" textAlign="center" paddingBottom="1rem">
            ✅ Copied to Clipboard ✅{" "}
          </Typography>
          {viewingVA.map((ele) => (
            <Typography>{ele}</Typography>
          ))}
        </Card>
        <Button
          variant="contained"
          onClick={() => {
            setModalVAOpen(false);
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
            onClick={copyALCommands}
            sx={{ maxWidth: "13rem" }}
          >
            <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
              Copy Areas to Clipboard
            </Typography>
          </Button>
          <Button
            variant="contained"
            disabled={commandsVA === ""}
            onClick={copyVACommands}
            sx={{ maxWidth: "13rem" }}
          >
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
