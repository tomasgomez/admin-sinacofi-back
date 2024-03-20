"use client";
import { createTheme } from "@mui/material";
import { green, orange, purple } from "@mui/material/colors";
import { montserrat, roboto } from "@/utils/fonts";
declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
  interface TypographyOptions {
    typography?: {
      a?: string;
    };
  }
}
export const theme = createTheme({
  typography: {
    fontFamily: [roboto.style.fontFamily, montserrat.style.fontFamily].join(
      ", "
    ),
  },
  palette: {
    primary: {
      main: "#00B2E2",
    },
    secondary: {
      main: green[500],
    },
  },
  status: {
    danger: orange[500],
  },
});
