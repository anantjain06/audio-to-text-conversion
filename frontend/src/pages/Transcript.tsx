import { Card, CardHeader, CardContent } from "@mui/material";
interface TranscriptProps {
  text: string;
}

export default function Transcript({ text }: TranscriptProps) {
  return (
    <Card sx={{ width: "100%", m: 2 }}>
      <CardHeader title="Conversation" />
      <CardContent>
        <pre style={{ whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
          {text || "Upload a file to see transcript."}
        </pre>
      </CardContent>
    </Card>
  );
}
