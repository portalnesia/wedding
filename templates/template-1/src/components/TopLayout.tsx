import {CssBaseline, StyledEngineProvider} from '@mui/material'
import Theme from '../themes'
import React from 'react'
import useSiteMetadata from '../hooks/useMetadata'
import { Helmet } from 'react-helmet'

export default function TopLayout({children}: {children:React.ReactNode}) {
    const metadata = useSiteMetadata()
  return (
    <React.Fragment>
        <Helmet>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href='https://fonts.googleapis.com/css?family=Inter|Caramel&display=swap' />
        </Helmet>
        <Theme>
          <CssBaseline />
          {children}
        </Theme>
    </React.Fragment>
  )
}
