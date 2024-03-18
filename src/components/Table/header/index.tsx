"use client";
import * as React from "react";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  StyledInboxHeaderContent,
  StyledTitleAndDropdown,
  StyledSubtitleAndIcons,
  StyledIconsContent,
} from "./style";
import { Autocomplete, InputAdornment, TextField, Typography } from "@mui/material";
import Dropdrown from "@/components/Dropdown";
import { Search } from "@mui/icons-material";

const SearchField = ({ data, label } : { data: any, label: string }) => {
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
            type: 'search',
            endAdornment: (
              <InputAdornment position="end">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  )
}

export default function Header(props: { title: string, label: string, amountMessages: number, filters: any }) {
  const { amountMessages, title, label, filters } = props;
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
          <SearchField data={[]} label="test" />
          {filters && filters.map((filter: any) => (
            <Dropdrown label={filter.label} options={filter.list} widthDropdown={filter.width} />
            // <Dropdrown label={label} widthDropdown={300} />
          ))}
        </div>
      </StyledTitleAndDropdown>
      <StyledSubtitleAndIcons
        sx={{
          m: 2,
          mt: 0,
        }}
        width="100%"
      >
        <Typography variant="subtitle1" style={{ color: "#898989" }}>
          {amountMessages} mensajes en total
        </Typography>
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
      </StyledSubtitleAndIcons>
    </StyledInboxHeaderContent>
  );
}
