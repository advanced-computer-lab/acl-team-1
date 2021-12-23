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
import SuccessorPage from "./Components/SuccessorPage";
import CancelPage from "./Components/CancelPage";
import states from "./States";

import authGuard from "./Components/auth";
import adminGuard from "./Components/adminGuard";

const jwtToken = localStorage.getItem("JWT_TOKEN");
const authHeader = "Bearer " + jwtToken;
console.log(authHeader);

axios.defaults.headers.common["Authorization"] = authHeader;

function App() {
  return (
    <Provider
      store={createStore(
        states,
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
              component={authGuard(BookFlight)}
            />
            <Route
              path="/payments"
              exact
              strict
              component={authGuard(Payments)}
            />
            <Route
              path="/successpage"
              exact
              strict
              component={authGuard(SuccessorPage)}
            />
            <Route
              path="/cancelpage"
              exact
              strict
              component={authGuard(CancelPage)}
            />
            <Route path="/signup" exact strict component={SignUp} />
            <Route path="/signin" exact strict component={SignIn} />
            <Route
              path="/mybookings"
              exact
              strict
              component={authGuard(MyBookings)}
            />
          </div>
          {/* </Header> */}
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
