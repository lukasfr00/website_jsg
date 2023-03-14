import classes from "./Teams.module.css";
import {useEffect, useState} from "react";
import React from 'react'
import Jugend from "../components/Team_Components/Jugend";
import Axios from "axios";


const Teams = (props) => {

    const [team, setTeam] = useState("Team auswählen")
    const [showTeams, setShowTeams] = useState(false)
    const [teamsList, setTeamsList] = useState([])

    const loadTeams = () => {
        Axios.get("http://localhost:3006/api/get_teams").then((response)=>{
            setTeamsList(response.data)
        })
    }

    const selectHandler = (selected) => {
        setTeam(selected)
        setShowTeams(false)
        return null
    }

    const toggleOptions = () => {
        setShowTeams(!showTeams)
    }

    const content = () => {

        let teamSelected = {}
        for(let i = 0; i < teamsList.length; i++){
            if(teamsList[i].teamName == team){
                teamSelected = teamsList[i]
            }
        }

        return (
            <Jugend
                jugend={teamSelected.jugend}
                name={teamSelected.teamName}
                teamURL={teamSelected.teamFoto}
                info={teamSelected.infotext}
                trainer_name={teamSelected.trainer}
                trainer_mail={teamSelected.trainerMail}
                trainer_phone={teamSelected.trainerTelefon}
                trainerURL={teamSelected.trainerFoto}
                windowSize={props.windowSize}
            />
        )
    }

    useEffect(() => {
        loadTeams()
        props.setActive("mannschaften")
    },[])

    return <div className={classes.container}>
        <h2>Mannschaften</h2>
        <div className={classes.selectTeam}>
            <button onClick={toggleOptions} className={classes.teamLabel}>
                <div className={classes.teamSelected}>{team}</div>
                {!showTeams && <i className="fa-solid fa-caret-right"></i>}
                {showTeams && <i className="fa-solid fa-caret-down"></i>}
            </button>
            {showTeams &&  <div className={classes.options}>
                {teamsList.map((t, i) => {
                    return (
                        <button
                            className={classes.teamOption}
                            onClick={() => {
                                selectHandler(t.teamName)
                            }}
                            key={i}
                        >{t.teamName}</button>
                    )
                })}
            </div>}
        </div>
        {content()}
    </div>
}

export default Teams;