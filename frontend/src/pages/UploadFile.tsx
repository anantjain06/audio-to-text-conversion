import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";


import { transcript_api } from "../api/apis";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 275,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface UploadFileProps {
  open: boolean;
  handleClose: () => void;
  onTranscriptReady: (transcriptText: string) => void;
  // setLoading: (loading: boolean) => void;
}

export default function UploadFile({
  open,
  handleClose,
  onTranscriptReady,
}: UploadFileProps) {


  const get_file_details = async (file_details: FileList | null) => {
    if (!file_details || file_details.length === 0) return;

    const allowedTypes = ["audio/mpeg", "video/mp4", "audio/wav"];
    const file = file_details[0];

    if (!allowedTypes.includes(file.type)) {
      alert("Only mp3, mp4, or wav files are allowed.");
      return;
    }
    handleClose();
    try {
      onTranscriptReady('loading');
      const response = await transcript_api(file);
      const text =
        response?.data?.transcript || JSON.stringify(response?.data, null, 2);
      console.log("Transcript received:", text);
      onTranscriptReady(text);
    } catch (error) {
      console.error("Error uploading file:", error);
      onTranscriptReady("Error fetching transcript.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload files here
          <VisuallyHiddenInput
            type="file"
            accept=".mp3, .mp4, .wav"
            onChange={(event) => get_file_details(event.target.files)}
            multiple
          />
        </Button>
      </Box>
    </Modal>
  );
}
