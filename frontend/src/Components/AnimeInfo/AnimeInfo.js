import React, { useEffect, useState } from 'react'
import './AnimeInfo.scss'

export default function AnimeInfo(props) {

  const id = props.id;
  const [animeinfo, setAnimeInfo] = useState(null)

  const getAnimeInfo = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then(res => res.json())

    setAnimeInfo(temp)
    console.log(temp)
  }
  useEffect(() => {
    getAnimeInfo();
  }, [])

  return (
    <div>
      {animeinfo === null ? (<h2 style={{color: '#e1e1e1'}}>Loading ... </h2>) : (
        <div className='AnimeInfo'>
          <div className='AnimeImg'>
            <img src={animeinfo.data.images.jpg.image_url} alt='animeimg' />
            <button>+ Watchlist</button>
            <button>+ Completed</button>
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
            <a href={animeinfo.data.url} target="_blank" rel="noreferrer" style={{color: '#e1e1e1'}}>See more info here</a>
          </div>
        </div>
      )}

    </div >
  )
}
