import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DownloadIcon from "@mui/icons-material/Download";
import SendIcon from "@mui/icons-material/Send";

import { summary_api } from "../api/apis";

export default function Summary() {
  const transcript =
    " Hi, how are you? Hey, how's it going? What are you up to? Yo, what's up? Hey, how have you been? How's your day been? Hey, what's new? Hey, what's new? I'm great. I'm doing pretty well, and you? Things are great. I couldn't be better. I can't complain. I've been busy. Same as always. Not bad, and you? Things could be better. I've been better. I feel a little under the weather. I'm busy with work. Goodbye. It was nice talking to you. Bye. See you. Take care. Take it easy. Talk to you later. Have a good one. Hope you feel better soon.";

  const get_summary = async() => {
    const response = await summary_api(transcript);
    return response
  };

  const handleCopy = () => {
    const text =
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.";
    navigator.clipboard.writeText(text);
  };

  const handleDownload = () => {
    const text =
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.";
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card sx={{width: "50%", height: "40vh", m: 2}} >
      <CardHeader
        action={
          <Stack direction="row" spacing={1}>
            <IconButton onClick={get_summary} aria-label="send">
                <SendIcon />
              </IconButton>
            <IconButton onClick={handleCopy} aria-label="copy">
              <FileCopyIcon />
            </IconButton>
            <IconButton onClick={handleDownload} aria-label="download">
              <DownloadIcon />
            </IconButton>
          </Stack>
        }
        title="Summary"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
    </Card>
  );
}
