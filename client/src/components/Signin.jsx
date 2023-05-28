import { useState, useCallback } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function Signin({isSelected, setIsSelected}) {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
            passwordconfirm: ""
        }
    });
    const [password, setPassword] = useState("")
    const [isCreated, setIsCreated] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const onSubmit = useCallback(
        (data) => {
            axios.post('http://localhost:3002/api/auth/signup', {
                username: data.username,
                password: data.password
            })
                .then(function (response) {
                    console.log(response);
                    setIsCreated(true)
                    setTimeout(() => {
                        setIsSelected(!isSelected)
                    }, 2000);

                })
                .catch(function (error) {
                    console.log(error);
                    setSubmitError(error.response.data.message || error.message )
                });
        },
    );

    return (
        <div>
            <h2>S'enregistrer</h2>
            {!isCreated ?
                <div>
                    <form onSubmit={handleSubmit((onSubmit))}>
                        <h3>SIGN IN</h3>
                        <input {...register("username", {
                            required: "Veuillez choisir un nom d'utilisateur", minLength: {
                                value: 4,
                                message: "Minimum 4 caractères"
                            }
                        })} placeholder="Nom d'utilisateur" />
                        <span>{errors.username?.message}</span>

                        <input {...register(
                            "password",
                            {
                                required: "Veuillez insérer un mot de passe",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 caractères"
                                }
                            })}
                            type='password'
                            placeholder="Mot de passe"
                            onChange={val => setPassword(val.target.value)}
                        />
                        <span>{errors.password?.message}</span>

                        <input {...register(
                            "passwordconfirm",
                            {
                                required: "Veuillez confirmer le mot de passe",
                                validate: (val) => {
                                    if (password !== val) {
                                        return "Le mot de passe ne correspond pas";
                                    }
                                },
                            }
                        )}
                            type='password'
                            placeholder="Confirmation du mot de passe"
                        />
                        <span>{errors.passwordconfirm?.message}</span>
                        <span>{submitError}</span>
                        <button type="submit">Inscription</button>
                    </form>
                </div>

                :
                <div>
                    <p>Votre compte est enregistré, veuillez vous connecter !</p>
                </div>
            }
        </div>
    )
}




