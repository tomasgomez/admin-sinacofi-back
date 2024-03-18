"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import { options } from "./constants";

export default function Dropdrown(props: { label: string, widthDropdown: number, options: any }) {
  const { widthDropdown, label, options } = props;
  const [optionSelected, setOptionSelected] = React.useState(options[0]?.value);

  const handleChange = (event: SelectChangeEvent) => {
    setOptionSelected(event.target.value as string);
  };

  return (
    <Box sx={{ width: widthDropdown }}>
      <FormControl fullWidth>
        <InputLabel
          id="simple-select-label"
          style={{ backgroundColor: "#DFF8FF" }}
        >
          {label}:
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionSelected}
          label={label}
          onChange={handleChange}
        >
          {options.map((option: any, index: number) => (
            <MenuItem key={`${option.label}-${index}`} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
