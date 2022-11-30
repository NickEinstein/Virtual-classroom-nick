import ShoppingCart from "../component/cart/Cart";

export default function Cart() {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5 ">
        <div className="col-md-10 col-lg-10 col-xs-12">
          <ShoppingCart />
        </div>
      </div>
    </div>
  );
}