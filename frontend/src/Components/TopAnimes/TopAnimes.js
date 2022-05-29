import React, { useState, useEffect } from 'react'
import './TopAnime.scss'
import AnimeCard from '../AnimeCard/AnimeCard'

export default function TopAnimes() {

  const [topAnime, setTopAnime] = useState([])
   
  const getTopAnime = async () => {
    const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
      .then(res => res.json())

    setTopAnime(temp.top.slice(0,30))
  }

  useEffect(() => {
    getTopAnime()
  }, [])

  return (
    <div className='content'>
      <div className='heading'>Top Animes</div>
      
      <div className='Animes'>
        {topAnime.map((item, index) => {
          return (
            <div key={index} className='animecard'>
              <AnimeCard img={item.image_url} title={item.title} score={item.score} episodes={item.episodes} enddate={item.end_date} mal_id={item.mal_id} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
