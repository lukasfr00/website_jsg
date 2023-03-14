import classes from "./AdminTeams.module.css";
import React, {useEffect, useState} from "react";
import Axios from "axios";
import {Link} from "react-router-dom";
import Jugend from "../Team_Components/Jugend";

const AdminTeams = (props) => {

    const [jugend, setJugend] = useState('')
    const [teamName, setTeamName] = useState('')
    const [teamFoto, setTeamFoto] = useState('')
    const [infotext, setInfotext] = useState('')
    const [trainer, setTrainer] = useState('')
    const [trainerMail, setTrainerMail] = useState('')
    const [trainerTelefon, setTrainerTelefon] = useState('')
    const [trainerFoto, setTrainerFoto] = useState('')

    const [showAdd, setShowAdd] = useState(false)
    const [showJugendChoice, setShowJugendChoice] = useState(false)

    const [teamsList, setTeamsList] = useState([])

    const saveTeam = () => {
        Axios.post("http://localhost:3006/api/add_team", {
            jugend: jugend,
            teamName: teamName,
            teamFoto: teamFoto,
            infotext: infotext,
            trainer: trainer,
            trainerMail: trainerMail,
            trainerTelefon: trainerTelefon,
            trainerFoto: trainerFoto
        }).then((response)=>{
            console.log(response)
        } )
        setTeamsList([...teamsList,{
            jugend: jugend,
            teamName: teamName,
            teamFoto: teamFoto,
            infotext: infotext,
            trainer: trainer,
            trainerMail: trainerMail,
            trainerTelefon: trainerTelefon,
            trainerFoto: trainerFoto
        }])
        setShowAdd(false)
    }

    const loadTeams = () => {
        Axios.get("http://localhost:3006/api/get_teams").then((response)=>{
            setTeamsList(response.data)
        })
    }

    const deleteTeam = (id) => {
        Axios.delete(`http://localhost:3006/api/delete_team/${id}`).then((response)=>{
            console.log(response)
        })
        window.location.reload()
    }

    const toggleAddBox = () => {
        setShowAdd(!showAdd)
    }

    const selectHandler = (selected) => {
        setJugend(selected)
        setShowJugendChoice(false)
        return null
    }

    const toggleOptions = () => {
        setShowJugendChoice(!showJugendChoice)
    }

    const addBox = () => {
        return <div className={classes.form}>
            <button onClick={toggleOptions} className={classes.teamLabel}>
                <div className={classes.teamSelected}>{jugend}</div>
                {!showJugendChoice && <i className="fa-solid fa-caret-right"></i>}
                {showJugendChoice && <i className="fa-solid fa-caret-down"></i>}
            </button>
            {showJugendChoice && <div className={classes.options}>
                <button className={classes.teamOption} onClick={() => {
                    selectHandler('A-Jugend')
                }}>A-Jugend
                </button>
                <button className={classes.teamOption} onClick={() => {
                    selectHandler('B-Jugend')
                }}>B-Jugend
                </button>
                <button className={classes.teamOption} onClick={() => {
                    selectHandler('C-Jugend')
                }}>C-Jugend
                </button>
                <button className={classes.teamOption} onClick={() => {
                    selectHandler('D-Jugend')
                }}>D-Jugend
                </button>
                <button className={classes.teamOption} onClick={() => {
                    selectHandler('E-Jugend')
                }}>E-Jugend
                </button>
                <button className={classes.teamOption} onClick={() => {
                    selectHandler('F-Jugend')
                }}>F-Jugend
                </button>
                <button className={classes.teamOption} onClick={() => {
                    selectHandler('G-Jugend')
                }}>G-Jugend
                </button>
            </div>}
            <label>Teamname:</label>
            <input type={"text"} name={"teamname"} onChange={(e) => {
                setTeamName(e.target.value)}
            }/>
            <label>Teamfoto:</label>
            <input type={"text"} name={"teamfoto"} onChange={(e) => {
                setTeamFoto(e.target.value)}
            }/>
            <label>Beschreibung:</label>
            <textarea type={"text"} name={"teamdescription"} onChange={(e) => {
                setInfotext(e.target.value)}
            }/>
            <label>Trainer Name:</label>
            <input type={"text"} name={"trainername"} onChange={(e) => {
                setTrainer(e.target.value)}
            }/>
            <label>Trainer Mailadresse:</label>
            <input type={"text"} name={"trainermail"} onChange={(e) => {
                setTrainerMail(e.target.value)}
            }/>
            <label>Trainer Telefonnummer:</label>
            <input type={"text"} name={"trainertelefon"} onChange={(e) => {
                setTrainerTelefon(e.target.value)}
            }/>
            <label>Trainer Foto:</label>
            <input type={"text"} name={"trainerfoto"} onChange={(e) => {
                setTrainerFoto(e.target.value)}
            }/>
            <button className={classes.submit} onClick={saveTeam}>Hinzufügen</button>
        </div>
    }

    useEffect(()=>{
        loadTeams()
    },[])

    return <div className={classes.container}>
        <div className={classes.header}>
            <Link className={classes.back} to='/admin'><i className="fa-solid fa-arrow-left"></i></Link>
            <h1>Mannschaften</h1>
            <button className={classes.add} onClick={toggleAddBox}>Mannschaft <i className="fa-solid fa-plus"></i></button>
        </div>
        {showAdd && addBox()}
        {
            (teamsList.length > 0) && <div className={classes.teamBoxes}>
                {
                    teamsList.map((team, index)=> {
                        return (
                            <div key={index} className={classes.teamCard}>
                                <div>
                                    <button className={classes.delete} onClick={()=>{deleteTeam(team.id)}}><i
                                        className="fa-solid fa-trash"></i> Löschen</button>
                                    {/*<button onClick={() => {editNews(singleNews.id)}}>Bearbeiten</button>*/}
                                </div>
                                <Jugend
                                    jugend={team.jugend}
                                    name={team.teamName}
                                    teamURL={team.teamFoto}
                                    info={team.infotext}
                                    trainer_name={team.trainer}
                                    trainer_mail={team.trainerMail}
                                    trainer_phone={team.trainerTelefon}
                                    trainerURL={team.trainerFoto}
                                    windowSize={props.windowSize}
                                />
                            </div>
                        )
                    })
                }
            </div>
        }
        {
            (teamsList.length == 0) && <p>
                Keine Mannschaften hinzugefügt
            </p>
        }
    </div>
}

export default AdminTeams