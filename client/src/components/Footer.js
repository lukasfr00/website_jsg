import classes from "./Footer.module.css"
import {Link} from "react-router-dom";

const Footer = (props) => {

    const adminButton = () => {
        if(props.adminStatus == true){
            return <Link to='/admin'>Admin</Link>
        } else {
            return <Link to='/login'>Admin</Link>
        }
    }

    return <div className={classes.footer}>
        <div className={classes.socials}>
            <i className="fa-brands fa-instagram"></i>
            <i className="fa-brands fa-facebook"></i>
        </div>
        <div className={classes.content}>
            {adminButton()}
            <div>Impressum</div>
            <div>Kontakt</div>
        </div>
    </div>
}

export default Footer