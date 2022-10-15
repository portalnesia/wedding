import { GlobalStyles as GlobalThemeStyles } from '@mui/material';
import React from 'react';


export default function GlobalStyles() {
    //const theme = useTheme();
  
    return (
      <GlobalThemeStyles
        styles={{
          '*': {
            //margin: 0,
            //padding: 0,
            boxSizing: 'border-box'
          },
          html: {
            width: '100%',
            height: '100%',
            WebkitOverflowScrolling: 'touch'
          },
          body: {
            width: '100%',
            height: '100%',
            //fontFamily:"Inter",
            overflowX:"hidden",
            ...(process.env.NODE_ENV === "production" ? {
              "& p, & h1, & h2, & h3, & h4, & h5, & h6, & span":{
                userSelect:"none"
              }
            } : {}),
          },
          ".overflow":{
            overflow:"hidden"
          },
          a: {color:'inherit',textDecoration:'unset',WebkitTapHighlightColor:'transparent'},
          'a p, a span':{
            '&:hover':{textDecoration:'underline'}
          },
        }}
      />
    );
  }