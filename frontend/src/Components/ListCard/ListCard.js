import React, { useState, useEffect } from 'react'
import { makeRequest } from '../../Actions/Actions';
import './ListCard.scss'

export default function ListCard(props) {

    const id = props.id
    const [animeinfo, setAnimeInfo] = useState([])

    const getAnimeInfo = () => {
        makeRequest('GET', `https://api.jikan.moe/v4/anime/${id}`)
            .then(info => {
                setAnimeInfo(JSON.parse(info))
                console.log(JSON.parse(info))
            })
            .catch(err => {
                console.log(err)
            })
    }
    useEffect(() => {
        getAnimeInfo();
    }, [])


    return (
        <div>
            {animeinfo.length === 0 ? (null) : (
                <div className='card'>
                    <div className='heading'>
                        <h5>{animeinfo.data.title}</h5>
                    </div>
                    <div className='AnimeImg'>
                        <img src={animeinfo.data.images.jpg.image_url} alt='animeimg' />
                    </div>
                    <div className='animeInfo'>
                        <h6>Rating : {animeinfo.data.score}</h6>
                        <h6>Episodes : {animeinfo.data.episodes}</h6>
                        {props.score===null ? (null) : (
                            <h6>score : {props.score}</h6>
                        )}
                    </div>
                </div>
            )
            }
        </div>
    )
}
