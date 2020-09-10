  
import React, {useState, useEffect} from "react";
import "./App.css";
import axios from 'axios';
import Weather from './Weather';
import Rover from './Rover';
import styled, {keyframes} from 'styled-components'

const kf = keyframes`
25% {
  opacity: .3;
  transform: scale(1.5)
}
50% {
  opacity: .5;
  transform: scale(.5)
}
100% {
  opacity: 1;
  tranform: scale(1);
}
`

const StyledDiv = styled.div`
background-color: ${pr=>pr.theme.priColor};
color: ${pr=>pr.theme.white};
text-shadow: 3px 3px 5px ${pr=>pr.theme.secColor};
font-size: 2.5em;
letter-spacing: 2px;
margin-bottom: 0;
padding-bottom: 3%;
font-family: Orbitron;
`;

const StyledH1 = styled.h1`
padding-top: 2%;
font-size: 4rem;
`

const StyledP = styled.p`
margin: 2% auto;
width: 90%;
`

const SizedImg = styled.img`
transform: scale(.75);
margin-bottom: 0%;
opacity: 1;
animation: ${kf} 1.25s forwards;
`;

const StyledInput = styled.input`
height: 5%;
width: 20%;
margin: 0 auto;
`;

const SmallP = styled.p`
font-size: 2rem;
margin: 1% auto;
`

const StyledButton = styled.button`
background-color: ${pr=>pr.theme.tertColor};
color: ${pr=>pr.theme.white};
border-radius: 3px;
padding: ${pr=>pr.theme.buttonPad};
font-size: 2rem;
border: solid 2px ${pr=>pr.theme.secColor};
font-family: Orbitron;
`


function App() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [exp, setExp] = useState('');
  const [date, setDate] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [diffDay, setDiffDay] = useState(false);
  useEffect(()=>{
axios.get('https://api.nasa.gov/planetary/apod?api_key=YbUynbWVo92eAUAdlerdxb0JPthz9HDt5YPvb9PW')
.then(res=>{
  console.log(res)
  setUrl(res.data.url)
  setTitle(res.data.title);
  setExp(res.data.explanation);
  setDate(res.data.date)
})
.catch(err=>{
  let date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=YbUynbWVo92eAUAdlerdxb0JPthz9HDt5YPvb9PW&date=${year}-${month + 1}-${day}`)
  .then(res=>{
    setUrl(res.data.url);
    setTitle(res.data.title);
    setExp(res.data.explanation);
    setDate(res.data.date);
    setDiffDay(true);
  })
});
  }, []);


  const changeInput = obj => {
const value = obj.target.value;
setInputValue(value);
  };

  const getRandUrl = () => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=YbUynbWVo92eAUAdlerdxb0JPthz9HDt5YPvb9PW&date=${inputValue}`)
    .then(res=>{
      console.log(res);
      setUrl(res.data.url);
      setTitle(res.data.title);
      setExp(res.data.explanation);
      setDate(res.data.date)
      setDiffDay(true);
    })
    .catch(err=>{
      alert('Please enter a different date or use the correct format!')
    })
  }


  return (
    <>
    <StyledDiv className="App">
      <StyledH1>NASA Photo of the Day</StyledH1>
      {diffDay && <h2>From {date}</h2>}
      <SizedImg src={url} />
      <h2>{title}</h2>
      <StyledP>{exp}</StyledP>
      <StyledP>Want to see the photo of the day from a specific date? Enter it below!</StyledP>
      <StyledInput value={inputValue} onChange={changeInput} />
      <SmallP>(Please use Year/Month/Day format seperated by hyphens (ex: 2019-2-19 for Feb 19, 2019)</SmallP>
      <StyledButton onClick={getRandUrl}>Blast off!</StyledButton>
    </StyledDiv>
    <Weather />
    <Rover />
    </>
  );
}




export default App;