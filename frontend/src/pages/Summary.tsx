import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";

import { summary_api } from "../api/apis";

interface TranscriptProps {
  text: string;
}

export default function Summary({ text }: TranscriptProps) {
  const [summary, setSummary] = useState("");
  const [mom, setMom] = useState("");

  const getSummary = async () => {
    try {
      if (!text) return;
      const response = await summary_api(text);
      setSummary(response?.summary || "No summary returned.");
      setMom(response?.points || "No MoM returned.");
    } catch (err) {
      console.error("Summary error", err);
    }
  };

  useEffect(() => {
    if (text.length > 0) {
      getSummary();
    }
  }, [text]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleDownload = (text: string, filename: string) => {
    const blob = new Blob([text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderCard = (title: string, content: string, filename: string) => (
    <Card sx={{ width: "50%", height: "40vh", m: 2 }}>
      <CardHeader
        title={title}
        action={
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => handleCopy(content)} aria-label="copy">
              <FileCopyIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDownload(content, filename)}
              aria-label="download"
            >
              <DownloadIcon />
            </IconButton>
          </Stack>
        }
      />
      <CardContent sx={{ maxHeight: "200px", overflowY: "auto" }}>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            whiteSpace: "pre-wrap", 
            wordBreak: "break-word", 
            overflowWrap: "anywhere", 
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
            {content || `No ${title.toLowerCase()} loaded yet.`}
          </pre>
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {renderCard("Summary", summary, "summary.txt")}
      {renderCard("Minutes of Meeting", mom, "mom.txt")}
    </div>
  );
}
