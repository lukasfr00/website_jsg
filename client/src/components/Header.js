import {Link} from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../images/logos/jsg_border.png"
import {useEffect, useState} from "react";


const Header = (props) => {

    const [sideMenu, setSideMenu] = useState(false)

    const toggleSideMenu = () => {
        if(props.windowSize.width < 750){
            setSideMenu(!sideMenu)
        }
    }

    useEffect(()=>{
        if(props.windowSize.width >= 940){
            setSideMenu(true)
        } else {
            setSideMenu(false)
        }
    },[props.windowSize, props.active])

    const showMenu = () => {
        if(sideMenu){
            return (
                <div className={classes.sideMenu}>
                    {props.windowSize.width < 940 && <button className={classes.hamburgerClose} onClick={toggleSideMenu}>
                        <div className={classes.hamburgerCrossPos}></div>
                        <div className={classes.hamburgerCrossNeg}></div>
                    </button>}
                    <div className={classes.menu}>
                        <Link onClick={toggleSideMenu} className={props.active == "startseite" ? classes.menuLinkActive : classes.menuLink} to='/startseite'>Startseite</Link>
                        <Link onClick={toggleSideMenu} className={props.active == "neuigkeiten" ? classes.menuLinkActive : classes.menuLink} to='/neuigkeiten'>Neuigkeiten</Link>
                        <Link onClick={toggleSideMenu} className={props.active == "mannschaften" ? classes.menuLinkActive : classes.menuLink} to='/mannschaften'>Mannschaften</Link>
                        <Link onClick={toggleSideMenu} className={props.active == "kontakt" ? classes.menuLinkActive : classes.menuLink} to='/kontakt'>Kontakt</Link>
                        <Link onClick={toggleSideMenu} className={props.active == "impressum" ? classes.menuLinkActive : classes.menuLink} to='/impressum'>Impressum</Link>
                        <Link onClick={toggleSideMenu} className={props.active == "shop" ? classes.menuLinkActiveShop : classes.menuLinkShop} to='/shop'>
                            Shop <i className="fa-solid fa-bag-shopping"></i>
                            {props.cartElements > 0 && <div className={classes.cartElements}>{props.cartElements}</div>}
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <button className={classes.hamburger} onClick={toggleSideMenu}>
                    <div className={classes.hamburgerLine}></div>
                    <div className={classes.hamburgerLine}></div>
                    <div className={classes.hamburgerLine}></div>
                </button>
            )
        }
    }

    const overlay = () => {
        if (sideMenu) {
            return <div className={classes.overlay}></div>
        } else return <></>
    }

    return <>
        {props.windowSize.width < 940 && <>{overlay()}</>}
        <div className={classes.header}>
            <div className={classes.headerContainer}>
                <div className={classes.logoContainer}>
                    <img src={logo}/>
                </div>
                {showMenu()}
            </div>
        </div>
    </>
}

export default Header;