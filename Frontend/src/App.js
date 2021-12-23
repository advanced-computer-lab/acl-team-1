import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import axios from "axios";

import Header from "./Components/Header";
import Home from "./Components/Home";
import SignIn from "./Components/SignIn";
import SignUp from "./Components/SignUp";
import BookFlight from "./Components/BookFlight";
import MyBookings from "./Components/MyBooking";
import Bookings from "./Components/Bookings";
import Flights from "./Components/Flights";
import Payments from "./Components/Payments";
import SuccessPage from "./Components/SuccessorPage";
import CancelPage from "./Components/CancelPage";
import States from "./States";

import auth from "./Components/auth";
import adminGuard from "./Components/adminGuard";


const jwtToken = localStorage.getItem("JWT_Token");
const authHeader = "Bearer" + jwtToken;
console.log(authHeader);

axios.defaults.headers.common["Authorization"] = authHeader;


function App(){
  return (
    <Provider
      store={createStore(
        States,
        {
          auth: {
            isAuthenticated: jwtToken ? true : false,
            token: jwtToken,
          },
        },
        applyMiddleware(reduxThunk)
      )}
    >
      <BrowserRouter>
        <div>
          <Header />
          <Route path="/" exact strict component={Home} />
          <div className="container">
            <Route
              path="/flights"
              exact
              strict
              component={adminGuard(Flights)}
            />

            <Route
              path="/bookings"
              exact
              strict
              component={adminGuard(Bookings)}
            />
            <Route
              path="/book"
              exact
              strict
              component={auth(BookFlight)}
            />
            <Route
              path="/payments"
              exact
              strict
              component={auth(Payments)}
            />
            <Route
              path="/successpage"
              exact
              strict
              component={auth(SuccessPage)}
            />
            <Route
              path="/cancelpage"
              exact
              strict
              component={auth(CancelPage)}
            />
            <Route path="/signup" exact strict component={SignUp} />
            <Route path="/signin" exact strict component={SignIn} />
            <Route
              path="/mybookings"
              exact
              strict
              component={auth(MyBookings)}
            />
          </div>
          {/* </Header> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App; 

