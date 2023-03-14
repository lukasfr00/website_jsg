import classes from "./Home.module.css"
import title from "../images/title.jpg"
import logo from "../images/logos/jsg.png"
import logoPLO from "../images/logos/plockhorst.png"
import logoEDD from "../images/logos/eddesse.png"
import logoDED from "../images/logos/mtv.png"
import logoELT from "../images/logos/eltze.png"
import {useEffect, useState} from "react";
import SingleNews from "../components/Home_Components/SingleNews";
import Date from "../components/Home_Components/Date";
import Axios from "axios";

const Home = (props) => {

    const [showNews, setShowNews] = useState(true)
    const [showDates, setShowDates] = useState(false)
    const [newsList, setNewsList] = useState([])
    const [datesList, setDatesList] = useState([])

    //------------------
    //Content One: News and Dates

    const loadNews = () => {
        Axios.get("http://localhost:3006/api/get_news").then((response)=>{
            setNewsList(response.data.reverse())
        })
    }

    const loadDates = () => {
        Axios.get("http://localhost:3006/api/get_dates").then((response)=>{
            setDatesList(response.data.reverse())
        })
    }

    const switchToNews = () => {
        setShowDates(false)
        setShowNews(true)
    }

    const switchToDates = () => {
        setShowDates(true)
        setShowNews(false)
    }

    const contentOne = () => {
        if (props.windowSize.width >= 830){
            return (
                <div className={classes.sectionOne}>
                    <div className={classes.desktopContent}>
                        <div className={classes.news}>
                            <div className={classes.headline}>
                                <img src={logo}/>
                                <h2>JSG Neuigkeiten</h2>
                            </div>
                            <div className={classes.newsBoxes}>
                                {
                                    newsList.map((singleNews, index)=> {
                                        return <SingleNews
                                            id={singleNews.id}
                                            title={singleNews.title}
                                            text={singleNews.text}
                                            imageURL={singleNews.img_url}
                                            key={singleNews.id}
                                        />
                                    })
                                }
                            </div>
                        </div>
                        <div className={classes.dates}>
                            <div className={classes.headline}>
                                <img src={logo}/>
                                <h2>JSG Termine</h2>
                            </div>
                            <div className={classes.dateBoxes}>
                                {
                                    datesList.map((date, index)=> {
                                        return <Date
                                            id={date.id}
                                            date={date.date}
                                            title={date.title}
                                            text={date.text}
                                            key={date.id}
                                        />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else if(showNews) {
            return (
                <div className={classes.sectionOne}>
                    <div className={classes.toggleButtons}>
                        <div className={classes.activeButtonClass}>
                            <button className={classes.activeButton}>Neuigkeiten</button>
                            <div className={classes.triangle}></div>
                        </div>
                        <button className={classes.inactiveButton} onClick={switchToDates}>Termine</button>
                    </div>
                    <div className={classes.news}>
                        <div className={classes.headline}>
                            <img src={logo}/>
                            <h2>JSG Neuigkeiten</h2>
                        </div>
                        {
                            (newsList.length > 0) && <div className={classes.newsBoxes}>
                                {
                                    newsList.map((singleNews, index)=> {
                                        return <SingleNews
                                            id={singleNews.id}
                                            title={singleNews.title}
                                            text={singleNews.text}
                                            imageURL={singleNews.img_url}
                                            key={singleNews.id}
                                        />
                                    })
                                }
                            </div>
                        }
                        {
                            (newsList.length == 0) && <p>
                                Keine aktuellen Neuigkeiten
                            </p>
                        }
                    </div>
                </div>
            )
        } else if (showDates) {
            return (
                <div className={classes.sectionOne}>
                    <div className={classes.toggleButtons}>
                        <button className={classes.inactiveButton} onClick={switchToNews}>Neuigkeiten</button>
                        <div className={classes.activeButtonClass}>
                            <button className={classes.activeButton}>Termine</button>
                            <div className={classes.triangle}></div>
                        </div>
                    </div>
                    <div className={classes.dates}>
                        <div className={classes.headline}>
                            <img src={logo}/>
                            <h2>JSG Termine</h2>
                        </div>
                        {
                            (datesList.length > 0) && <div className={classes.dateBoxes}>
                                {
                                    datesList.map((date, index)=> {
                                        return <Date
                                            id={date.id}
                                            date={date.date}
                                            title={date.title}
                                            text={date.text}
                                            key={date.id}
                                        />
                                    })
                                }
                            </div>
                        }
                        {
                            (datesList.length == 0) && <p>
                                Keine aktuellen Termine
                            </p>
                        }
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        loadNews()
        loadDates()
        props.setActive("startseite")
    },[])

    return <div className={classes.container}>
        <div className={classes.titleContainer}>
            <img src={title}/>
            <div className={classes.overlay}></div>
            <div className={classes.title}>Willkommen bei der JSG Nord!</div>
        </div>
        <div className={classes.content}>
            {contentOne()}
            <hr/>
            <div className={classes.sectionTwo}>
                <h2>Die Vereine</h2>
                <div className={classes.clubs}>
                    <div className={classes.club}>
                        <div className={classes.clubLogo}>
                            <img src={logoPLO}/>
                        </div>
                        <div className={classes.clubInfo}>
                            <h3>SSV Plockhorst</h3>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                            <a href={"http://www.ssvplockhorst.de/"} target={"_blank"}><button>Zum SSV Plockhorst</button></a>
                        </div>
                    </div>
                    <div className={classes.club}>
                        <div className={classes.clubLogo}>
                            <img src={logoEDD}/>
                        </div>
                        <div className={classes.clubInfo}>
                            <h3>MTV Eddesse</h3>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                            <a href={"https://www.mtveddesse.de/"} target={"_blank"}><button>Zum MTV Eddesse</button></a>
                        </div>
                    </div>
                    <div className={classes.club}>
                        <div className={classes.clubLogo}>
                            <img src={logoDED}/>
                        </div>
                        <div className={classes.clubInfo}>
                            <h3>MTV Dedenhausen</h3>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                            <a href={"http://cms.dedenhausen.de/mtv/"} target={"_blank"}><button>Zum MTV Dedenhausen</button></a>
                        </div>
                    </div>
                    <div className={classes.club}>
                        <div className={classes.clubLogo}>
                            <img src={logoELT}/>
                        </div>
                        <div className={classes.clubInfo}>
                            <h3>MTV Eltze</h3>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam</p>
                            <a href={"https://mtv-eltze.de/"} target={"_blank"}><button>Zum MTV Eltze</button></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Home;