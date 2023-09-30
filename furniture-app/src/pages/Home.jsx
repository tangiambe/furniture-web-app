import { Fragment, useContext, useEffect } from "react"
import Section from "../components/Section"
import { products } from "../utils/products"
import { DataContainer } from "../App"
import SliderHome from "../components/HomeSliderCard/Slider"

const Home = () => {
  const {addToCart} =useContext(DataContainer);
  const allProducts = products.filter(item => item.category ==="sofa" || item.category ==="chair");
  useEffect(()=> {
    window.scrollTo(0,0);
  },[])
  return (
    <Fragment>
      <SliderHome/>
      <hr className="divider"/>
      <Section title="Products" productItems={allProducts} addToCart={addToCart}/>
    </Fragment>
  )
}

export default Home
