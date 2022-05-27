import React, { useState, useEffect } from 'react'
import ListCard from '../../Components/ListCard/ListCard'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import './CompletedList.scss'
import { useNavigate } from 'react-router-dom'

export default function CompletedListPage() {
  const [completedlist, setCompletedlist] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch('http://localhost:5000/userdetails', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        if (result.error) {
          navigate("/signin")
        }
        else {
          setCompletedlist(result[0].completedlist)
        }
      })
  }, [])

  return (
    <div>
      <div className='watchlist'>
      <Navbar />
        {completedlist.length === 0 ? (<h1>+ Add something to your completed list</h1>) :
          (<div className='animecard'>
            {completedlist.map((item, index) => {
              return (<div key={index}>
                <ListCard id={item.mal_id} />
              </div>)
            })}
          </div>
          )
        }
        <Footer />
      </div>
    </div>
  )
}
