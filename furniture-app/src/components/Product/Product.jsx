import { useContext, useState } from "react";
import { Col } from "react-bootstrap";
import "./product.css"
import { useNavigate } from "react-router-dom";
import { DataContainer } from "../../App";

const Product = ({productItem,addToCart}) => {
    const {setSelectedProduct} =useContext(DataContainer);
    const router =useNavigate();
    const handleClick =()=> {
        setSelectedProduct(productItem);
        localStorage.setItem(`selectedProduct-${productItem.id}`,JSON.stringify(productItem));
        router(`/shop/${productItem.id}`);
    }
    const handleAdd =(productItem)=> {
        addToCart(productItem);
        alert("Product has been added to cart!")
    }
    return (
    <Col md={3} sm={5} xs={10} className="product mtop">
        <img loading="lazy" onClick={()=>handleClick()} src={productItem.imgUrl} alt=""/>
        <div className="product-details">
            <h3 onClick={()=>handleClick()}>
                {productItem.productName}
            </h3>
        <div className="price">
            <h4>${productItem.price}</h4>
            <button type="submit" className="add" onClick={() => handleAdd(productItem)}>
                <ion-icon name="add"></ion-icon>
            </button>
        </div>
    </div>
    </Col>
    );
};

export default Product;
