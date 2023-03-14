import classes from "./ProductSite.module.css"
import React, {useEffect, useState} from "react";

const ProductSite = (props) => {

    const [size, setSize] = useState("Größe auswählen")
    const [showSizes, setShowSizes] = useState(false)

    const [isSizeSelected, setIsSizeSelected] = useState(false)
    const [showWarning, setShowWarning] = useState(false)
    const [showAdded, setShowAdded] = useState(false)

    const selectHandler = (selected) => {
        setSize(selected)
        if(selected != "Größe wählen"){
            setIsSizeSelected(true)
            setShowWarning(false)
        } else {
            setIsSizeSelected(false)
        }
        setShowSizes(false)
        return null
    }

    const toggleOptions = () => {
        setShowSizes(!showSizes)
    }

    const showProduct = () => {
        props.setProduct(0)
    }

    const addToCart = () => {
        if(isSizeSelected){
            let product = [
                {
                    product_name: props.name,
                    product_color: props.color,
                    product_size: size,
                    product_image: props.image,
                    product_price: props.price
                }
            ]
            setShowAdded(true)
            props.addToCart(product)
            window.scrollTo(0, 0)
        } else {
            setShowWarning(true)
        }
    }

    const warning = () => {
        if(showWarning){
            return (
                <div>
                    Bitte Größe auswählen
                </div>
            )
        } else {
            return <></>
        }
    }

    return <div className={classes.container}>
        <button className={classes.arrowBack} onClick={showProduct}>
            <i className="fa-solid fa-arrow-left"></i>
        </button>
        <div className={classes.image}>
            <img src={props.image}/>
        </div>
        <div className={classes.divide}></div>
        <div className={classes.productInfos}>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <div className={classes.selectSize}>
                <button onClick={toggleOptions} className={classes.sizeLabel}>
                    <div className={classes.sizeSelected}>{size}</div>
                    {!showSizes && <i className="fa-solid fa-caret-right"></i>}
                    {showSizes && <i className="fa-solid fa-caret-down"></i>}
                </button>
                {showSizes &&  <div className={classes.options}>
                    {props.sizes.map((s, i) => {
                        return (
                            <button
                                className={classes.sizeOption}
                                onClick={() => {
                                    selectHandler(s)
                                }}
                                key={i}
                            >{s}</button>
                        )
                    })}
                </div>}
            </div>
            {warning()}
            <button className={classes.price} onClick={addToCart}>{props.price} € <i className="fa-solid fa-cart-plus"></i></button>
        </div>
    </div>
}

export default ProductSite