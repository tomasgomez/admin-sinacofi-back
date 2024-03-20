import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Dropdrown(props: {
  label: string;
  width: number;
  options: any;
  defaultValue?: any
  selected?: any;
  onChange?: any;
}) {
  const { width, label, options, defaultValue, selected, onChange } = props;
  const [optionSelected, setOptionSelected] = React.useState(selected || defaultValue);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string);
    setOptionSelected(event.target.value as string);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Box sx={{ width }}>
      <FormControl fullWidth>
        <InputLabel
          id="simple-select-label"
          style={{
            backgroundColor:
              isFocused || !!optionSelected ? "#DFF8FF" : "transparent",
          }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={optionSelected}
          label={label}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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





