import { useEffect } from "react";
import Login from "../components/Login";
import Signin from "../components/Signin";
import { useState } from 'react';
import { Container, Form, Col, Row } from "react-bootstrap";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {

  const [isSelected, setIsSelected] = useState(true)
  const { user, setUser } = useAuth();
  const navigate = useNavigate();


  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user])

  return (
    <Container fluid>
      <Row>
        <Col xs={0} md={6}></Col>
        <Col xs={16} md={6}>
          <Row>

            <Col xs={12}>
              <form>
                <label>
                  <input name="form_selection"
                    type="radio"
                    value="signin"
                    checked={!isSelected && true}
                    onChange={() => setIsSelected(!isSelected)}
                  />
                </label>

                <label>
                  Connexion
                  <input name="form_selection"
                    type="radio"
                    value="login"
                    checked={isSelected && true}
                    // defaultChecked
                    onChange={() => setIsSelected(!isSelected)}
                  />
                </label>
              </form>
            </Col>

            <Col xs={12}>
              {
                isSelected ?
                  <Login />
                  :
                  <Signin isSelected={isSelected} setIsSelected={setIsSelected} />
              }
            </Col>



          </Row>



        </Col>
      </Row >

    </Container >
  );
};

export default LoginPage;





