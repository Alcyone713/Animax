import React, { useState, useEffect } from 'react'
import Modal from 'react-responsive-modal';
import { makeRequest } from '../../Actions/Actions';
import AnimeInfo from '../AnimeInfo/AnimeInfo';
import './ListCard.scss'
import CloseIcon from '@mui/icons-material/Close';

export default function ListCard(props) {

    const id = props.id
    const [animeinfo, setAnimeInfo] = useState([])

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
 
    const bg = {
        modal: {
            background: "#292929"
        },
    };

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
                        <h6 onClick={onOpenModal} style={{textDecoration: "underline", cursor: "pointer"}}>Read More</h6>
                        <Modal open={open} onClose={onCloseModal} center styles={bg} closeIcon={<CloseIcon style={{ color: "white" }} />}>
                            <AnimeInfo id={props.id} />
                        </Modal>
                        <br/>
                    </div>
                </div>
            )
            }
        </div>
    )
}
