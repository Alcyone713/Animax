import React from 'react'
import TopAnimes from '../../Components/TopAnimes/TopAnimes'
import Navbar from '../../Components/Navbar/Navbar'
import Carousel from '../../Components/Carousel/Carousel'
import Footer from '../../Components/Footer/Footer'

export default function HomePage() {
  return (
    <div>
        <Navbar />
        <Carousel />
        <TopAnimes />
        <Footer />
    </div>
  )
}
