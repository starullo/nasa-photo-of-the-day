import React, {useState, useEffect} from "react";
import "./App.css";
import axios from 'axios';
import styled, {keyframes} from 'styled-components'



const RoverSection = styled.div`
padding-top: 6%;
padding-bottom: 5%;
background-color: ${pr=>pr.theme.priColor};
color: ${pr=>pr.theme.white};
font-size: 3rem;
text-align: center;
text-shadow: 3px 2px 3px ${pr=>pr.theme.priColor};
font-family: orbitron;
`

const RoverSecH2 = styled.h2`
margin: 3% auto;
font-size: 4rem;
width: 100%;
`

const ImgContainer = styled.div`
background-color: ${pr=>pr.theme.priColor};
padding: 2%;
`


const ColoredTextContainer = styled.div`
background-color: gray;
width: 60%;
margin: auto;
border-radius: 10px;
padding: 3%;
border: solid 3px ${pr=>pr.theme.secColor};
`

const RoverButton = styled.button`
background-color: ${pr=>pr.theme.secColor};
color: ${pr=>pr.theme.white};
border-radius: 3px;
padding: ${pr=>pr.theme.buttonPad};
font-size: 2rem;
border: solid 2px ${pr=>pr.theme.tertColor};
font-family: Orbitron;
margin-top: 2%;
`

const HoverEffect = styled.span`
font-family: "Gloria Hallelujah";
color: ${pr=>pr.theme.secColor};
font-size: 4rem;

transition: all 1s ease-in-out; 
&:hover {
   transition: all 1s ease-in-out;
   letter-spacing: 15px;
}
`

export default function Rover() {
    const [numOfPhotos, setNumOfPhotos] = useState('');
    const [imgDate, setImgDate] = useState('');
    const [takenBy, setTakenBy] = useState('');
    const [randUrl, setRandUrl] = useState('');

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
        <RoverSection>
                    {randUrl && 
            <ImgContainer>
            <img src={randUrl}/>
            <p>Taken By: {takenBy} on {imgDate}</p>
            </ImgContainer>}
            <ColoredTextContainer>
            <RoverSecH2>Random Photos...<HoverEffect>from Mars!</HoverEffect></RoverSecH2>
            <p>Want to see a random photo taken from the Mars Rover? You know the drill, press the button!</p>

        <RoverButton onClick={getUrl}>Houston, we have a photo</RoverButton>
        </ColoredTextContainer>
        </RoverSection>
    )
}