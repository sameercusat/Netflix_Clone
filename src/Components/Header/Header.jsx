import React from 'react'
import logo from "../../logo.png";
import { Link } from 'react-router-dom';
import {BsSearch} from "react-icons/bs";
const Header = () => {
  return (
    <nav className='header'>
        <img src={logo} alt="netflix_logo" />

        <div>
        <Link to="/">Home</Link>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/news">News & Popular</Link>
        <Link to="/list">My List</Link>
        <Link to="/lang">Browse by Languages</Link>
        </div>
        <BsSearch/>
        <Link to="/Child">Children</Link>
    </nav>
  )
}

export default Header