import { Container, Grid, styled, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import useInvitationConfig from "../hooks/useInvitationConfig";
import Section from "./Section";
import ScrollAnimation from 'react-animate-on-scroll';
import useBridegroomConfig from "../hooks/useBridegroomConfig";
import Image from "./Image";
import {Place, Event, AccessTime} from '@mui/icons-material'
import "animate.css/animate.min.css";
import { date_format, getDayJs, range_format } from "../utils/main";
import Countdown from "react-countdown";
import {Div,P,Title,Span} from './html'
import { countdown } from "./Countdown";

interface EventProps {
    even?: boolean
    text: string
    icon: React.ReactNode
}
function EventGrid({even,text,icon}: EventProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"))
    return (
        <Div sx={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent: {xs:undefined,sm:even ? "flex-end" : "flex-start"}}}>
            {even && !isMobile ? (
                <React.Fragment>
                    <P sx={{mr:1}}>{text}</P>
                    {icon}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {icon}
                    <P sx={{ml:1}}>{text}</P>
                </React.Fragment>
            )}
        </Div>
    )
}

export default function Invitation() {
    const inv = useInvitationConfig();
    const bride = useBridegroomConfig()

    return (
        <Div>
            <Section key="undangan" backgroundImage={inv.background} sx={{alignItems:"center",justifyContent:"center",color:"#fff"}}>
                <Container sx={{textAlign:"center",my:5}}>
                    <ScrollAnimation animateIn="animate__fadeInDown" animateOnce>
                        {inv.text.split("\n").map((p,i)=>(
                            <P key={`${i}-${p}`}>{p}</P>
                        ))}
                    </ScrollAnimation>
                </Container>
            </Section>

            <Section key="pengantin" sx={{justifyContent:"center"}}>
                <Container sx={{my:5}}>
                    <ScrollAnimation animateIn="animate__backInLeft" animateOnce key={"husband"}>
                        <Div sx={{display:"flex",justifyContent:"flex-start",mx:"5%",mb:8}}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} sm={5}>
                                    <Image
                                        title={bride[0].name}
                                        src={bride[0].image}
                                        alt={bride[0].name}
                                        sx={{
                                            width: 180,
                                            height:180,
                                            borderRadius:'90px',
                                            objectFit:"cover",
                                            objectPosition:"center",
                                            backgroundColor:"primary.main",
                                            padding:1,
                                            mr:3,
                                            float:{xs:"none",sm:"right"}
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={7}>
                                    <Div>
                                        <P sx={{fontSize:18,fontStyle:"italic"}}>{bride[0].fullname}</P>
                                        <P sx={{fontStyle:"italic"}}>
                                            <Span>{bride[0].text}</Span><br />
                                            <Span>{bride[0].parents[0].name}</Span><br />
                                            <Span>{`& ${bride[0].parents[1].name}`}</Span>
                                        </P>
                                    </Div>
                                </Grid>
                            </Grid>
                        </Div>
                    </ScrollAnimation>

                    <ScrollAnimation animateIn="animate__backInRight" delay={500} animateOnce key={"wife"}>
                        <Div sx={{display:"flex",justifyContent:"flex-end",mx:"5%"}}>
                            <Grid container spacing={1} alignItems="center">
                                <Grid item xs={12} sm={7}>
                                    <Div sx={{float:"right"}}>
                                        <P sx={{fontSize:18,fontStyle:"italic"}}>{bride[1].fullname}</P>
                                        <P sx={{fontStyle:"italic"}}>
                                            <Span>{bride[1].text}</Span><br />
                                            <Span>{bride[1].parents[0].name}</Span><br />
                                            <Span>{`& ${bride[1].parents[1].name}`}</Span>
                                        </P>
                                    </Div>
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <Image
                                        title={bride[1].name}
                                        src={bride[1].image}
                                        alt={bride[1].name}
                                        sx={{
                                            width: 180,
                                            height:180,
                                            borderRadius:'90px',
                                            objectFit:"cover",
                                            objectPosition:"center",
                                            backgroundColor:"primary.main",
                                            padding:1,
                                            ml:3,
                                            float:{xs:"right",sm:"none"}
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Div>
                    </ScrollAnimation>
                </Container>
            </Section>

            <Section key="acara" sx={{backgroundColor:"primary.main",color:"#fff"}}>
                <ScrollAnimation animateIn="animate__fadeInDown" animateOnce>
                    <Title sx={{fontFamily:"Caramel",textAlign:"center"}}>Save the Date</Title>
                </ScrollAnimation>
                <Container sx={{mt:2,mb:5}}>
                    <Grid container spacing={2}>
                        {inv.events.map((e,i)=>{
                            const from = getDayJs(e.from);
                            const now = getDayJs();
                            const withCountdown = now.diff(from) < 0;
                            return (
                                <Grid item key={e.name} xs={12} sm={6}>
                                    <Container sx={{position:"relative",...(i%2 != 0 ? {borderLeft:"1px solid"} : {})}}>
                                        <ScrollAnimation key={`title-${i}`} animateIn={i%2==0 ? "animate__slideInLeft" : "animate__slideInRight"} animateOnce>
                                            <Div sx={{display:"flex",justifyContent: {xs:undefined,sm:i % 2 == 0 ? "flex-end" : "flex-start"}}}>
                                                <P sx={{fontSize:20,textAlign:"center",backgroundColor:"white",padding:1,color:"primary.main",borderRadius:3,minWidth:"50%"}}>{e.name}</P>
                                            </Div>
                                        </ScrollAnimation>
                                        <ScrollAnimation key={`date-${i}`} animateIn={i%2==0 ? "animate__slideInLeft" : "animate__slideInRight"} animateOnce delay={700}>
                                            <EventGrid even={i%2==0} text={date_format(from)} icon={<Event fontSize="large" />} />
                                        </ScrollAnimation>
                                        <ScrollAnimation key={`time-${i}`} animateIn={i%2==0 ? "animate__slideInLeft" : "animate__slideInRight"} animateOnce delay={1400}>
                                            <EventGrid even={i%2==0} text={range_format(from,e.to)} icon={<AccessTime fontSize="large" />} />
                                        </ScrollAnimation>    
                                        <ScrollAnimation key={`place-${i}`} animateIn={i%2==0 ? "animate__slideInLeft" : "animate__slideInRight"} animateOnce delay={2100}>
                                            <EventGrid even={i%2==0} text={e.place.name} icon={<Place fontSize="large" />} />
                                        </ScrollAnimation>

                                        {withCountdown && (
                                            <ScrollAnimation animateIn="animate__fadeInDown" animateOnce delay={2500}>
                                                <Div sx={{mt:2}}>
                                                    <Countdown date={from.toDate()} renderer={({...p})=>countdown({...p,sx:{justifyContent:{xs:undefined,sm:i % 2 == 0 ? "flex-end" : "flex-start"}}})} />
                                                </Div>
                                            </ScrollAnimation>
                                        )}
                                    </Container>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Container>
            </Section>

            {inv.gallery ? (
                <Section key="gallery">
                    <ScrollAnimation animateIn="animate__fadeInDown" animateOnce>
                        <Title sx={{fontFamily:"Caramel",textAlign:"center"}}>Gallery</Title>
                    </ScrollAnimation>
                    <Container sx={{my:5}}>
                        <Grid container spacing={2}>
                            {inv.gallery.map((g,i)=>(
                                <Grid item key={g.src} xs={6} md={4} lg={3}>
                                    <ScrollAnimation animateIn="animate__fadeInDown" animateOnce delay={i*500}>
                                        <Image src={g.src} alt={g.caption} title={g.caption} fancybox="gallery"
                                            sx={{
                                                width:"100%",
                                                borderRadius:5,
                                                objectFit:"cover",
                                                objectPosition:"center",
                                                backgroundColor:"primary.main",
                                                padding:0.7,
                                            }}
                                        />
                                    </ScrollAnimation>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Section>
            ) : null}

            <Section sx={{minHeight:"unset",backgroundColor:"primary.main",textAlign:"center",color:"white",p:1}}>
                <P sx={{fontSize:13}}><a href="https://portalnesia.com" target={"_blank"}><span>Portalnesia</span></a> © 2022</P>
            </Section>
        </Div>
    )
}