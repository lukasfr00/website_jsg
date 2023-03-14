import classes from "./AdminDates.module.css";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import Date from "../Home_Components/Date";

const AdminDates = () => {

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [date, setDate] = useState('')

    const [showAdd, setShowAdd] = useState(false)

    const [datesList, setDatesList] = useState([])

    const saveDate = () => {
        Axios.post("http://localhost:3006/api/add_date", {
            title: title,
            text: text,
            date: date
        }).then((response)=>{
            console.log(response)
        } )
        setDatesList([...datesList,{
            title: title,
            text: text,
            date: date
        }])
        setShowAdd(false)
    }

    const loadDates = () => {
        Axios.get("http://localhost:3006/api/get_dates").then((response)=>{
            setDatesList(response.data.reverse())
        })
    }

    const deleteDate = (id) => {
        Axios.delete(`http://localhost:3006/api/delete_date/${id}`).then((response)=>{
            console.log(response)
        })
        window.location.reload()
    }

    const toggleAddBox = () => {
        setShowAdd(!showAdd)
    }

    const addBox = () => {
        return <div className={classes.form}>
            <label>Datum:</label>
            <input type={"text"} name={"image"} onChange={(e) => {
                setDate(e.target.value)}
            }/>
            <label>Titel des Termines:</label>
            <input type={"text"} name={"title"} onChange={(e) => {
                setTitle(e.target.value)}
            }/>
            <label>Beschreibung:</label>
            <textarea type={"text"} name={"text"} onChange={(e) => {
                setText(e.target.value)}
            }/>
            <button className={classes.submit} onClick={saveDate}>Posten</button>
        </div>
    }

    useEffect(()=>{
        loadDates()
    },[])

    return <div className={classes.container}>
        <div className={classes.header}>
            <Link className={classes.back} to='/admin'><i className="fa-solid fa-arrow-left"></i></Link>
            <h1>Termine</h1>
            <button className={classes.add} onClick={toggleAddBox}>Termin <i className="fa-solid fa-plus"></i></button>
        </div>
        {showAdd && addBox()}
        {
            (datesList.length > 0) && <div className={classes.dateBoxes}>
                {
                    datesList.map((date, index)=> {
                        return (
                            <div key={index} className={classes.datesCard}>
                                <div>
                                    <button className={classes.delete} onClick={()=>{deleteDate(date.id)}}><i
                                        className="fa-solid fa-trash"></i> Löschen</button>
                                    {/*<button onClick={() => {editNews(singleNews.id)}}>Bearbeiten</button>*/}
                                </div>
                                <Date
                                    id={date.id}
                                    date={date.date}
                                    title={date.title}
                                    text={date.text}
                                    key={date.id}
                                />
                            </div>
                        )
                    })
                }
            </div>
        }
        {
            (datesList.length == 0) && <p>
                Keine Termine gepostet
            </p>
        }
    </div>
}

export default AdminDates