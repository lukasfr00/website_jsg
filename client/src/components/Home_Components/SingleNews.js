import classes from "./SingleNews.module.css"

const SingleNews = (props) => {

    const img = () => {
        if(props.imageURL != ''){
            return <img src={props.imageURL}/>
        } else {
            return <></>
        }
    }

    return <div className={classes.newsBox}>
        <div className={classes.imageContainer}>
            {img()}
        </div>
        <div className={classes.informations}>
            <h3>{props.title}</h3>
            <p>{props.text}</p>
        </div>
    </div>
}

export default SingleNews