// import React, { useEffect } from "react";
// import {
//   AppBar,
//   Avatar,
//   Button,
//   Box,
//   Card,
//   CardHeader,
//   CardContent,
//   Grid,
//   IconButton,
//   Skeleton,
//   Stack,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";

// import LinearProgress from "@mui/material/LinearProgress";
// import CircularProgress from "@mui/material/CircularProgress";
// import { PieChart } from "@mui/x-charts/PieChart";
// import { analysis_api } from "../api/apis";

// interface MediaProps {
//   loading?: boolean;
//   icons?: string;
//   title?: string;
// }

// const containerWidth_1 = "33%";
// const containerWidth_2 = "50%";
// const containerHeight = "40vh";
// const containerWidth_3 = "100%";
// const containerHeight_1 = "30vh";

// export default function Analysis(props: MediaProps) {

//   const getAnalysis = async (data?: string) => {
//       try {
//         const text = localStorage.getItem("transcript");
//         if (!text) return;
//         // const transcript = localStorage.getItem("transcript");
//         const response = await analysis_api(text);
//         console.log('response>>', response);
//         // setSummary(response?.summary || "No summary returned.");
//         // setMom(response?.points || "No MoM returned.");
//       } catch (err) {
//         console.error("Summary error", err);
//       }
//     };

//    const { icons = "null" } = props;
//   const { title = "null" } = props;

//   const isSentiments = title === "Sentiments";
//   const isIntents = title === "Intents";
//   const isTopics = title === "Topics";

//   return (
//     <Card sx={{ width: containerWidth_1, m: 2 }}>
//       <IconButton onClick={getAnalysis} aria-label="send">
//                 <SendIcon />
//               </IconButton>
//       <CardHeader
//         avatar={
//           <Avatar
//             alt="icons"
//             src={icons}
//             sx={{ width: "40px", height: "40px" }}
//           />
//         }
//         title={title}
//       />
//       {isSentiments ? (
//         <CardContent>
//           {[1, 2, 3].map((_, index) => (
//             <Grid key={index} container wrap="nowrap" spacing={1}>
//               <LinearProgress
//                 variant="determinate"
//                 value={20}
//                 sx={{ width: "40%", margin: "10px" }}
//               />
//               <Typography sx={{ fontSize: "15px" }}>ABC</Typography>
//             </Grid>
//           ))}
//         </CardContent>
//       ) : isIntents ? (
//         <CardContent>
//           {[1, 2, 3].map((_, index) => (
//             <Grid key={index} container wrap="nowrap" spacing={1}>
//               <CircularProgress variant="determinate" value={25} />
//               <Typography sx={{ fontSize: "15px" }}>ABC</Typography>
//             </Grid>
//           ))}
//         </CardContent>
//       ) : isTopics ? (
//         <CardContent>
//           <Grid container wrap="nowrap" spacing={1}>
//             <PieChart
//               series={[
//                 {
//                   data: [
//                     { id: 0, value: 33, label: "ABC" },
//                     { id: 1, value: 33, label: "ABC" },
//                     { id: 2, value: 33, label: "ABC" },
//                   ],
//                 },
//               ]}
//             />
//           </Grid>
//         </CardContent>
//       ) : (
//         <Skeleton
//           sx={{ height: containerHeight }}
//           animation="wave"
//           variant="rectangular"
//         />
//       )}
//     </Card>
//   );
// }

import React, { useEffect, useState } from "react";
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
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { PieChart } from "@mui/x-charts/PieChart";
import { analysis_api } from "../api/apis";

interface MediaProps {
  loading?: boolean;
  icons?: string;
  title?: string;
}

const containerWidth_1 = "33%";
const containerHeight = "40vh";

export default function Analysis(props: MediaProps) {
  const { icons = "", title = "" } = props;

  const isSentiments = title === "Sentiments";
  const isIntents = title === "Intents";
  const isTopics = title === "Topics";

  const [sentiments, setSentiments] = useState<any[]>([]);
  const [intents, setIntents] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  const getAnalysis = async () => {
    try {
      const text = localStorage.getItem("transcript");
      if (!text) return;
      const response = await analysis_api(text);
      console.log("response>>", response);

      setSentiments(response?.sentiment_result || []);
      setIntents(response?.intent_result || []);
      setTopics(response?.topic_result || []);
    } catch (err) {
      console.error("Summary error", err);
    }
  };

  return (
    <Card sx={{ width: containerWidth_1, m: 2 }}>
      <IconButton onClick={getAnalysis} aria-label="send">
        <SendIcon />
      </IconButton>

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

      <CardContent>
        {isSentiments &&
          sentiments.length > 0 &&
          sentiments.map((item, index) => (
            <Grid key={index} container alignItems="center" spacing={1}>
              <Grid sx={{ width: "50%" }}>
                <LinearProgress
                  variant="determinate"
                  value={item.score * 100}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Grid>
              <Grid>
                <Typography sx={{ fontSize: "14px" }}>
                  {item.label} ({(item.score * 100).toFixed(1)}%)
                </Typography>
              </Grid>
            </Grid>
          ))}

        {isIntents &&
          intents.length > 0 &&
          intents.map((item, index) => (
            <Grid key={index} container alignItems="center" spacing={2}>
              <Grid>
                <CircularProgress
                  variant="determinate"
                  value={item.score * 100}
                  size={30}
                />
              </Grid>
              <Grid>
                <Typography sx={{ fontSize: "14px" }}>
                  {item.label} ({(item.score * 100).toFixed(1)}%)
                </Typography>
              </Grid>
            </Grid>
          ))}

        {isTopics && topics.length > 0 && (
          <PieChart
            series={[
              {
                data: topics.map((item, index) => ({
                  id: index,
                  value: item.score * 100,
                  label: item.label,
                })),
              },
            ]}
            width={250}
            height={200}
          />
        )}

        {!sentiments.length && !intents.length && !topics.length && (
          <Skeleton
            sx={{ height: containerHeight }}
            animation="wave"
            variant="rectangular"
          />
        )}
      </CardContent>
    </Card>
  );
}
