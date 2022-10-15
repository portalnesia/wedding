import React from "react";
import Page from "../components/Page";
import Landing from "../components/Landing";
import Invitation from "../components/Invitation";
import Custom404 from "./404";
import SplashScreen from "../components/Splashscreen";

const Home = () => {
    const [loaded,setLoaded] = React.useState(false);
    const [isHome,setIsHome] = React.useState(false);
    const [isError,setError] = React.useState(false);
    const [to,setTo] = React.useState("")
    
    const onLandingClick = React.useCallback(()=>{
        setIsHome(true)
    },[])

    React.useEffect(()=>{
        const params = new URLSearchParams(location.search)
        const to = params.get("to")
        if(!to) {
            setError(true)
        } else {
            setTo(decodeURIComponent(to));
        }
        document.addEventListener('contextmenu', function(e){
            if(process.env.NODE_ENV === "production") e.preventDefault()
        });
        setTimeout(()=>{
            setLoaded(true)
        },1000)
    },[])

    if(!loaded) return <SplashScreen />
    return (
        <>
            {isError ? <Custom404 /> : !isHome ? 
                <Landing to={to} onClick={onLandingClick} />
                : 
                <Invitation />
            }
        </>
    )
}

export default Home;