import React, { useState } from 'react'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import AnimeInfo from '../AnimeInfo/AnimeInfo';
import CloseIcon from '@mui/icons-material/Close';
import './SearchSuggestions.scss'

export default function SearchSuggestions(props) {
    const [open, setOpen] = useState(false);
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    const bg = {
        modal: {
          background: "#292929"
        },
    };
    return (
        <div className='search-suggestions'>
            <img src={props.img} alt="something" />
            <h5 onClick={onOpenModal}>{props.title}</h5>
            <Modal open={open} onClose={onCloseModal} center styles={bg} closeIcon={<CloseIcon style={{ color: "white" }} />}>
                <AnimeInfo id={props.id} />
            </Modal>
        </div>
    )
}
