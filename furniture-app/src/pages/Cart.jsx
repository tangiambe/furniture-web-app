import { useContext, useEffect } from "react"
import { DataContainer } from "../App"
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Cart = () => {
  const { CartItem, setCartItem, addToCart, decreaseQty, deleteProduct } = useContext(DataContainer);
  const totalPrice = CartItem.reduce((price, item) => price + item.qty * item.price, 0)
  useEffect(() => {
    window.scrollTo(0, 0);
    if (CartItem.length === 0) {
      const storedCart = localStorage.getItem("cartItem");
      setCartItem(JSON.parse(storedCart));
    }
    //eslint-disable-next-line
  }, [])

  let shipping = 5.0;

  return (
    <section className='cart-items'>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            {CartItem.length === 0 && <h1 className='no-items product'>No Items in Cart!</h1>}
            {CartItem.map((item) => {
              const productQty = item.price * item.qty
              return (
                <div className='cart-list' key={item.id}>
                  <Row>
                    <Col className="image-holder" sm={4} md={3}>
                      <img src={item.imgUrl} alt='' />
                    </Col>
                    <Col sm={8} md={9}>
                      <Row className="cart-content justify-content-center">
                        <Col xs={12} sm={9} className="cart-details">
                          <h3>{item.productName}</h3>
                          <h4>
                            ${item.price}.00 * {item.qty}
                            <span>${productQty}.00</span>
                          </h4>
                        </Col>
                        <Col xs={12} sm={3} className='cartControl'>
                          <button className='incCart' onClick={() => addToCart(item)}>
                            <i className='fa-solid fa-plus'></i>
                          </button>
                          <button className='desCart' onClick={() => decreaseQty(item)}>
                            <i className='fa-solid fa-minus'></i>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <button className="delete" onClick={() => deleteProduct(item)}>
                      <ion-icon name="close"></ion-icon>
                    </button>
                  </Row>
                </div>
              )
            })}
          </Col>

          <Col md={4}>
            <Card mb={4} >
              <div
                className="card-header py-3"
                style={{ backgroundColor: "#598d59", color: "#fff", paddingLeft: "150px" }}
              >
                <h5 className="mb-0">Order Summary</h5>
              </div>
              <div className="card-body">
                {CartItem.length === 0 ? (
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center  px-0 pb-3">
                      Subtotal
                      <span>${totalPrice}.00</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${totalPrice}.00</strong>
                      </span>
                    </li>
                  </ul>

                ) : (
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                      Subtotal
                      <span>${totalPrice}.00</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center px-0 pb-3">
                      Shipping
                      <span>${shipping}.00</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span>
                        <strong>${Math.round(totalPrice + shipping)}.00</strong>
                      </span>
                    </li>
                    <Link
                  to="#"
                  className="btn btn-lg btn-block"
                  style={{ marginTop: "20px", backgroundColor: "#598d59", color: "#fff" }}
                > Go to Checkout
                </Link>
                  </ul>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Cart
