import React, { useState, useEffect } from 'react'
import './TopAnime.scss'
import AnimeCard from '../AnimeCard/AnimeCard'
import AnimeInfo from '../../Pages/AnimeInfo/AnimeInfo'

export default function TopAnimes() {

  const [topAnime, setTopAnime] = useState([])
  // const [page, setPage] = useState("topAnime")
  // const [mal_id, set_mal_id] = useState("")

  // const getPage = () =>{
  //   if(page==="animeInfo"){
  //     return <AnimeInfo id={mal_id}/>
  //   }
  //   else{
  //    return <TopAnimes />
  //   }
  // }
   

  const getTopAnime = async () => {
    const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
      .then(res => res.json())

    setTopAnime(temp.top)
    // console.log(temp)
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
              <AnimeCard img={item.image_url} title={item.title} score={item.score} episodes={item.episodes} enddate={item.end_date} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
