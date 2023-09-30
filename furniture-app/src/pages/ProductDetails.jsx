import { Fragment, useContext, useState } from "react";
import ProdBanner from "../components/ProductBanner/ProdBanner";
import { DataContainer } from "../App";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
    const { selectedProduct, setSelectedProduct, addToCart } = useContext(DataContainer);
    const { id } = useParams();
    if (!selectedProduct) {
        const storedProduct = localStorage.getItem(`selectedProduct-${id}`);
        setSelectedProduct(JSON.parse(storedProduct));
    }
    const [quantity, setQuantity] = useState(1);
    const handleQuantityChange = (event) => {
        setQuantity(parseInt(event.target.value));
    };
    const handleAdd = (selectedProduct, quantity) => {
        addToCart(selectedProduct, quantity);
        alert("Product has been added to cart!")
    }

    return (
        <Fragment>
            <ProdBanner title={selectedProduct?.productName} />
            <section className="product-page">
                <Container>
                    <Row className="justify-content-center">
                        <Col md={6}>
                            <img loading="lazy" src={selectedProduct?.imgUrl} alt="" />
                        </Col>
                        <Col md={6}>
                            <h2>{selectedProduct?.productName}</h2>
                            <div className="info">
                                <span className="price">${selectedProduct?.price}</span>
                            </div>
                            <p>{selectedProduct?.shortDesc}</p>
                            <p>category: {selectedProduct?.category}</p>
                            <input className="qty-input" type="number" placeholder="Qty" value={quantity} onChange={handleQuantityChange} />
                            <br />
                            <button type="submit" className="add" onClick={() => handleAdd(selectedProduct, quantity)}>Add To Cart</button>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section>
                <Container>
                    <h3> Description</h3>
                    <p>{selectedProduct?.description}</p>
                </Container>
            </section>
        </Fragment>
    );
}

export default ProductDetails;