import classes from "./News.module.css"
import {useEffect, useState} from "react";
import logo from "../images/logos/jsg.png";
import SingleNews from "../components/Home_Components/SingleNews";
import Axios from "axios";

const News = (props) => {

    const [newsList, setNewsList] = useState([])

    const loadNews = () => {
        Axios.get("http://localhost:3006/api/get_news").then((response)=>{
            setNewsList(response.data.reverse())
        })
    }

    const content = () => {
        return (
            <div className={classes.sectionOne}>
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
        )
    }

    useEffect(() => {
        loadNews()
        props.setActive("neuigkeiten")
    },[])

    return <div className={classes.container}>
        {content()}
    </div>
}

export default News;