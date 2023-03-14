import classes from "./Imprint.module.css";
import {useEffect} from "react";


const Imprint = (props) => {

    useEffect(() => {
        props.setActive("impressum")
    },[])

    return <div className={classes.container}>
        <h2>Impressum</h2>
    </div>
}

export default Imprint;