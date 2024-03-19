import { CloseRounded } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ModalOwnProps,
  Modal as MuiModal,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";

interface ModalProps {
  open?: boolean;
  onClose?: () => void;
  title: string | any;
  sx?: SxProps<Theme>;
  maxWidth?: string | number;
}

export function Modal(
  props: React.PropsWithChildren<
    Omit<ModalOwnProps, "children" | "onClose" | "open" | "sx"> & ModalProps
  >
) {
  return (
    <MuiModal
      {...props}
      open={props.open || false}
      onClose={props.onClose}
      sx={{
        color: "#151515",
        maxHeight: "100vh",
        overflowY: "auto",
        bgcolor:'rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        p="40px"
        sx={{
          maxWidth: props.maxWidth || '960px',
          position: "relative",
          left: "50%",
          transform: "translate(-50%, 0)",
          bgcolor: "background.paper",
          outline: "none",
          margin: "80px 0",
          borderRadius: 3,
          minHeight: "200px",
          ...(props.sx || {}),
        }}
      >
        <IconButton onClick={props.onClose} sx={{ position: "absolute", right: "12px", top: "12px" }}>
          <CloseRounded />
        </IconButton>
        <Typography variant="h6" mb={"32px"} fontWeight={600}>
          {props.title}
        </Typography>
        {props.children}
      </Box>
    </MuiModal>
  );
}
