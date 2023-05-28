import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';

import { useAuth } from "../context/Auth";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const { user, setUser } = useAuth();
  const [submitError, setSubmitError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    }
  });

  const onSubmit = useCallback(
    (data) => {
      axios.post('http://localhost:3002/api/auth/login', {
        username: data.username,
        password: data.password
      })
        .then(function (response) {
          console.log(response);
          localStorage.setItem("socket_rooms_user", JSON.stringify(
            {
              id: response.data.userId,
              token: response.data.token,
              username: response.data.username,
            }
          ));
          setUser({
            id: response.data.userId,
            token: response.data.token,
            username: response.data.username,
          })
        })
        .catch(function (error) {
          setSubmitError(error.response.data.message || error.message)
        });
    },
  );

  // useEffect(() => {
  //   if (user) {
  //     navigate("/");
  //   }
  // }, [user])


  return (
    <>
      <p>Connexion</p>
      <Form onSubmit={handleSubmit((onSubmit))} >
        <Form.Group className="mb-3">
          <Form.Label>Nom d'utilisateur</Form.Label>
          <Form.Control {...register("username", {
            required: "Veuillez insérer un nom d'utilisateur"
          })}
            placeholder="Nom d'utilisateur"
          />
          <Form.Text className="text-danger">
            {errors.username?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control {...register(
            "password",
            {
              required: "Veuillez insérer un mot de passe"
            })}
            type='password'
            placeholder="Mot de passe"
          />
          <Form.Text className="text-danger">
            {errors.password?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Text className="text-danger">
            {submitError}
          </Form.Text>
          <Button type="submit">Connexion</Button>
        </Form.Group >
      </Form >
    </>
  );
};

export default Login;
