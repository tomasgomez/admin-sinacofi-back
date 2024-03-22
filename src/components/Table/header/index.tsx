"use client";
import * as React from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  StyledInboxHeaderContent,
  StyledTitleAndDropdown,
  StyledSubtitleAndIcons,
  StyledIconsContent,
} from "./style";
import {
  Autocomplete,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Dropdrown from "@/components/Dropdown";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { montserrat } from "@/utils/fonts";
import SearchField from "../SearchField";

const AddElement = ({
  label,
  handleAddLabelButton,
}: {
  label: string;
  handleAddLabelButton?: any;
}) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      startIcon={<AddIcon fontSize="small" />}
      style={{
        backgroundColor: "#00B2E2",
        color: "#FFFFFF",
        fontFamily: montserrat.style.fontFamily,
        textTransform: "none",
      }}
      onClick={handleAddLabelButton}
    >
      {label}
    </Button>
  );
};

export default function Header(props: {
  title: string;
  label?: string;
  amountMessages?: number;
  filters?: any;
  withIcons?: boolean;
  withSearchBar?: boolean;
  addLabelButton?: string;
  handleAddLabelButton?: any;
}) {
  const {
    amountMessages,
    title,
    label,
    filters,
    withIcons,
    withSearchBar,
    addLabelButton,
    handleAddLabelButton,
  } = props;
  return (
    <StyledInboxHeaderContent>
      <StyledTitleAndDropdown
        sx={{
          m: 2,
        }}
        width="100%"
      >
        <Typography variant="h5" fontFamily={montserrat.style.fontFamily}>
          {title}
        </Typography>
        <div style={{ display: "flex", gap: "12px" }}>
          {withSearchBar && <SearchField data={[]} label={label} />}
          {filters &&
            filters.map((filter: any) => (
              <Dropdrown
                key={`dropdown-${filter.label}`}
                label={filter.label}
                options={filter.list}
                width={filter.width}
                defaultValue={filter.defaultValue}
              />
            ))}
          {addLabelButton && (
            <AddElement
              label={addLabelButton}
              handleAddLabelButton={handleAddLabelButton}
            />
          )}
        </div>
      </StyledTitleAndDropdown>

      {(amountMessages || withIcons) && (
        <StyledSubtitleAndIcons
          sx={{
            m: 2,
            mt: 0,
          }}
          width="100%"
        >
          {amountMessages && (
            <Typography variant="subtitle1" style={{ color: "#898989" }}>
              {amountMessages} mensajes en total
            </Typography>
          )}
          {withIcons && (
            <StyledIconsContent width={88}>
              <RefreshIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => console.log("Refresh")}
              />
              <PrintOutlinedIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => console.log("Print")}
              />
              <FileDownloadOutlinedIcon
                style={{
                  cursor: "pointer",
                }}
                onClick={() => console.log("Download")}
              />
            </StyledIconsContent>
          )}
        </StyledSubtitleAndIcons>
      )}
    </StyledInboxHeaderContent>
  );
}
