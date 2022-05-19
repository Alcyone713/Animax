import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import logo from '../../Assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {
  
  const [search, setSearch]=useState("")
  const [searchResults, setSearchResults]=useState([])

  const getSearchResults= async () =>{
    const temp=await fetch("https://api.jikan.moe/v3/search/anime?q=" + search + "&limit=15")
      .then(res=>res.json())

    setSearchResults(temp)
    console.log(temp)
  }

  const handleChange = (e) =>{
    setSearch(e.target.value)
    getSearchResults()
  }
  

  return (
    <div>
      <nav>
        <div className='pages'>
          <img src={logo} alt='logo' />
          <a href='#'>Home</a>
          <a href='#'>For you</a>
          <a href='#'>Watchlist</a>
          <a href='#'>Completed</a>
        </div>
        <div className='searchbar'>
          <input type='text' value={search} onChange={handleChange} placeholder='search' />
        </div>
        <div className='logout'>
          <LogoutIcon style={{fontSize: '30px'}} />
          {/* <AccountCircleIcon style={{fontSize: '50px'}}/> */}
        </div>
      </nav>
    </div>
  )
}
