import React from "react";
import { styled, SxProps, Theme } from "@mui/material";

const Div = styled("div")(()=>({
    minHeight: '103vh',
    width:"100%",
    display:"flex",
    flexDirection:"column",
    position:"relative",
    paddintTop:40,
    paddingBottom:40
}))
const Overlay = styled("div")(()=>({
    background:"#000000",
    opacity:0.7,
    position:"absolute",
    height: '100%',
    width:"100%",
    top:0,
    left:0
}))

const Modal = styled("div")(()=>(props=>({
    height: '100%',
    width:"100%",
    top:0,
    left:0,
    zIndex:5,
    display:"flex",
    flexDirection:"column",
})))

export interface SectionProps {
    children?: React.ReactNode
    sx?: SxProps<Theme>
    backgroundImage?: string
}
export default function Section({sx:originalSx,backgroundImage,children}: SectionProps) {

    const sx: SxProps<Theme>|undefined = React.useMemo(()=>{
        if(backgroundImage) {
            const sx: SxProps<Theme> = {
                ...originalSx,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize:"cover",
                backgroundPosition:"center",
            }
            return sx;
        } else {
            return originalSx
        }
    },[originalSx,backgroundImage])

    if(backgroundImage) {
        return (
            <Div sx={sx}>
                <Overlay />
                <Modal>
                    {children}
                </Modal>
            </Div>
        )
    }
    return (
        <Div sx={sx}>
            {children}
        </Div>
    )
}