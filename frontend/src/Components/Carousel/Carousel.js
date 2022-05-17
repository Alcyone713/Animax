import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.scss'

export default function Carousel() {

  const [topCarousel, setTopCarousel] = useState([])
  
  const settings = {
    dots:false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  const getTopCarousel = async () => {
    const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/airing`)
      .then(res => res.json())

    setTopCarousel(temp.top.slice(0,5))
  }

  useEffect(()=>{
    getTopCarousel()
  },[])

  return (
    <div className='content'>
      <Slider {...settings}>
       {topCarousel.map((item, index) => {
         return (
           <div key={index}>
             <img src={item.image_url} alt="animeimage" />
           </div>
         )
       })}
      </Slider>
    </div>
  )
}
