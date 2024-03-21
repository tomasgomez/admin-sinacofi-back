import { Box, Typography } from "@mui/material";

interface ModalFooterProps {
  placeContent?: "end" | "start" | "center";
}

export function ModalFooter(props: React.PropsWithChildren<ModalFooterProps>) {
  return (
    <Box
      mt={6}
      sx={{
        display: "flex",
        gap: 2,
        px: 8,
        pb: 8,
        placeContent: props.placeContent || "end",
      }}
    >
      {props.children}
    </Box>
  );
}
