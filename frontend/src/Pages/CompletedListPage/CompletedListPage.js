import React, {useState, useEffect} from 'react'
import ListCard from '../../Components/ListCard/ListCard'
import Navbar from '../../Components/Navbar/Navbar'
import './CompletedList.scss'

export default function CompletedListPage() {
  const [completedlist, setCompletedlist] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/userdetails', {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      }
    }).then(res => res.json())
      .then(result => {
        console.log(result)
        setCompletedlist(result[0].completedlist)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <div className='watchlist'>
        {completedlist.length === 0 ? (<h1>+ Add something to your  Watchlist</h1>) :
          (<div className='animecard'>
            {completedlist.map((item, index) => {
              return (<div key={index}>
                <ListCard id={item.mal_id} score={item.score}/>
              </div>)
            })}
            </div>
            )
        }
      </div>
    </div>
  )
}
