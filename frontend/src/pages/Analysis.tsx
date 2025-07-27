// Analysis.tsx
import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";

// import SendIcon from "@mui/icons-material/Send";
import { PieChart } from "@mui/x-charts/PieChart";

import { analysis_api } from "../api/apis";
import { APP_LABELS } from "../core/constants/Labels";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import TopicIcon from '@mui/icons-material/Topic';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

const containerWidth_1 = "33%";

const cardConfigs = [
  {
    title: APP_LABELS.STEP4_SUBTITLE1,
    icon: APP_LABELS.STEP4_SUBTITLE1_ICON,
  },
  {
    title: APP_LABELS.STEP4_SUBTITLE2,
    icon: APP_LABELS.STEP4_SUBTITLE2_ICON,
  },
  {
    title: APP_LABELS.STEP4_SUBTITLE3,
    icon: APP_LABELS.STEP4_SUBTITLE3_ICON,
  },
];

interface TranscriptProps {
  text: string;
}

export default function Analysis({ text }: TranscriptProps) {
  const [hasFetched, setHasFetched] = useState(false);

  const [sentiments, setSentiments] = useState<any[]>([]);
  const [intents, setIntents] = useState<any[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  const getAnalysis = async () => {
    try {
      if (!text) return;
      const response = await analysis_api(text);
      setHasFetched(true);

      setSentiments(response?.sentiment_result || []);
      setIntents(response?.intent_result || []);
      setTopics(response?.topic_result || []);
    } catch (err) {
      setHasFetched(true);
      console.error("Analysis error", err);
    }
  };

  const getIconByTitle = (title:string) => {
    switch (title) {
      case 'Intents':
        return <GpsFixedIcon />;
      case 'Sentiments':
        return <SentimentSatisfiedAltIcon />;
      case 'Topics':
        return <TopicIcon />;
      default:
        return <TopicIcon />;
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
        const { title } = config;
        const isSentiments = title === APP_LABELS.STEP4_SUBTITLE1;
        const isIntents = title === APP_LABELS.STEP4_SUBTITLE2;
        const isTopics = title === APP_LABELS.STEP4_SUBTITLE3;

        return (
          <Card key={title} sx={{ width: containerWidth_1, m: 2 }}>
            <CardHeader
              avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {getIconByTitle(title)}
                  </Avatar>
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

              {!hasFetched ? (
                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  No analysis yet.
                </Typography>
              ) : null}
            </CardContent>
          </Card>
        );
      })}
    </Grid>
  );
}
