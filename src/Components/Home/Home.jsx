import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
//import tiger from '../../tiger3.jpg';
import './Home.scss';
import axios from "axios";
import {FaPlay} from "react-icons/fa";
import {IoMdInformationCircleOutline} from "react-icons/io";


// const apiKey = "a467cb3972fdcc523779ed7f7ddbfdef";
const url = "https://api.themoviedb.org/3/movie";
const img_pth="https://image.tmdb.org/t/p/original";
const now_playing="now_playing";
const _popular="popular";
const topRated="top_rated";
const _upcoming="upcoming";
const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDY3Y2IzOTcyZmRjYzUyMzc3OWVkN2Y3ZGRiZmRlZiIsInN1YiI6IjY1MzI0ZmEyOGQyMmZjMDEwYjcxZDgxMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3r7Ty9J--JqFQx5y1NGQMJOmBaNsDVvxt2lG1_A5aRc'
  }  
const Card =({imag})=>
(
  <img className='card' src={imag} alt="card" />
)
const Row =({title, arr=[]})=>
(
  <div className='row'>
    <h3>{title}</h3>
    <div> 
      {arr.map((item,index)=>(<Card key={index} imag={`${img_pth}/${item.poster_path}`}/>))}
    </div>
  </div>
)
const Home = () => {


 const [trending,setTrending] = useState([]);
 const [popular,setPopular] = useState([]);
 const [top_rated,setRated] = useState([]);
 const[upcoming,setUpcoming]=useState([]);
 const[genres,setGeneres]=useState([]);
 
 useEffect(()=>
 {

  document.title="Netflix";
   const fetchTrending=async() =>
   {
      const {data:{results}}=await axios.get(`${url}/${now_playing}?language=en-US&page=1`,{headers}) ;
      setTrending(results);
   };
    const fetchPopular=async() =>
   {
      const {data:{results}}=await axios.get(`${url}/${_popular}?language=en-US&page=2`,{headers}) ;
      setPopular(results);
   };
   const fetchTopRated=async() =>
   {
      const {data:{results}}=await axios.get(`${url}/${topRated}?language=en-US&page=3`,{headers}) ;
      setRated(results);
   };
    const fetchUpcoming=async() =>
   {
      const {data:{results}}=await axios.get(`${url}/${_upcoming}?language=en-US&page=3`,{headers}) ;
      setUpcoming(results);
   };
   const fetchGeneres=async() =>
   {
        const{data:{genres}}=await axios.get('https://api.themoviedb.org/3/genre/movie/list?language=en',{headers});
        setGeneres(genres);
        console.log(genres);
   };
   fetchTrending()
   fetchPopular()
   fetchTopRated()
   fetchUpcoming()
  fetchGeneres()
 },[]) 

  return (
    <section>
    <div className='banner' style={{backgroundImage:upcoming[12] ? `url(${img_pth}/${upcoming[12].poster_path})`:"rgb(16,16,16)"}}>

      
      {upcoming[0]&&<h1>{upcoming[12].original_title}</h1>}
      {upcoming[0]&&<p>{upcoming[12].overview}</p>}
      <div className='btn'>
        <button id='ply'><FaPlay/> Play</button>
        <button id='inf'><IoMdInformationCircleOutline/> More Info </button>
      </div>

    </div>   
    <Row title="Trending Now" arr={trending}/>
    <Row title="Continue Watching for User" arr={popular}/>
    <Row title="Top Rated" arr={top_rated}/>
    <Row title="Upcoming" arr={upcoming}/>
    <div className='genres'>
      {genres.map((item,index)=>(<Link key={item.id}  to={`/genre/${item.id}`}>{item.name}</Link>))}
    </div>
    </section>
  )
}

export default Home