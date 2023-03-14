import classes from "./Date.module.css"
import {useState} from "react";

const Date = (props) => {

    const [showInfos, setShowInfos] = useState(false)

    const toggleInformations = () => {
        setShowInfos(!showInfos)
    }

    const informations = () => {
        if(showInfos){
            return (
                <div className={classes.eventCaption}>{props.text}</div>
            )
        } else {
            return <></>
        }
    }

    return <div className={classes.dateBox}>
        <div className={classes.date}>{props.date}</div>
        <div className={classes.border}></div>
        <div className={classes.title}>
            <h3>{props.title}</h3>
            <button className={classes.info} onClick={toggleInformations}>i</button>
        </div>
        {informations()}
    </div>
}

export default Date