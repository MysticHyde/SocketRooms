import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';

import { useAuth } from "../context/Auth";

const Login = () => {
  const { user, setUser } = useAuth();
  const [submitError, setSubmitError] = useState('')
  const navigate = useNavigate();

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
          setUser(  { 
            id: response.data.userId,
            token: response.data.token,
            username: response.data.username,
          })
        })
        .catch(function (error) {
          setSubmitError(error.response.data.message || error.message )
        });
    },
  );

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user])

  //   const onSubmit = (data) => {
  // console.log(data);
  // }


  return (
    <>
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit((onSubmit))}>
        <input {...register("username", {
          required: "Nom d'utilisateur"
        })}
          placeholder="Nom d'utilisateur"
        />
        <span>{errors.username?.message}</span>

        <input {...register(
          "password",
          {
            required: "Veuillez insérer un mot de passe"
          })}
          type='password'
          placeholder="Mot de passe"
        />
        <span>{errors.password?.message}</span>
        <span>{submitError}</span>
        <button type="submit">Connexion</button>
      </form>
    </>
  );
};

export default Login;
