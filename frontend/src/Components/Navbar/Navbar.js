import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import logo from '../../Assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import { makeRequest } from '../../Actions/Actions';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function Navbar() {

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])

  // const getSearchResults = async () => {
  //   const temp = await fetch("https://api.jikan.moe/v4/anime?q=" + search + "&limit=10")
  //     .then(res => res.json())
  //   setSearchResults(temp.data)
  //   console.log(temp.data)
  // }

  const getSearchResults = () => {
    makeRequest('GET', "https://api.jikan.moe/v4/anime?q=" + search + "&limit=10")
      .then(info => {
        setSearchResults(JSON.parse(info).data)
        // console.log(JSON.parse(info));
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getSearchResults();
  }, [search])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }


  return (
    <div>
      <nav>
        <div className='part1'>
          <img src={logo} id='logo' alt='logo' />
          <div className='searchbar'>
            <input type='text' value={search} onChange={handleChange} placeholder='search' />
            {searchResults.length < 2 || search.length === 0 ? (null) :
              (<div className='suggestions'>
                {searchResults.map((item, index) => {
                  return (
                    <div key={index}>
                      <SearchSuggestions id={item.mal_id} img={item.images.jpg.small_image_url} title={item.title} />
                    </div>
                  )
                })}
              </div>
              )
            }
            {/* <button>
              <SearchIcon style={{ color: "#e1e1e1" }} />
            </button> */}
          </div>
          <div className='logout'>
            <LogoutIcon style={{ fontSize: '30px' }} />
            {/* <AccountCircleIcon style={{fontSize: '50px'}}/> */}
          </div>
        </div>
        <div className='pages'>
          <a href='#'>Home</a>
          <a href='#'>For You</a>
          <a href='#'>Watchlist</a>
          <a href='#'>Completed</a>
        </div>
      </nav>
    </div>
  )
}
