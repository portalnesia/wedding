import { styled,alpha, SxProps, Theme } from '@mui/material'
import React from 'react'
import {CountdownRenderProps} from 'react-countdown'
import { Span } from './html'

const Div = styled("div")(()=>({
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
}))

const DivP = styled("div")(()=>({
    borderRadius:10,
    marginRight:8,
    backgroundColor: alpha("#ffffff",0.3),
    position:"relative",
    width:70,
    height:70
}))

const P = styled("p")(()=>({
    fontSize:30,
    margin:15,
    marginTop:5,
    marginBottom:20
}))


export function countdown({hours,days,minutes,seconds,sx}: CountdownRenderProps & ({sx?:SxProps<Theme>})) {
    return (
        <Div sx={sx}>
            {days > 0 && (
                <DivP>
                    <P>{`${days}`.padStart(2,"0")}</P>
                    <Span sx={{fontSize:13,position:"absolute",bottom:5,right:15}}>Hari</Span>
                </DivP>
            )}
            <DivP>
                <P>{`${hours}`.padStart(2,"0")}</P>
                <Span sx={{fontSize:13,position:"absolute",bottom:5,right:15}}>Jam</Span>
            </DivP>
            <DivP>
                <P>{`${minutes}`.padStart(2,"0")}</P>
                <Span sx={{fontSize:13,position:"absolute",bottom:5,right:15}}>Menit</Span>
            </DivP>
            {days <= 0 && (
                <DivP>
                    <P>{`${seconds}`.padStart(2,"0")}</P>
                    <Span sx={{fontSize:13,position:"absolute",bottom:5,right:15}}>Detik</Span>
                </DivP>
            )}
        </Div>
    )
}