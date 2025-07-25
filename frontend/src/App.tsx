import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Button,
  Box,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";

import UploadFile from "./pages/UploadFile";
import Summary from "./pages/Summary";
import Transcript from "./pages/Transcript";
import Analysis from "./pages/Analysis";

export default function App() {
  const [showComponent, setShowComponent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [transcriptText, setTranscriptText] = React.useState("");

  // const { loading = false } = props;

  const handleButtonClick = () => {
    setShowComponent(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); // close modal
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
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Title
              </Typography>
              <Button color="inherit" onClick={handleButtonClick}>
                Upload File
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container wrap="nowrap" spacing={1}>
          <Transcript text={transcriptText} />
        </Grid>
        <Summary text={transcriptText} />
        <Analysis text={transcriptText} />
      </Stack>
    </>
  );
}
