import classes from "./AdminNews.module.css";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import SingleNews from "../Home_Components/SingleNews";
import {Link} from "react-router-dom";

const AdminNews = () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [image, setImage] = useState('')

    const [showAdd, setShowAdd] = useState(false)

    const [newsList, setNewsList] = useState([])

    const saveNews = () => {
        Axios.post("http://localhost:3006/api/add_news", {
            title: title,
            text: text,
            image: image
        }).then((response)=>{
            console.log(response)
        })
        setNewsList([...newsList,{
            title: title,
            text: text,
            image: image
        }])
        setShowAdd(false)
    }

    const loadNews = () => {
        Axios.get("http://localhost:3006/api/get_news").then((response)=>{
            setNewsList(response.data.reverse())
        })
    }

    const deleteNews = (id) => {
        Axios.delete(`http://localhost:3006/api/delete_news/${id}`).then((response)=>{
            console.log(response)
        })
        window.location.reload()
    }

    const toggleAddBox = () => {
        setShowAdd(!showAdd)
    }

    const addBox = () => {
        return <div className={classes.form}>
            <label>Titel der Neuigkeit:</label>
            <input type={"text"} name={"title"} onChange={(e) => {
                setTitle(e.target.value)}
            }/>
            <label>Beschreibung:</label>
            <textarea type={"text"} name={"text"} onChange={(e) => {
                setText(e.target.value)}
            }/>
            <label>Bild URL:</label>
            <input type={"text"} name={"image"} onChange={(e) => {
                setImage(e.target.value)}
            }/>
            <button className={classes.submit} onClick={saveNews}>Posten</button>
        </div>
    }

    useEffect(()=>{
        loadNews()
    },[])

    return <div className={classes.container}>
        <div className={classes.header}>
            <Link className={classes.back} to='/admin'><i className="fa-solid fa-arrow-left"></i></Link>
            <h1>Neuigkeiten</h1>
            <button className={classes.add} onClick={toggleAddBox}>Neuigkeit <i className="fa-solid fa-plus"></i></button>
        </div>
        {showAdd && addBox()}
        {
            (newsList.length > 0) && <div className={classes.newsBoxes}>
                {
                    newsList.map((singleNews, index)=> {
                        return (
                            <div key={index} className={classes.newsCard}>
                                <div>
                                    <button className={classes.delete} onClick={()=>{deleteNews(singleNews.id)}}><i
                                        className="fa-solid fa-trash"></i> Löschen</button>
                                    {/*<button onClick={() => {editNews(singleNews.id)}}>Bearbeiten</button>*/}
                                </div>
                                <SingleNews
                                    id={singleNews.id}
                                    title={singleNews.title}
                                    text={singleNews.text}
                                    imageURL={singleNews.img_url}
                                    key={singleNews.id}
                                />
                            </div>
                        )
                    })
                }
            </div>
        }
        {
            (newsList.length == 0) && <p>
                Keine Neuigkeiten gepostet
            </p>
        }
    </div>
}

export default AdminNews