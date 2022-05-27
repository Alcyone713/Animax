import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Footer() {
  return (
    <div style={{ backgroundColor: "#242424", color: "#e1e1e1", marginTop: "20px", height: "30px", width: "100%" }}>Made with
      <span> <FavoriteIcon style={{ color: "red", fontSize: "17px", marginTop: "5px" }} /></span> by
      <a href="https://github.com/Alcyone713" style={{ color: "#e1e1e1", textDecoration: "none" }}> Manasvi</a>
    </div>
  )
}
