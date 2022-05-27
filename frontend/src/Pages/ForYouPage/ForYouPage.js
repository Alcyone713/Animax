import React, { useState, useEffect } from 'react'
import ListCard from '../../Components/ListCard/ListCard'
import Navbar from '../../Components/Navbar/Navbar'
import './ForYouPage.scss'

export default function ForYouPage() {

  const [recommendations, setRecommendations] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/recommendations', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.error) {
          console.log("error")
        }
        else {
          setRecommendations(result)
        }
      })
  }, [])
  return (
    <div>
      <Navbar />
      <div className='recommendations'>
        {recommendations.map((item, index) => {
          return (<div key={index}>
            <ListCard id={item} />
          </div>)
        })}
      </div>
    </div>
  )
}
