import React, { useState, useEffect } from 'react'
import './Navbar.scss'
import logo from '../../Assets/logo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions';
import { makeRequest } from '../../Actions/Actions';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {

  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [name, setName] = useState("")

  const history = useNavigate()

  const getSearchResults = () => {
    makeRequest('GET', "https://api.jikan.moe/v4/anime?q=" + search + "&limit=10")
      .then(info => {
        setSearchResults(JSON.parse(info).data)
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
  useEffect(() => {
    fetch('http://localhost:5000/userdetails', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        setName(result[0].name)
      })
  }, [])

  const logout = () => {
    localStorage.removeItem("jwt")
    history('/')
    window.location.reload(false)
    sessionStorage.removeItem("recommendArray")
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
            <button>
              <SearchIcon style={{ color: "#e1e1e1" }} />
            </button>
          </div>
          <div className='logout'>
            {name === "" ? (null) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <h2>Hi! {name}</h2>
                <LogoutIcon style={{ fontSize: '30px', cursor: "pointer"}} onClick={() => logout()} />
              </div>
            )}

          </div>
        </div>
        <div className='pages'>
          <NavLink activeClassName="active" to='/'>Home</NavLink>
          <NavLink activeClassName="active" to='/recommendations'>For You</NavLink>
          <NavLink activeClassName="active" to='/watchlist'>Watchlist</NavLink>
          <NavLink activeClassName="active" to='/completed'>Completed</NavLink>
        </div>
      </nav>
    </div>
  )
}
