import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { server } from "./server";

function App(): JSX.Element {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number>(0);

  const handlePaymentSuccess = async (response: any): Promise<void> => {
    try {
      const bodyData = new FormData();
      bodyData.append("response", JSON.stringify(response));

      await axios({
        url: `${server}/razorpay/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          setName("");
          setAmount(0);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const loadScript = (): void => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async (): Promise<void> => {
    const res = await loadScript();

    const bodyData = new FormData();
    bodyData.append("amount", amount.toString());
    bodyData.append("name", name);

    const data = await axios({
      url: `${server}/razorpay/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    const options = {
      key_id: process.env.REACT_APP_PUBLIC_KEY!,
      key_secret: process.env.REACT_APP_SECRET_KEY!,
      amount: data.data.payment.amount,
      currency: "INR",
      name: "ISKCON",
      description: "Test transaction",
      order_id: data.data.payment.id,
      handler: function (response: any): void {
        handlePaymentSuccess(response);
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="container" style={{ marginTop: "20vh" }}>
      <form>
        <h1>Payment page</h1>

        <div className="form-group">
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            value={amount === 0 ? "" : amount.toString()} // Convert the amount to a string for display
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>
      </form>
      <button onClick={showRazorpay} className="btn btn-primary btn-block">
        Pay with Razorpay
      </button>
    </div>
  );
}

export default App;
