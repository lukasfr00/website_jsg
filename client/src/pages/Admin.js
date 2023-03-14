import {useEffect, useState} from "react";
import classes from "./Admin.module.css";
import Axios from "axios";
import {Link, useNavigate} from "react-router-dom";


const Admin = (props) => {

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;
    const logout = () => {
        Axios.get("http://localhost:3006/api/logout").then((response) => {
            navigate('/admin');
            console.log(response.data.message)
        });
    }

    useEffect(() => {
        props.setActive("admin")
    },[])

    return <div className={classes.container}>
        <h1>Willkommen, Admin!</h1>
        <div className={classes.menu}>
            <Link className={classes.menuLink} to='/admin_news'>Neuigkeiten</Link>
            <Link className={classes.menuLink} to='/admin_dates'>Termine</Link>
            <Link className={classes.menuLink} to='/admin_teams'>Mannschaften</Link>
        </div>
        <button className={classes.logout} onClick={logout}>Logout</button>
    </div>
}

export default Admin