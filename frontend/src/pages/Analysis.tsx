// Analysis.tsx
import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Skeleton,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

// import SendIcon from "@mui/icons-material/Send";
import { PieChart } from "@mui/x-charts/PieChart";

import { analysis_api } from "../api/apis";

const containerWidth_1 = "33%";
const containerHeight = "40vh";

const cardConfigs = [
  {
    title: "Sentiments",
    icon: "assets/icons/sentiment-analysis.png",
  },
  {
    title: "Intents",
    icon: "assets/icons/target.png",
  },
  {
    title: "Topics",
    icon: "assets/icons/delegation.png",
  },
];

interface TranscriptProps {
  text: string;
}

export default function Analysis({ text }: TranscriptProps) {
  const [sentiments, setSentiments] = useState<any[]>([]);
  const [intents, setIntents] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  const getAnalysis = async () => {
    try {
      if (!text) return;
      const response = await analysis_api(text);
      console.log("response>>", response);

      setSentiments(response?.sentiment_result || []);
      setIntents(response?.intent_result || []);
      setTopics(response?.topic_result || []);
    } catch (err) {
      console.error("Analysis error", err);
    }
  };

  useEffect(() => {
    if (text.length > 0) {
      getAnalysis();
    }
  }, [text]);

  return (
    <Grid container wrap="nowrap" spacing={1}>
      {cardConfigs.map((config) => {
        const { title, icon } = config;
        const isSentiments = title === "Sentiments";
        const isIntents = title === "Intents";
        const isTopics = title === "Topics";

        return (
          <Card key={title} sx={{ width: containerWidth_1, m: 2 }}>
            <CardHeader
              avatar={
                <Avatar
                  alt="icons"
                  src={icon}
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
      })}
    </Grid>
  );
}
