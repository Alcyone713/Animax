import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import logo from '../../Assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  
  const getSearchResults = async () => {
    if (search.length >= 5) {
      const temp = await fetch("https://api.jikan.moe/v4/anime?q=" + search + "&limit=10")
        .then(res => res.json())
      setSearchResults(temp.data)
      console.log(temp.data)
    }
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
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
          {searchResults && searchResults.length < 2 ? (null) :
            (<div className='suggestions'>
              {searchResults.map((item, index) => {
                return (
                  <div key={index}>
                    <SearchSuggestions id={item.mal_id} img={item.images.jpg.small_image_url} title={item.title}/>
                  </div>
                )
              })}
            </div>
            )
          }
          <button onClick={getSearchResults} type="submit">
            <SearchIcon />
          </button>
        </div>
        <div className='logout'>
          <LogoutIcon style={{ fontSize: '30px' }} />
          {/* <AccountCircleIcon style={{fontSize: '50px'}}/> */}
        </div>
      </nav>
    </div>
  )
}
