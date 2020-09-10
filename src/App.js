  
import React, {useState, useEffect} from "react";
import "./App.css";
import axios from 'axios';
import Weather from './Weather';
import Rover from './Rover';

function App() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [exp, setExp] = useState('');
  const [date, setDate] = useState('');
  const [inputValue, setInputValue] = useState('');
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
  let day = prompt('Sorry, there is no photo of the day for today yet. Come back later or enter a specific date in the format "2019-02-20"');
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=YbUynbWVo92eAUAdlerdxb0JPthz9HDt5YPvb9PW&date=${day}`)
  .then(res=>{
    setUrl(res.data.url);
    setTitle(res.data.title);
    setExp(res.data.explanation);
    setDate(res.data.date);
  })
  .catch(err=>{
    alert("You either need to pick a different date or use the right format")
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
      console.log(res)
      setUrl(res.data.url)
      setTitle(res.data.title);
      setExp(res.data.explanation);
      setDate(res.data.date)
    })
    .catch(err=>{
      alert('Please enter a different date or use the correct format!')
    })
  }


  return (
    <>
    <div className="App">
      <h1>NASA photo of the day</h1>
      <h2>From {date}</h2>
      <img src={url} />
      <p>{title}</p>
      <p>{exp}</p>
      <h2>Want to see the photo of the day from a specific date? Enter it below! (Please use Year/Month/Day format seperated by hyphens (ex: 2019-02-30 for Feb 30, 2019)</h2>
      <input value={inputValue} onChange={changeInput} />
      <button onClick={getRandUrl}>Let's do it</button>
    </div>
    <Weather />
    <Rover />
    </>
  );
}




export default App;