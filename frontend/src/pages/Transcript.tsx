import { Card, CardHeader, CardContent, Typography, Avatar } from "@mui/material";
import { APP_LABELS } from "../core/constants/Labels";
import Skeleton from '@mui/material/Skeleton';
import TranscribeIcon from '@mui/icons-material/Transcribe';

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
          <Skeleton animation="wave" variant="rectangular" width={300} height={100} />
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              whiteSpace: "pre-wrap", // keeps newlines, allows wrapping
              wordBreak: "break-word", // breaks long words
              overflowWrap: "anywhere", // wraps even without spaces
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
