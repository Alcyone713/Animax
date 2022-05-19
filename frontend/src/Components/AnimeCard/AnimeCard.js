import React, { useState } from 'react'
import './AnimeCard.scss'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import AnimeInfo from '../AnimeInfo/AnimeInfo';


export default function AnimeCard(props) {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);
    const bg = {
        modal: {
          background: "#292929"
        }
      };

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
                <h6 onClick={onOpenModal} style={{textDecoration: 'underline', cursor: 'pointer'}}>Read More</h6>
                <Modal open={open} onClose={onCloseModal} center styles={bg}>
                    <AnimeInfo id={props.mal_id} />
                </Modal>

            </div>
            <div className='buttons'>
                <button>+ Watchlist</button>
                <button>+ Completed</button>
            </div>
        </div>
    )
}
