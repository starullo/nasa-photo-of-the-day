import React, {useState, useEffect} from "react";
import "./App.css";
import axios from 'axios';
import styled, {keyframes} from 'styled-components'

const WeatherSection = styled.div`
background-color: ${pr=>pr.theme.priColor};
padding-top: 4%;
font-size: 2rem;
text-align: center;
border-top: dashed 4px ${pr=>pr.theme.secColor};
color: ${pr=>pr.theme.white};
font-family: Orbitron;
`

const WeatherH2 = styled.h2`
font-size: 4rem;
margin: 2% auto;
text-shadow: 3px 2px 3px ${pr=>pr.theme.priColor};
`

const BlueTextSpan = styled.span`
color: ${pr=>pr.theme.tertColor};
`

const RedTextSpan = styled.span`
color: ${pr=>pr.theme.secColor};
`

const ColoredTextContainer = styled.div`
background-color: gray;
width: 60%;
margin: auto;
border-radius: 10px;
padding: 3%;
border: solid 3px ${pr=>pr.theme.secColor};
`

const TextEffect = styled.span`
font-family: "Gloria Hallelujah";
color: ${pr=>pr.theme.secColor};

transition: all 1s ease-in-out; 
&:hover {
    letter-spacing: 15px;
   transition: all 1s ease-in-out;
}

`


export default function  Weather(props) {
    const [high, setHigh] = useState('');
    const [low, setLow] = useState('');


useEffect(()=>{
        axios.get('https://api.nasa.gov/insight_weather/?api_key=YbUynbWVo92eAUAdlerdxb0JPthz9HDt5YPvb9PW&feedtype=json&ver=1.0')
        .then(res=>{
            const days = Object.keys(res.data);
            const yesterday = days[1];
            setHigh(res.data[yesterday].AT.mx);
            setLow(res.data[yesterday].AT.mn);
            
        });
    },[]);
return (
    <WeatherSection >
    <ColoredTextContainer>
    <WeatherH2>Yesterday's weather... <TextEffect>on Mars!</TextEffect></WeatherH2>
    <RedTextSpan>High: {high}°</RedTextSpan>, <BlueTextSpan>Low: {low}°</BlueTextSpan>
    </ColoredTextContainer>
    </WeatherSection >
)
}