import * as React from "react";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from '@mui/material/Avatar';

// import Button from "@mui/material/Button";

// import UploadFile from "./pages/UploadFile";

interface MediaProps {
  loading?: boolean;
  icons?: string;
  title?: string;
}

const containerWidth_1 = "33%";
const containerWidth_2 = "50%";
const containerHeight = "50vh";
const containerWidth_3 = "100%";
// const containerHeight_1 = "20vh";


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
            sx={{width: "40px", height: "40px"}}
          />
        }
        title={title} 
      />
      <Skeleton sx={{ height: containerHeight }} animation="wave" variant="rectangular" />
    </Card>
  );
}

export default function App() {
  // const [showComponent, setShowComponent] = React.useState(false);

  // const handleButtonClick = () => {
  //   setShowComponent(true); // Set state to true on button click
  // };
  // const [open, setOpen] = React.useState(false); // control modal directly

  // const handleButtonClick = () => {
  //   setOpen(true); // open modal
  // };

  // const handleClose = () => {
  //   setOpen(false); // close modal
  // };

  return (
    <>
      {/* <Button onClick={handleButtonClick}>Show Modal</Button>
    <UploadFile open={open} handleClose={handleClose} /> */}
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
        <Grid container wrap="nowrap" spacing={1}>
          <Skeleton
            variant="rectangular"
            width={containerWidth_3}
            height={containerHeight}
          />
        </Grid>
        <Grid container wrap="nowrap" spacing={1}>
          <Media icons="public/assets/icons/sentiment-analysis.png" title="Sentiments" />
          <Media icons="public/assets/icons/target.png" title="Intents"/>
          <Media icons="public/assets/icons/delegation.png" title="Topics"/>
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
