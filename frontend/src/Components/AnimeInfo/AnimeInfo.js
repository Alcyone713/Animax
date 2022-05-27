import React, { useEffect, useState } from 'react'
import './AnimeInfo.scss'
import { makeRequest } from '../../Actions/Actions';
import { useSnackbar } from 'material-ui-snackbar-provider'
import { useNavigate } from 'react-router-dom';


export default function AnimeInfo(props) {

  const id = props.id;
  const [animeinfo, setAnimeInfo] = useState([])

  const snackbar = useSnackbar()
  const navigate = useNavigate()

  const add_to_watchlist = () => {
    fetch('http://localhost:5000/add_to_watchlist', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        mal_id: id
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.error) {
          navigate("/signin")
        }
      }).catch(err => {
        console.log(err)
      })
    snackbar.showMessage('Added to watchlist!')
  }
  const add_to_completedlist = () => {
    fetch('http://localhost:5000/add_to_completedlist', {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        mal_id: id
      })
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.error) {
          navigate("/signin")
        }
      }).catch(err => {
        console.log(err)
      })
    snackbar.showMessage('Added to Completed list!')
  }
  const getAnimeInfo = () => {
    makeRequest('GET', `https://api.jikan.moe/v4/anime/${id}`)
      .then(info => {
        setAnimeInfo(JSON.parse(info))
      })
      .catch(err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getAnimeInfo();
  }, [])

  return (
    <div>
      {animeinfo.length === 0 ? (<h2 style={{ color: '#e1e1e1' }}>Loading ... </h2>) : (
        <div className='AnimeInfo'>
          <div className='AnimeImg'>
            <img src={animeinfo.data.images.jpg.image_url} alt='animeimg' />
            <button onClick={() => add_to_watchlist()} style={{ cursor: "pointer" }}>+ Watchlist</button>
            <button onClick={() => add_to_completedlist} style={{ cursor: "pointer" }}>+ Completed</button>
          </div>
          <div className='animeData'>
            <h3 style={{ textAlign: "center", fontSize: '25px' }}>{animeinfo.data.title}</h3>
            <p><span style={{ fontWeight: 'bold' }}>English title : </span> {animeinfo.data.title_english}</p>
            <p><span style={{ fontWeight: 'bold' }}>Score : </span>{animeinfo.data.score}</p>
            <p><span style={{ fontWeight: 'bold' }}>Rating: </span>{animeinfo.data.rating}</p>
            <div className='genre'>
              <p style={{ fontWeight: 'bold' }}>Genre : </p>
              {animeinfo.data.genres.map((item, index) => {
                return (
                  <div key={index}>
                    <p> {item.name} , </p>
                  </div>
                )
              })}
            </div>
            <div className='genre'>
              <p style={{ fontWeight: 'bold' }}>Themes : </p>
              {animeinfo.data.themes.map((item, index) => {
                return (
                  <div key={index}>
                    <p> {item.name} , </p>
                  </div>
                )
              })}
            </div>
            <h4 style={{ marginTop: '3px', marginBottom: '3px' }}>Synopsis : </h4>
            <p>{animeinfo.data.synopsis}</p>
            <a href={animeinfo.data.url} target="_blank" rel="noreferrer" style={{ color: '#e1e1e1' }}>See more info here</a>
          </div>
        </div>
      )}

    </div >
  )
}
