import React, { useState, useEffect } from 'react'
import ListCard from '../../Components/ListCard/ListCard'
import Navbar from '../../Components/Navbar/Navbar'
import './WatchListPage.scss'

export default function WatchListPage() {

  const [watchlist, setWatchlist] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/userdetails', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setWatchlist(result[0].watchlist)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <div className='watchlist'>
        {watchlist.length === 0 ? (<h1>+ Add something to your Watchlist</h1>) :
          (<div className='animecard'>
            {watchlist.map((item, index) => {
              return (<div key={index}>
                <ListCard id={item.mal_id} score={null}/>
              </div>)
            })}
          </div>
          )
        }
      </div>
    </div>
  )
}
