import { useState ,createContext, useEffect, lazy, Suspense } from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import NavBar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";
import "react-toastify/dist/ReactToastify.css";
const Home =lazy(()=> import("./pages/Home"))
const Shop =lazy(()=> import("./pages/Shop"))
const Cart =lazy(()=> import("./pages/Cart"))
const ProductDetails =lazy(()=> import("./pages/ProductDetails"));
export const DataContainer = createContext();
function App() {
  const [CartItem, setCartItem] = useState([])
  const [selectedProduct,setSelectedProduct]=useState(null);

  const addToCart = (product,num=1) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit) {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty + num } : item)))
    } else {
      setCartItem([...CartItem, { ...product, qty: num }])
    }
  }

  const decreaseQty = (product) => {
    const productExit = CartItem.find((item) => item.id === product.id)
    if (productExit.qty === 1) {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
    }
    else {
      setCartItem(CartItem.map((item) => (item.id === product.id ? { ...productExit, qty: productExit.qty - 1 } : item)))
    }
  }

  const deleteProduct = (product)=> {
      setCartItem(CartItem.filter((item) => item.id !== product.id))
  }
  useEffect(()=> {
      localStorage.setItem("cartItem",JSON.stringify(CartItem));
  },[CartItem])
  return (
    <DataContainer.Provider value={{CartItem,setCartItem,addToCart,decreaseQty,deleteProduct,selectedProduct,setSelectedProduct}}>
      <Suspense fallback={<Loader/>}>
        <Router>
          <NavBar/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/shop' element={<Shop/>}/>
            <Route path='/shop/:id' element={<ProductDetails/>}/>
            <Route path='/cart' element={<Cart/>}/>
          </Routes>
        </Router>
      </Suspense>
    </DataContainer.Provider>
  )
}

export default App
