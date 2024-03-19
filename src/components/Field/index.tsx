"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Input, TextField, TextFieldProps, styled } from "@mui/material";
// import { options } from "./constants";

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: "#E5E5E5",
    color: "#000000 !important",
  },
  '& .MuiFormLabel-root.Mui-disabled': {
    backgroundColor: "#DFF8FF",
    color: "#565656 !important",
  },
  // "> .Mui-disabled": {
  //   // backgroundColor: "red",
  // }
});

export default function Field(props: { value?: any, label: string, width: number, options?: any } & TextFieldProps) {
  const { width, label, options, value } = props;
  // const [optionSelected, setOptionSelected] = React.useState(options[0]?.value);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setOptionSelected(event.target.value as string);
  // };

  return (
    <Box sx={{ width, color: "#000000" }}>
      <FormControl fullWidth>
        {/* <InputLabel
          id="simple-select-label"
          style={{ backgroundColor: "#DFF8FF" }}
        >
          {label}:
        </InputLabel> */}
        {/* <TextField value={} /> */}
        <StyledTextField {...props} label={label} value={value} />
        {/* <Select
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
        </Select> */}
      </FormControl>
    </Box>
  );
}
