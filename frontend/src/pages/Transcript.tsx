import { Card, CardHeader, CardContent, Typography, Avatar } from "@mui/material";
import { APP_LABELS } from "../core/constants/Labels";
import Skeleton from '@mui/material/Skeleton';
import TranscribeIcon from '@mui/icons-material/Transcribe';
import React from "react";

interface TranscriptProps {
  text: string;
}

export default function Transcript({ text }: TranscriptProps) {
  return (
    <Card sx={{ width: "100%", m: 2 }}>
      <CardHeader title={APP_LABELS.STEP1_TITLE}
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            <TranscribeIcon />
          </Avatar>
        } />
      <CardContent>
        {text === 'loading' ? (
          <React.Fragment>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="60%" />
        </React.Fragment>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              whiteSpace: "pre-wrap", 
              wordBreak: "break-word", 
              overflowWrap: "anywhere", 
            }}
          >
            <span
              style={{
                margin: 0,
                fontFamily: "inherit",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                overflowWrap: "anywhere",
              }}
            >
              {text || "Upload a file to see transcript."}
            </span>
          </Typography>
        )}

      </CardContent>
    </Card>
  );
}
