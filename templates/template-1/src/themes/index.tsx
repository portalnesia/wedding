import { ReactNode } from 'react';
import landing from "./landing";
import {createTheme,StyledEngineProvider, ThemeProvider,Palette} from "@mui/material";
import GlobalStyle from './global'
import React from 'react';

interface CustomPalette {
  landing: typeof landing,
}

declare module '@mui/material' {
    export interface Palette extends CustomPalette {}
    export interface PaletteOptions extends CustomPalette {}
}

const theme = createTheme({
    palette:{
      mode:"light",
      landing,
      primary:{
        main:"#596774"
      },
      secondary:{
        main:"#f1f1f1"
      },
      background:{
        default: "#f1f1f1"
      }
    },
    typography:{
      fontFamily:"Inter"
    }
})



export default function ThemeConfig({ children }: {children: ReactNode}) {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        {children}
    </ThemeProvider>
  );
}