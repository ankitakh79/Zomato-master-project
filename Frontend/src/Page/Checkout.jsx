import React from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import Razorpay from "razorpay";

//  components
import FoodItem from "../Components/Cart/FoodItem";
import AddressList from "../Components/Checkout/AddessList";

// redux action
import { createOrder } from "../Redux/Reducer/Order/order.action";

const Checkout = () => {
  const reduxStateCart = useSelector((global) => global.cart?.cart);
  const reduxStateUser = useSelector((global) => global.user.user.user);
  const dispatch = useDispatch();

  const address = [
    {
      name: "Home",
      address: "India",
    },
    {
      name: "Gym",
      address: "India",
    },
    {
      name: "Office",
      address: "India",
    },
  ];

  const payNow = () => {
    let options = {
      Key: "rzp_test_cY0KqHvb8Afe8c",
      amount:
        reduxStateCart.reduce((acc, curVal) => acc + curVal.totalPrice, 0) *
        100,
      currency: "INR",
      name: "zomato Clone",
      description: "Unfortunately we can afford to give you a free food. ",
      image:
        "https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png",
      handler: () => {
        alert("Payment Done");
      },
      prefill: {
        name: reduxStateUser.fullname,
        email: reduxStateUser.email,
      },
      theme: { color: "#e23744" },
    };
    let razorPay = new window.Razorpay(options);
    razorPay.open();
  };

  return (
    <div className="my-3 flex flex-col gap-3 items-center">
      <h1 className="text-xl text-center md:text-2xl font-bold">Checkout</h1>
      <div className="w-full md:w-3/5 rounded-lg py-3 shadow-lg bg-whiteflex flex-col items-center">
        <h3 className="text-lg font-semibold">Summary</h3>
        <div className="flex w-full flex-col gap-2 items-center">
          <h5 className="text-base tracking-wider">ORDER FROM</h5>
          <div className="flex w-full flex-col items-center text-gray-400">
            <h4>Domino's Pizza</h4>
            <small>GT World Mall, Magadi Road, Bangalore</small>
          </div>
          <div className="my-4 px-4 flex-col gap-2 w-full md:w-3/5">
            {reduxStateCart.map((food) => (
              <FoodItem key={food._id} {...food} />
            ))}
          </div>
          <div className="flex-col gap-3 w-full md:w-3/5">
            <h4 className="text-xl font-semibold">choose Address</h4>
            <AddressList address={address} />
          </div>
          <button
            onClick={payNow}
            className="flex items-center gap-2 justify-center my-4 md:my-8 w-full px-4 md:w-4/5 md:px-0 h-14 text-white font-medium text-lg bg-zomato-400 rounded-lg"
          >
            Pay Securely <BsFillShieldLockFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;