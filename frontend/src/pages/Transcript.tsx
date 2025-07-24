import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";

interface TranscriptProps {
  text: string;
}

const Transcript: React.FC<TranscriptProps> = ({ text }) => {
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
};

export default Transcript;