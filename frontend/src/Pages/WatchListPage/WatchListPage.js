import React, { useState, useEffect } from 'react'
import ListCard from '../../Components/ListCard/ListCard'
import Navbar from '../../Components/Navbar/Navbar'
import './WatchListPage.scss'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function WatchListPage() {

  const [watchlist, setWatchlist] = useState([])

  const navigate = useNavigate()
  useEffect(() => {
    fetch('http://localhost:5000/userdetails', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        if(result.error){
          navigate("/signin")
        }
        else{
          setWatchlist(result[0].watchlist)
        }
      })
  }, [])

  return (
    <div>
      <div className='watchlist'>
      <Navbar />
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
        <Footer/>
      </div>
    </div>
  )
}
