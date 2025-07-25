// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardContent from "@mui/material/CardContent";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import { Button, Stack } from "@mui/material";
// import FileCopyIcon from "@mui/icons-material/FileCopy";
// import DownloadIcon from "@mui/icons-material/Download";
// import SendIcon from "@mui/icons-material/Send";
// import { useState } from "react";

// import { summary_api } from "../api/apis";

// interface SummaryProps {
//   onSummaryReady: (summary: string, mom: string) => void;
// }

// export default function Summary({ onSummaryReady }: SummaryProps) {
//   const transcript = localStorage.getItem("transcript");
//   const [summary, setSummary] = useState<string>("");
//   const [mom, setMom] = useState<string>("");
//   const get_summary = async () => {
//     if (!transcript) {
//       alert("No transcript found.");
//       return;
//     }

//     try {
//       const response = await summary_api(transcript);
//       const summaryText = response?.summary;
//       const momText = response?.points;

//       if (summaryText || momText) {
//         setSummary(summaryText || "");
//         setMom(momText || "");
//         onSummaryReady(summaryText || "", momText || "");
//       } else {
//         alert("Summary generation failed.");
//       }
//     } catch (err) {
//       console.error("Summary API error:", err);
//       alert("Error getting summary.");
//     }
//     // finally {
//     // setLoading(false);
//     // }
//   };

//   const handleCopy = () => {
//     if (summary) {
//       navigator.clipboard.writeText(summary);
//     }
//   };

//   const handleDownload = () => {
//     if (summary) {
//       const blob = new Blob([summary], { type: "text/plain" });
//       const link = document.createElement("a");
//       link.href = URL.createObjectURL(blob);
//       link.download = "summary.txt";
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     }
//   };

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <CardHeader
//         action={
//           <Stack direction="row" spacing={1}>
//             <IconButton onClick={get_summary} aria-label="send">
//               <SendIcon />
//             </IconButton>
//             <IconButton onClick={handleCopy} aria-label="copy">
//               <FileCopyIcon />
//             </IconButton>
//             <IconButton onClick={handleDownload} aria-label="download">
//               <DownloadIcon />
//             </IconButton>
//           </Stack>
//         }
//         title="Summary"
//       />
//       <CardContent>
//         <Typography
//           variant="body2"
//           sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}
//         >
//           {summary || "No summary loaded yet."}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// }
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import { summary_api } from "../api/apis";
// import { summary_api } from "../api/summary";
// import { transcript_api } from "../api/transcript";

export default function Summary() {
  const [transcript, setTranscript] = useState("");
  const [summary, setSummary] = useState("");
  const [mom, setMom] = useState("");

  useEffect(() => {
    // getTranscript();
  }, []);

  const getSummary = async (data?: string) => {
    try {
      const text = localStorage.getItem("transcript");
      if (!text) return;
      // const transcript = localStorage.getItem("transcript");
      const response = await summary_api(text);
      setSummary(response?.summary || "No summary returned.");
      setMom(response?.points || "No MoM returned.");
    } catch (err) {
      console.error("Summary error", err);
    }
  };

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

  const renderCard = (
    title: string,
    content: string,
    filename: string,
    get_summary?: () => void
  ) => (
    <Card sx={{ maxWidth: 345, flex: 1 }}>
      <CardHeader
        title={title}
        action={
          <Stack direction="row" spacing={1}>
            {get_summary && (
              <IconButton onClick={get_summary} aria-label="send">
                <SendIcon />
              </IconButton>
            )}
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
      <CardContent>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary", whiteSpace: "pre-wrap" }}
        >
          {content || `No ${title.toLowerCase()} loaded yet.`}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {renderCard("Summary", summary, "summary.txt", getSummary)}
      {renderCard("Minutes of Meeting", mom, "mom.txt")}
    </div>
  );
}

