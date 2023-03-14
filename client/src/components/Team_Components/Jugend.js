import classes from "./Jugend.module.css"

const Jugend = (props) => {

    const responsiveContent = () => {
        if(props.windowSize.width < 750){
            return (
                <>
                    <div className={classes.teamInfo}>
                        <h2>{props.name}</h2>
                        <p>{props.info}</p>
                    </div>
                    <div className={classes.divide}></div>
                    <div className={classes.coachContainer}>
                        <div className={classes.coachContact}>
                            <div>{props.trainer_name}</div>
                            <div>{props.trainer_mail}</div>
                            <div>{props.trainer_phone}</div>
                        </div>
                        <div className={classes.coachImage}>
                            <img src={props.trainerURL}/>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <h2>{props.name}</h2>
                    <div className={classes.teamInfo}>
                        <p>{props.info}</p>
                        <div className={classes.divide}></div>
                        <div className={classes.coachContainer}>
                            <div className={classes.coachImage}>
                                <img src={props.trainerURL}/>
                            </div>
                            <div className={classes.coachContact}>
                                <div>{props.trainer_name}</div>
                                <div>{props.trainer_mail}</div>
                                <div>{props.trainer_phone}</div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }

    return <div className={classes.teamContainer}>
        <div className={classes.teamImageContainer}>
            <img src={props.teamURL}/>
        </div>
        {responsiveContent()}
    </div>
}

export default Jugend