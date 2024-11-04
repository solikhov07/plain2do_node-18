import React from 'react'
import './Popup.css'
import { MdOutlineGppGood } from "react-icons/md";
const StatusPopup = ({status, setStatusPopup, msg, title_msg}) => {
    setTimeout(() => {
        setStatusPopup(false)
    }, 5000)
    return (
        <div className="info_status_box">
            <h2 style={status == 200 ? {color: "rgb(54, 216, 62)"} : {color: "red"}}><i><MdOutlineGppGood/></i>{title_msg}</h2>
            <p style={status == 200 ? {color: "rgb(54, 216, 62)"} : {color: "red"}} className="event_explaination">{msg.length > 60 ? msg.slice(0, 50) + '...' : msg }</p>
            <div style={status == 200 ? {background: "rgb(54, 216, 62)"}:{background:"red"}} className="box_progress_popupp"></div>
        </div>
    )
}

export default StatusPopup