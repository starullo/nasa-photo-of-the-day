import React, {useState, useEffect} from "react";
import "./App.css";
import axios from 'axios';

export default function Rover() {
    const [randUrl, setRandUrl] = useState('');
    const [numOfPhotos, setNumOfPhotos] = useState('');
    const [imgDate, setImgDate] = useState('');
    const [takenBy, setTakenBy] = useState('');

    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=YbUynbWVo92eAUAdlerdxb0JPthz9HDt5YPvb9PW')
    .then(res=>{
    const num = res.data.photos.length;
    setNumOfPhotos(num);
    });

    const getUrl = obj=>{
        axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=YbUynbWVo92eAUAdlerdxb0JPthz9HDt5YPvb9PW')
        .then(res=>{
            const rand = Math.floor(Math.random() * numOfPhotos + 1);
            setRandUrl(res.data.photos[rand].img_src);
            setImgDate(res.data.photos[rand].earth_date);
            setTakenBy(res.data.photos[rand].camera.full_name);
        });
    }

    return (
        <>
        <div>
            <h2>Random Photos...from Mars!</h2>
            {randUrl && 
            <>
            <img src={randUrl}/>
            <div><p>Taken By: {takenBy} on {imgDate}</p></div>
            </>}
        </div>
        <button onClick={getUrl}>Show Me a Photo!</button>
        </>
    )
}