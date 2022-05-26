import React, { useState, useEffect } from 'react'
import './AnimeCard.scss'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import AnimeInfo from '../AnimeInfo/AnimeInfo';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from 'material-ui-snackbar-provider'


export default function AnimeCard(props) {
   
    const snackbar = useSnackbar()

    const [open1, setOpen1] = useState(false);
    const onOpenModal1 = () => setOpen1(true);
    const onCloseModal1 = () => setOpen1(false);
   
    const [open2, setOpen2] = useState(false);
    const onOpenModal2 = () => setOpen2(true);
    const onCloseModal2 = () => setOpen2(false);

    const bg = {
        modal: {
          background: "#292929"
        },
    };
    const [mal_id, setid] = useState("")
    const [score, setScore] = useState("")
     
    useEffect(() => {
        setid(props.mal_id)
    }, [])
    

    const add_to_watchlist = ()=>{
        fetch('http://localhost:5000/add_to_watchlist',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                mal_id : mal_id
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
        }).catch(err=>{
            console.log(err)
        })
        snackbar.showMessage('Added to Watchlist!')
    }
    const add_to_completedlist = ()=>{
        fetch('http://localhost:5000/add_to_completedlist',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                mal_id : mal_id,
                score : score
            })
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
        }).catch(err=>{
            console.log(err)
        })
        snackbar.showMessage('Added to Completed list')
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
                <h6 onClick={onOpenModal1} style={{textDecoration: 'underline', cursor: 'pointer'}}>Read More</h6>
                <Modal open={open1} onClose={onCloseModal1} center styles={bg} closeIcon={<CloseIcon style={{color: "white"}}/>}>
                    <AnimeInfo id={props.mal_id} />
                </Modal>

            </div>
            <div className='buttons'>
                <button onClick={()=>add_to_watchlist()} style={{cursor: "pointer"}}>+ Watchlist</button>
                <button onClick={onOpenModal2} style={{cursor: "pointer"}}>+ Completed</button>
                <Modal open={open2} onClose={onCloseModal2} center>
                    <input type="text" value={score} onChange={(e)=>setScore(e.target.value)}></input>
                    <button onClick={()=>{add_to_completedlist(); onCloseModal2()}}>+ completed list </button>
                </Modal>
            </div>
        </div>
    )
}
