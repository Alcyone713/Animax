import React, { useState, useEffect } from 'react'
import './AnimeCard.scss'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import AnimeInfo from '../AnimeInfo/AnimeInfo';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'material-ui-snackbar-provider'
import { useNavigate } from 'react-router-dom';


export default function AnimeCard(props) {

    const snackbar = useSnackbar()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const bg = {
        modal: {
            background: "#292929"
        },
    };
    const [mal_id, setid] = useState("")

    useEffect(() => {
        setid(props.mal_id)
    }, [])


    const add_to_watchlist = () => {
        fetch('http://localhost:5000/add_to_watchlist', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                mal_id: mal_id
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.error) {
                    navigate("/signin")
                }
            }).catch(err => {
                console.log(err)
            })
            snackbar.showMessage('Added to Watchlist!')
    }
    const add_to_completedlist = () => {
        fetch('http://localhost:5000/add_to_completedlist', {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                mal_id: mal_id,
            })
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                if (result.error) {
                    navigate("/signin")
                }
                else {
                }
            }).catch(err => {
                console.log(err)
            })
            snackbar.showMessage('Added to Completed list!')
    }
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
                <h6 onClick={onOpenModal} style={{ textDecoration: 'underline', cursor: 'pointer' }}>Read More</h6>
                <Modal open={open} onClose={onCloseModal} center styles={bg} closeIcon={<CloseIcon style={{ color: "white" }} />}>
                    <AnimeInfo id={props.mal_id} />
                </Modal>
            </div>
            <div className='buttons'>
                <button onClick={() => add_to_watchlist()} style={{ cursor: "pointer" }}>+ Watchlist </button>
                <button onClick={()=> add_to_completedlist()} style={{ cursor: "pointer" }}>+ Completed</button>
            </div>
        </div>
    )
}
