import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import './ForYouPage.scss'

export default function ForYouPage() {
  return (
    <div>
        <Navbar/>
        <div className='recommendations'>
            <h1>Please wait...</h1>
        </div>
    </div>
  )
}
