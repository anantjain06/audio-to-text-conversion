import { Card, CardHeader, CardContent, Typography } from "@mui/material";
interface TranscriptProps {
  text: string;
}

export default function Transcript({ text }: TranscriptProps) {
  return (
    <Card sx={{ width: "100%", m: 2 }}>
      <CardHeader title="Conversation" />
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            whiteSpace: "pre-wrap", // keeps newlines, allows wrapping
            wordBreak: "break-word", // breaks long words
            overflowWrap: "anywhere", // wraps even without spaces
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: "inherit",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            {text || "Upload a file to see transcript."}
          </pre>
        </Typography>
      </CardContent>
    </Card>
  );
}
