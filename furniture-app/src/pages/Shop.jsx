import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import { Fragment, useContext, useEffect, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import ProdBanner from "../components/ProductBanner/ProdBanner";
import { DataContainer } from "../App";

const Shop = () => {
    const {addToCart} =useContext(DataContainer);
    const [filterList,setFilterList] = useState(products.filter(item => (item.category ==="sofa" || item.category ==="chair")));
    useEffect(()=> {
        window.scrollTo(0,0);
    },[])
    return ( 
        <Fragment>
            <ProdBanner title="Our Products"/>
            <section className="filter-bar">
                <Container className="filter-bar-contianer">
                    <Row className="justify-content-center">
                        <Col className="pb-5" md={2}>
                            <FilterSelect setFilterList={setFilterList}/>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <ShopList productItems={filterList} addToCart={addToCart}/>
                </Container>
            </section>
        </Fragment>
    );
}

export default Shop;