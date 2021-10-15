import React, { useState, useEffect } from "react";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdArrowDropright,
} from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";

//  component
import FoodItem from "./FoodItem";

// redux action
import { getCart } from "../../Redux/Reducer/Cart/Cart.action";

const CartSM = ({ toggle }) => {
  const reduxState = useSelector((global) => global.cart?.cart);
  const history = useHistory();

  const continueToCheckout = () => history.push("/checkout/orders");

  return (
    <>
      <div className="md:hidden flex items-center justify-between">
        <div className="flex flex-col items-start">
          <small className="flex items-center gap-1" onClick={toggle}>
            {reduxState.length} Item <IoMdArrowDropup />
          </small>
          <h4>
            ₹{reduxState.reduce((acc, curVal) => acc + curVal.totalPrice, 0)}
            <sub>(plus tax)</sub>
          </h4>
        </div>
        <button onClick={continueToCheckout} className="flex items-center gap-1 text-white bg-zomato-400 px-3 py-1 rounded-lg">
          Continue <IoMdArrowDropright />
        </button>
      </div>
    </>
  );
};

const CartLG = ({ toggle }) => {
  const reduxState = useSelector((global) => global.cart?.cart);
    const history = useHistory();

    const continueToCheckout = () => history.push("/checkout/orders");

  return (
    <>
      <div className="hidden md:flex items-center justify-between container px-20 mx-auto">
        <div className="flex gap-2 text-xl items-start">
          <span
            className="border bg-white border-gray-300 p-1 rounded"
            onClick={toggle}
          >
            <IoMdArrowDropup />
          </span>
          <h4>Your Orders({reduxState.length})</h4>
        </div>
        <div className="flex items-center gap-1">
          <h4 className="flex items-center gap-2">
            Subtotal:₹
            {reduxState.reduce((acc, curVal) => acc + curVal.totalPrice, 0)}
          </h4>
          <button onClick={continueToCheckout} className="flex items-center text-lg h-10 font-light gap-1 text-white bg-zomato-400 px-3 py-1 rounded-lg">
            Continue <IoMdArrowDropright />
          </button>
        </div>
      </div>
    </>
  );
};

// wait
// gotcha? login yes and signup okay
const CartContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartData, setCartData] = useState([]);

  const dispatch = useDispatch();
  const reduxState = useSelector((global) => global.cart?.cart);

  const toggleCart = () => setIsOpen((prev) => !prev);
  const closeCart = () => setIsOpen(false);

  return (
    <>
      {reduxState.length && (
        <>
          {isOpen && (
            <div className="fixed w-full overflow-y-scroll h-48 bg-white z-10 p-2 bottom-16 px-3">
              <div className="flex items-center justify-between md:p-10">
                <h3 className="text-xl font-semibold">Your Orders</h3>
                <RiCloseFill onClick={closeCart} />
              </div>
              <hr className="my-2" />

              <div className=" flex flex-col gap-2 md:px-10">
                {reduxState.map((food) => (
                  <FoodItem key={food._id} {...food}/>
                ))}
              </div>
            </div>
          )}
          <div className="fixed w-full bg-white z-10 px-3 p-2 bottom-0">
            <CartSM toggle={toggleCart} />
            <CartLG toggle={toggleCart} />
          </div>
        </>
      )}
    </>
  );
};

export default CartContainer;