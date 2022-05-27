import React, { useState, useEffect } from 'react'
import ListCard from '../../Components/ListCard/ListCard'
import Navbar from '../../Components/Navbar/Navbar'
import './ForYouPage.scss'
import { useNavigate } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'

export default function ForYouPage() {

  const navigate = useNavigate()
  let recommendations = []
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
          navigate("/signin")
        }
        else {
          recommendations.setItem("recommendArray", JSON.stringify(result))
        }
      })
  }, [])
  recommendations = JSON.parse(sessionStorage.getItem("recommendArray"))

  return (
    <div>
      <div className='recommendations'>
        <Navbar />
        {recommendations === null ? (<h2>Please wait while we fetch your personalized recommendations,<br/> this takes about 2 minutes, stay on this page</h2>) :
          (recommendations.map((item, index) => {
            return (<div key={index}>
              <ListCard id={item} />
            </div>)
          })
          )
        }
        <Footer/>
      </div>
    </div>
  )
}
