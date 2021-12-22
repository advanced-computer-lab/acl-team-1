import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import backendlink from "../LinkToBackend"
import { useNavigate } from "react-router-dom";
import Token_Secret from "../devToken";
import "../Stylesheets/Login.css"; 
const jwt = require("jsonwebtoken");
require ("dotenv").config();

export default function Login(props){
    const history = useNavigate();
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [re, setRe] = useState("");

    const handleLogin = async () => {
        await axios ({
            method: "post",
            url: '${process.env.REACT_APP_URL}/login',

            data: {
                email: Email,
                password: Password,
            }
            
        }).then((res) =>{
            console.log(res.data);
            if (res.data == "Please reset your password" && res.status == 200) {
                localStorage.setItem("token", res.headers.token);
                setErr("Please reset your password");
              } else {
                if (res.data == "user not found") {
                  console.log("here");
                  setErrEmail("Wrong Email");
                } else if (res.data == "Wrong password") {
                  setErrPassword("Wrong Password");
                } else {
                  const result = jwt.verify(
                    res.headers.token,
                    Token_Secret.Token_Secret
                  );
                if(result){
                    localStorage.setItem("token", res.headers.token);

                    let type = result.type;
                    switch(type){
                        case "guest":
                            history.push("/guest");
                            break;
                        case "admin":
                            history.push("/admin");
                            break;
                        default:
                        break;
                    }
                }
            }
            }
        });
    };

        const resetButton = async () => {
            if (err = "Please reset your password")
            history.push("/resetpasswordlogin");
        };

    return(
        <div className="login">
      <Row className="LoginImageRow">
      </Row>

      <Form.Group as={Row} controlId="formBasicEmail">
        <Form.Label className="LoginLabel">Email address</Form.Label>
        <Col xs={5} className="LogintextBoxCol">
          <Form.Control
            type="email"
            placeholder="Enter email"
            className="LoginTextBox"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrEmail();
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errEmail}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="formBasicPassword">
        <Form.Label className="LoginLabel">Password</Form.Label>
        <Col xs={5} className="LogintextBoxCol">
          <Form.Control
            type="password"
            placeholder="Password"
            className="LoginTextBox"
            value={Password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrPassword();
            }}
          />
          <Form.Control.Feedback type="invalid">
            {errPassword}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Col className="LoginButtonCol ">
        <Button
          variant="dark "
          size="LoginButton"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </Button>
        <Form.Control.Feedback type="invalid">{err}</Form.Control.Feedback>
      </Col>
      <Col className="LoginButtonCol ">
        <Button
          variant="dark "
          size="resetLoginButton"
          type="submit"
          onClick={resetButton}
        >
          Reset Password
        </Button>
      </Col>
    </div>
  );
}