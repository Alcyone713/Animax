import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './CompletedList.scss'

export default function CompletedListPage() {
  return (
    <div>
        <Navbar/>
        <div className='completedlist'>
            <h1>+ Add something to your Completed list</h1>
        </div>
    </div>
  )
}
