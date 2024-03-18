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
import { Search } from "@mui/icons-material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const SearchField = ({ data, label }: { data: any; label: string }) => {
  return (
    <Autocomplete
      freeSolo
      id="free-solo-2-demo"
      disableClearable
      options={data.map((option: any) => option.title)}
      sx={{
        width: "310px",
        height: "48px",
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          // size="small"
          label="Search input"
          InputProps={{
            ...params.InputProps,
            type: "search",
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

const AddElement = ({ label }: { label: string }) => {
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      startIcon={<AddIcon fontSize="small" />}
      style={{
        backgroundColor: "#00B2E2",
        color: "#FFFFFF",
        textTransform: "none",
      }}
    >
      {label}
    </Button>
  );
};

export default function Header(props: {
  title: string;
  label: string;
  amountMessages?: number;
  filters?: any;
  withIcons?: boolean;
  withSearchBar?: boolean;
  addLabelButton?: string;
}) {
  const {
    amountMessages,
    title,
    label,
    filters,
    withIcons,
    withSearchBar,
    addLabelButton,
  } = props;
  return (
    <StyledInboxHeaderContent>
      <StyledTitleAndDropdown
        sx={{
          m: 2,
        }}
        width="100%"
      >
        <Typography variant="h5">{title}</Typography>
        <div style={{ display: "flex", gap: "12px" }}>
          {withSearchBar && <SearchField data={[]} label="test" />}
          {filters &&
            filters.map((filter: any) => (
              <Dropdrown
                key={`dropdown-${filter.label}`} 
                label={filter.label}
                options={filter.list}
                widthDropdown={filter.width}
              />
              // <Dropdrown label={label} widthDropdown={300} />
            ))}
          {addLabelButton && <AddElement label={addLabelButton} />}
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
