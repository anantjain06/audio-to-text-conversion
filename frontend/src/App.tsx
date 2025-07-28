import * as React from "react";

import {
  AppBar,
  Button,
  Box,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import UploadFile from "./pages/UploadFile";
import Summary from "./pages/Summary";
import Transcript from "./pages/Transcript";
import Analysis from "./pages/Analysis";
import { APP_LABELS } from "./core/constants/Labels";


export default function App() {
  const [showComponent, setShowComponent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [transcriptText, setTranscriptText] = React.useState("");

  const handleButtonClick = () => {
    setShowComponent(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); 
  };

  return (
    <>
      <UploadFile
        open={open}
        handleClose={handleClose}
        onTranscriptReady={(text) => setTranscriptText(text)}
      />
      <Stack spacing={1}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar   color="inherit"position="fixed">
            <Toolbar>
              <Box
                component="img"
                sx={{ height: 40, mr: 2 }}
                alt="App Logo"
                src="./transcript.png" 
              />
              <Typography variant="h6"  sx={{ flexGrow: 1 }}>
                {APP_LABELS.APP_TITLE}
              </Typography>
              <Button size="large" variant="contained" color="success" onClick={handleButtonClick}>
               {APP_LABELS.BUTTONS.UPLOAD}
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Toolbar />
        <Grid container wrap="nowrap" spacing={1}>
          <Transcript text={transcriptText} />
        </Grid>
        <Summary text={transcriptText} />
        <Analysis text={transcriptText} />
      </Stack>
    </>
  );
}
