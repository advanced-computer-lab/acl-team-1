import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import { Switch } from "react-router";
import "./App.css";
import React, { useState, useEffect } from "react";


import ResetPassword from "./Components/ResetPassword";

import ResetPasswordPage from "./Pages/ResetPasswordPage"
import LoginPage from "./Pages/LoginPage";


function App(){
  return(
    <div>
      <BrowserRouter>
        <Routes>
      <Route exact path = "/" component = {LoginPage} />
      <Route exact path = "/login" component = {LoginPage} />
      <Route exact path = "/resetpasswordlogin" component = {ResetPasswordPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App; 

