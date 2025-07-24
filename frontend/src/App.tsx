import * as React from "react";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import UploadFile from "./pages/UploadFile";

interface MediaProps {
  loading?: boolean;
  icons?: string;
  title?: string;
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
      {title === "Sentiments" ? (
        <CardContent>
          <Grid container wrap="nowrap" spacing={1}>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{ width: "40%", margin: "10px"}}
          />
          <Typography sx={{fontSize: "15px"}}>ABC</Typography>
          </Grid>
          <Grid container wrap="nowrap" spacing={1}>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{ width: "40%", margin: "10px"}}
          />
          <Typography sx={{fontSize: "15px"}}>ABC</Typography>
          </Grid>
          <Grid container wrap="nowrap" spacing={1}>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{ width: "40%", margin: "10px"}}
          />
          <Typography sx={{fontSize: "15px"}}>ABC</Typography>
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

export default function App() {
  const [showComponent, setShowComponent] = React.useState(false);
  const [open, setOpen] = React.useState(false); // control modal directly

  const handleButtonClick = () => {
    setShowComponent(true); // Set state to true on button click
  };

  const handleClose = () => {
    setOpen(false); // close modal
  };

  return (
    <>
      {/* <Button onClick={handleButtonClick}>Show Modal</Button> */}
      <UploadFile open={open} handleClose={handleClose} />
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
          <Skeleton
            variant="rectangular"
            width={containerWidth_3}
            height={containerHeight_1}
          />
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
          <Skeleton
            variant="rectangular"
            width={containerWidth_2}
            height={containerHeight}
          />
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
