import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";

import {
  AppBar,
  Avatar,
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";



import UploadFile from "./pages/UploadFile";
import Summary from "./pages/Summary";
import Transcript from "./pages/Transcript";
import Analysis from "./pages/Analysis";


interface LoadingProps {
  loading?: boolean;
}


export default function App(props: LoadingProps) {
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
      {/* </Stack> */}
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
                Show Modal
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Grid container wrap="nowrap" spacing={1}>
          {/* <Skeleton
            variant="rectangular"
            width={containerWidth_3}
            height={containerHeight_1}
          /> */}
          <Transcript text={transcriptText} />
        </Grid>
        <Grid container wrap="nowrap" spacing={1}>
          <Analysis
            icons="public/assets/icons/sentiment-analysis.png"
            title="Sentiments"
          />
          <Analysis icons="public/assets/icons/target.png" title="Intents" />
          <Analysis icons="public/assets/icons/delegation.png" title="Topics" />
        </Grid>
        <Summary />;
      </Stack>
    </>
  );
}
