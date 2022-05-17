import React from 'react'
import './AnimeCard.scss'

export default function AnimeCard(props) {
    return (
        <div className='card'>
            <div className='heading'>
                <h5>{props.title}</h5>
            </div>
            <div className='AnimeImg'>
                <img src={props.img} alt='animeimg' />
            </div>
            <div className='animeInfo'>
                <h6>Rating : {props.score}</h6>
                <h6>Episodes : {props.episodes}</h6>
                <h6>End-date : {props.enddate}</h6>
            </div>
            <div className='buttons'>
                <button>+ Watchlist</button>
                <button>+ Completed</button>
            </div>
        </div>
    )
}
