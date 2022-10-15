import React from "react";
import Helmet from 'react-helmet'
import {Container} from "@mui/material";
import useSiteMetadata from "../hooks/useMetadata";

export interface PageProps {
}
export default function Page() {
    const metadata = useSiteMetadata()
    return (
        <Helmet>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <link rel="icon" href="/favicon.ico" />
            <link rel="stylesheet" href='https://fonts.googleapis.com/css?family=Inter|Satisfy&display=swap' />
        </Helmet>
    )
}