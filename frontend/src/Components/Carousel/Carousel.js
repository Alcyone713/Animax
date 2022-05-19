import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carousel.scss'
import Anime1 from '../../Assets/Anime1.jpg'
import Anime2 from '../../Assets/Anime2.jpg'
import Anime3 from '../../Assets/Anime3.png'
import Anime4 from '../../Assets/Anime4.jpg'
import Anime5 from '../../Assets/Anime5.jpg'
import Anime6 from '../../Assets/Anime6.jpg'
import Anime7 from '../../Assets/Anime7.jpg'
import Anime8 from '../../Assets/Anime8.jpg'

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
    const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/upcoming`)
      .then(res => res.json())

    setTopCarousel(temp.top.slice(0,5))
  }

  useEffect(()=>{
    getTopCarousel()
  },[])

  return (
    <div className='content'>
      <Slider {...settings}>
       {/* {topCarousel.map((item, index) => {
         return (
           <div key={index}>
             <img src={item.image_url} alt="animeimage" />
           </div>
         )
       })} */}
       <div>
       <img src={Anime1} alt='Anime1'/>
       </div>
       <div>
       <img src={Anime2} alt='Anime1'/>
       </div>
       <div>
       <img src={Anime3} alt='Anime1'/>
       </div>
       <div>
       <img src={Anime4} alt='Anime1'/>
       </div>
       <div>
       <img src={Anime5} alt='Anime1'/>
       </div>
       <div>
       <img src={Anime6} alt='Anime1'/>
       </div>
       <div>
       <img src={Anime7} alt='Anime1'/>
       </div>
       <div>
       <img src={Anime8} alt='Anime1'/>
       </div>

      </Slider>
    </div>
  )
}
