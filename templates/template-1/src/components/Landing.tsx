import React from "react";
import {styled,Button} from '@mui/material'
import useBridegroomConfig from "../hooks/useBridegroomConfig";
import useLandingConfig from "../hooks/useLandingConfig";

const Content = styled("div")(()=>({
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"column",
    textAlign:"center",
    overflowX:"hidden"
}))

const Div = styled("div")(()=>({
    backgroundSize:"cover",
    backgroundPosition:"center",
    height:"100%",
    width:"100%",
    position:"fixed",
    top:0,
    left:0,
    overflow:'hidden',
    zIndex:1
}))

const Overlay = styled("div")(()=>({
    background:"#000000",
    opacity:0.7,
    position:"relative",
    height:"100%",
    width:"100%",
    top:0,
    left:0,
    overflow:'hidden'
}))

const Modal = styled("div")(()=>(props=>({
    position:"fixed",
    height:"100%",
    width:"100%",
    top:0,
    left:0,
    color: props.theme.palette.landing.textColor,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    overflow:'hidden'
})))

const H1 = styled("h1")(()=>({
    fontFamily:'Caramel',
    fontSize:56
}))

const P = styled("p")(()=>({

}))

const Undangan = styled("p")(()=>({
    fontSize:40,
    marginTop: 10
}))

export interface LandingProps {
    onClick(): void
    to: string
}
export default function Landing({onClick,to}: LandingProps) {
    const bridegroom = useBridegroomConfig();
    const landing = useLandingConfig()

    return (
        <Div sx={{backgroundImage: `url(${landing.background})`}}>
            <Overlay />
            <Modal>
                <Content sx={{px:{lg:4,md:3,xs:2}}}>
                    <H1>{`${bridegroom[0].name} & ${bridegroom[1].name}`}</H1>
                    <div style={{textAlign:"center"}}>
                        <P>Kpd Bpk/Ibu/Saudara/i</P>
                        <Undangan>{to}</Undangan>
                    </div>
                    <Button color="primary" variant="contained" onClick={onClick}>Buka Undangan</Button>
                    <P sx={{fontSize:13, mt:5}}>*Mohon maaf apabila ada kesalahan penulisan nama atau gelar</P>
                </Content>
                <div style={{position:"absolute",bottom:0,textAlign:"center"}}>
                    <P sx={{fontSize:13}}><a href="https://portalnesia.com" target={"_blank"}><span>Portalnesia</span></a> © 2022</P>
                </div>
            </Modal>
        </Div>
    )
}