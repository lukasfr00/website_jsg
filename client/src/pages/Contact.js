import classes from "./Contact.module.css";
import {useEffect} from "react";


const Contact = (props) => {

    useEffect(() => {
        props.setActive("kontakt")
    },[])

    return <div className={classes.container}>
        <h2>Kontakt</h2>
    </div>
}

export default Contact;