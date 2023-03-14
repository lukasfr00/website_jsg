import {useEffect, useState} from "react";
import classes from "./Shop.module.css";
import logo from "../images/logos/jsg.png";
import ProductCard from "../components/Shop_Components/ProductCard"
import ProductSite from "../components/Shop_Components/ProductSite";
import {Link} from "react-router-dom";

const DUMMY_PRODUCTS = [
    {
        id: 1,
        name: 'JSG - Hoodie weiß (front print)',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        color: 'weiß',
        price: '39.99',
        images: "mockups/hoodieFront_white.png",
        category: 'hoodie',
        tag: 'clothing'
    },
    {
        id: 2,
        name: 'JSG - Hoodie schwarz (front print)',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        color: 'schwarz',
        price: '39.99',
        images: "mockups/hoodieFront_black.png",
        category: 'hoodie',
        tag: 'clothing'
    },
    {
        id: 3,
        name: 'JSG - Hoodie grün (front print)',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        color: 'grün',
        price: '39.99',
        images: "mockups/hoodieFront_green.png",
        category: 'hoodie',
        tag: 'clothing'
    },
    {
        id: 4,
        name: 'JSG - Hoodie weiß (back print)',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        color: 'weiß',
        price: '39.99',
        images: "mockups/hoodieBack_white.png",
        category: 'hoodie',
        tag: 'clothing'
    },
    {
        id: 5,
        name: 'JSG - Hoodie schwarz (back print)',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        color: 'schwarz',
        price: '39.99',
        images: "mockups/hoodieBack_black.png",
        category: 'hoodie',
        tag: 'clothing'
    },
    {
        id: 6,
        name: 'JSG - Hoodie grün (back print)',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        color: 'grün',
        price: '39.99',
        images: "mockups/hoodieBack_green.png",
        category: 'hoodie',
        tag: 'clothing'
    },
    {
        id: 7,
        name: 'JSG - T-Shirt weiß',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: 'weiß',
        price: '19.99',
        images: "mockups/shirt_white.png",
        category: 'shirt',
        tag: 'clothing'
    },
    {
        id: 8,
        name: 'JSG - T-Shirt schwarz',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: 'schwarz',
        price: '19.99',
        images: "mockups/shirt_black.png",
        category: 'shirt',
        tag: 'clothing'
    },
    {
        id: 9,
        name: 'JSG - T-Shirt grün',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: 'grün',
        price: '19.99',
        images: "mockups/shirt_green.png",
        category: 'shirt',
        tag: 'clothing'
    },
    {
        id: 10,
        name: 'JSG - Cap',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['M', 'L'],
        colors: 'grün',
        price: '14.99',
        images: "mockups/hat.png",
        category: 'hat',
        tag: 'article'
    },
    {
        id: 11,
        name: 'JSG - Tasse',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At',
        sizes: ['350 ml'],
        colors: 'weiß',
        price: '9.99',
        images: "mockups/mug.png",
        category: 'mug',
        tag: 'article'
    }
]

