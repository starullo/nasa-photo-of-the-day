import React, {useState, useEffect} from "react";
import "./App.css";
import axios from 'axios';

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
    <>
    <h2>Yesterday's weather... on Mars!</h2>
    <p>High: {high}°, Low: {low}°</p>
    </>
)
}