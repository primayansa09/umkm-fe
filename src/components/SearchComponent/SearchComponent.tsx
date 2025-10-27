import React from "react";
import { Grid, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  gridSize?: number;
  sx?: object;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = "Search",
  gridSize = 3,
  sx = {},
}) => {
  return (
    <Grid size={gridSize}>
      <TextField
        id="search-textfield"
        placeholder={placeholder}
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={sx}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          },
        }}
      />
    </Grid>
  );
};

export default SearchField;
