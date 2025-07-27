import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
// import SendIcon from "@mui/icons-material/Send";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import SummarizeIcon from '@mui/icons-material/Summarize';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';


import { summary_api } from "../api/apis";
import { APP_LABELS } from "../core/constants/Labels";

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
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
           {title === 'Summary' ? <SummarizeIcon /> : <MeetingRoomIcon/>}
          </Avatar>
        }
        action={
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => handleCopy(content)} aria-label="copy"  sx={{ bgcolor: 'success.main', color:'success.contrastText' }}>
              <FileCopyIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDownload(content, filename)}
              aria-label="download"
              sx={{ bgcolor: 'success.main', color:'success.contrastText' }}
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
          <span
            style={{
              margin: 0,
              fontFamily: "inherit",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              overflowWrap: "anywhere",
            }}
          >
            {content || `No ${title.toLowerCase()} loaded yet.`}
          </span>
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      {renderCard(APP_LABELS.STEP2_TITLE, summary, "summary.txt")}
      {renderCard(APP_LABELS.STEP3_TITLE, mom, "mom.txt")}
    </div>
  );
}
