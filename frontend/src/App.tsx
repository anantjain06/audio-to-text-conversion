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

import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import { PieChart } from "@mui/x-charts/PieChart";

import UploadFile from "./pages/UploadFile";
import Summary from "./pages/Summary";
import Transcript from "./pages/Transcript";

interface MediaProps {
  loading?: boolean;
  icons?: string;
  title?: string;
}

interface LoadingProps {
  loading?: boolean;
}

const containerWidth_1 = "33%";
const containerWidth_2 = "50%";
const containerHeight = "40vh";
const containerWidth_3 = "100%";
const containerHeight_1 = "30vh";

function Media(props: MediaProps) {
  // const { loading = false } = props;
  const { icons = "null" } = props;
  const { title = "null" } = props;

  const isSentiments = title === "Sentiments";
  const isIntents = title === "Intents";
  const isTopics = title === "Topics";

  return (
    <Card sx={{ width: containerWidth_1, m: 2 }}>
      <CardHeader
        avatar={
          <Avatar
            alt="icons"
            src={icons}
            sx={{ width: "40px", height: "40px" }}
          />
        }
        title={title}
      />
      {isSentiments ? (
        <CardContent>
          {[1, 2, 3].map((_, index) => (
            <Grid key={index} container wrap="nowrap" spacing={1}>
              <LinearProgress
                variant="determinate"
                value={20}
                sx={{ width: "40%", margin: "10px" }}
              />
              <Typography sx={{ fontSize: "15px" }}>ABC</Typography>
            </Grid>
          ))}
        </CardContent>
      ) : isIntents ? (
        <CardContent>
          {[1, 2, 3].map((_, index) => (
            <Grid key={index} container wrap="nowrap" spacing={1}>
              <CircularProgress variant="determinate" value={25} />
              <Typography sx={{ fontSize: "15px" }}>ABC</Typography>
            </Grid>
          ))}
        </CardContent>
      ) : isTopics ? (
        <CardContent>
          <Grid container wrap="nowrap" spacing={1}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 33, label: "ABC" },
                    { id: 1, value: 33, label: "ABC" },
                    { id: 2, value: 33, label: "ABC" },
                  ],
                },
              ]}
            />
          </Grid>
        </CardContent>
      ) : (
        <Skeleton
          sx={{ height: containerHeight }}
          animation="wave"
          variant="rectangular"
        />
      )}
    </Card>
  );
}

export default function App(props: LoadingProps) {
  const [showComponent, setShowComponent] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [transcriptText, setTranscriptText] = React.useState("");

  const { loading = false } = props;

  const handleButtonClick = () => {
    setShowComponent(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false); // close modal
  };

  return (
    <>
      {/* <Button onClick={handleButtonClick}>Show Modal</Button> */}
      <UploadFile
        open={open}
        handleClose={handleClose}
        onTranscriptReady={(text) => setTranscriptText(text)}
      />
      {/* <Stack spacing={1}> */}
      {/* For variant="text", adjust the height via font-size */}
      {/* {loading ? 
        (<Skeleton variant="text" sx={{ fontSize: "1rem" }} />) : 
        (
          <TextField id="standard-basic" label="Standard" variant="standard" value="Hello World!"/>
        )} */}

      {/* For other variants, adjust the size with `width` and `height` */}
      {/* <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={210} height={60} />
        <Skeleton variant="rounded" width={210} height={60} /> */}
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
          <Media
            icons="public/assets/icons/sentiment-analysis.png"
            title="Sentiments"
          />
          <Media icons="public/assets/icons/target.png" title="Intents" />
          <Media icons="public/assets/icons/delegation.png" title="Topics" />
        </Grid>
        <Grid container wrap="nowrap" spacing={1}>
          {loading ? (
            <Skeleton
              variant="rectangular"
              width={containerWidth_2}
              height={containerHeight}
            />
          ) : (
            <Summary />
          )}
          <Skeleton
            variant="rectangular"
            width={containerWidth_2}
            height={containerHeight}
          />
        </Grid>
      </Stack>
    </>
  );
}
