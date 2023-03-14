import classes from "./ProductCard.module.css"


const ProductCard = (props) => {

    const showProduct = () => {
        props.setProduct(props.id)
    }

    return <div onClick={showProduct} className={classes.card}>
        <div className={classes.image}>
            <img src={props.image}/>
        </div>
        <div className={classes.divide}></div>
        <div className={classes.informations}>
            <h3>{props.name}</h3>
            <div className={classes.priceBG}>
                <div className={classes.price}>{props.price} €</div>
            </div>
        </div>
    </div>
}

export default ProductCard