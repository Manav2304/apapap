import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PaymentForm from "./donation/PaymentForm";
import {DonationPage} from "./donation";
import { routes } from "./routes";

const App: React.FunctionComponent = () => {
  const handlePaymentSuccess = () => {
    // Handle payment success logic here
    console.log("Payment success!");
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route />
        {/* <Route
          path="/donation/Paymentfrom"
          element={<PaymentForm onPaymentSuccess={handlePaymentSuccess} />}
        /> */}
             <Route
            caseSensitive
            path={routes.donation}
            element={<DonationPage />}
          />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