const Shop = (props) => {

    const [showClothes, setShowClothes] = useState(true)
    const [showArticles, setShowArticles] = useState(false)
    const [showProduct, setShowProduct] = useState(0)

    const [clothes, setClothes] = useState([])
    const [articles, setArticles] = useState([])

    const [showCart, setShowCart] = useState(false)


    useEffect(() => {
        props.setActive("shop")
        let clothes = []
        for(let i = 0; i < DUMMY_PRODUCTS.length; i++){
            if(DUMMY_PRODUCTS[i].tag == 'clothing'){
                clothes.push(DUMMY_PRODUCTS[i])
            }
        }
        let articles = []
        for(let i = 0; i < DUMMY_PRODUCTS.length; i++){
            if(DUMMY_PRODUCTS[i].tag == 'article'){
                articles.push(DUMMY_PRODUCTS[i])
            }
        }
        setClothes(clothes)
        setArticles(articles)
    },[])

    const switchToClothes = () => {
        setShowArticles(false)
        setShowClothes(true)
    }

    const switchToArticles = () => {
        setShowArticles(true)
        setShowClothes(false)
    }

    const showProductSite = (p) => {
        setShowProduct(p)
    }

    const contentOne = () => {
        if(showProduct != 0){
            return <></>
        } else if(showClothes) {
            return (
                <div className={classes.sectionOne}>
                    <div className={classes.toggleButtons}>
                        <div className={classes.activeButtonClass}>
                            <button className={classes.activeButton}>Kleidung</button>
                            <div className={classes.triangle}></div>
                        </div>
                        <button className={classes.inactiveButton} onClick={switchToArticles}>Fan-Artikel</button>
                    </div>
                    <div className={classes.headline}>
                        <img src={logo}/>
                        <h2>JSG Kleidung</h2>
                    </div>
                    <div className={classes.products}>
                        {
                            clothes.map((product) => {
                                return <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    sizes={product.sizes}
                                    color={product.colors}
                                    price={product.price}
                                    image={product.images}
                                    category={product.category}
                                    setProduct={showProductSite}
                                    key={product.id}
                                />
                        })
                        }
                    </div>
                </div>
            )
        } else if (showArticles) {
            return (
                <div className={classes.sectionOne}>
                    <div className={classes.toggleButtons}>
                        <button className={classes.inactiveButton} onClick={switchToClothes}>Kleidung</button>
                        <div className={classes.activeButtonClass}>
                            <button className={classes.activeButton}>Fan-Artikel</button>
                            <div className={classes.triangle}></div>
                        </div>
                    </div>
                    <div className={classes.headline}>
                        <img src={logo}/>
                        <h2>JSG Fan-Artikel</h2>
                    </div>
                    <div className={classes.products}>
                        {
                            articles.map((product) => {
                                return <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    description={product.description}
                                    sizes={product.sizes}
                                    color={product.colors}
                                    price={product.price}
                                    image={product.images}
                                    category={product.category}
                                    setProduct={showProductSite}
                                    key={product.id}
                                />
                            })
                        }
                    </div>
                </div>
            )
        }
    }

    const product = () => {

        if(showProduct == 0){
            return <></>
        } else {
            let product = {}
            for(let i = 0; i < DUMMY_PRODUCTS.length; i++){
                if(DUMMY_PRODUCTS[i].id == showProduct){
                    product = DUMMY_PRODUCTS[i]
                }
            }
            return <ProductSite
                id={product.id}
                name={product.name}
                description={product.description}
                sizes={product.sizes}
                color={product.color}
                price={product.price}
                image={product.images}
                category={product.category}
                setProduct={showProductSite}
                addToCart={props.addToCart}
            />
        }
    }

    const toggleCart = () =>{
        setShowCart(!showCart)
    }

    const cartPreview = () => {
        if(showCart){
            return (
                <div className={classes.cartPreview}>
                    <h3>Einkaufswagen</h3>
                    {props.cart.length == 0 && <div>Einkaufswagen ist leer</div>}
                    <div className={classes.cartProducts}>
                        {
                            props.cart.map((product, index)=>{
                                return (
                                    <div className={classes.cartItem} key={index}>
                                        <h4>
                                            {product[0].product_name} - {product[0].product_size}
                                        </h4>
                                        <div className={classes.cartItemOptions}>
                                            <button onClick={()=>{props.deleteProduct(index)}} className={classes.deleteItem}>
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <div className={classes.cartItemDetails}>
                                                <b>{product[0].product_price} €</b>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Link className={classes.cartButton} to='/einkaufswagen'>Zum Einkaufswagen</Link>
                    <button onClick={toggleCart} className={classes.closeCart}>Schließen</button>
                </div>
            )
        } else return <></>
    }


    return <div className={classes.container}>
        <div className={classes.header}>
            <div className={classes.cartPlaceholder}><i className="fa-solid fa-cart-shopping"></i></div>
            <h2>Shop</h2>
            <button onClick={toggleCart} className={classes.cart}>
                <i className="fa-solid fa-cart-shopping"></i>
                {props.cartElements > 0 && <div className={classes.cartElements}>{props.cartElements}</div>}
            </button>
        </div>
        {contentOne()}
        {product()}
        {cartPreview()}
    </div>
}

export default Shop