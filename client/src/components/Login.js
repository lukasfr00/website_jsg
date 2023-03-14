import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Axios from "axios";
import classes from "./Login.module.css";

const Login = (props) => {

    const [mailadress, setMailadress] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState('')

    const login = () => {
        Axios.post("http://localhost:3006/api/login", {
            mailadress: mailadress,
            password: password
        }).then((response)=>{
            if(response.data.message){
                setLoginStatus(response.data.message)
            } else {
                props.adminLogin()
                navigate('/admin');
            }
        })
    }

    useEffect(() => {
        props.setActive("admin")
    },[])

    return <div className={classes.container}>
        <h1>Admin-Login</h1>
        <div className={classes.form}>
            <div className={classes.inputContainer}>
                <label>E-Mail Adresse</label>
                <input type={"text"} onChange={(e) => {setMailadress(e.target.value)}}/>
            </div>
            <div className={classes.inputContainer}>
                <label>Passwort</label>
                <input type={"password"} onChange={(e) => {setPassword(e.target.value)}}/>
                <button className={classes.passwordForgot}>Passwort vergessen?</button>
            </div>
            <div>{loginStatus}</div>
            <button className={classes.login} onClick={login}>Login{/*<Link to='/admin'>Login</Link>*/}</button>
        </div>
    </div>

}


export default Login