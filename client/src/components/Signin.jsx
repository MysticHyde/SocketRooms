import { useState, useCallback } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Col, Form, Button } from 'react-bootstrap';

export default function Signin({ isSelected, setIsSelected }) {

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
    const [accountCreated, setAccountCreated] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const onSubmit = useCallback(
        (data) => {
            axios.post('http://localhost:3002/api/auth/signup', {
                username: data.username,
                password: data.password
            })
                .then(function (response) {
                    console.log(response);
                    setAccountCreated(true)
                    setTimeout(() => {
                        setIsSelected(!isSelected)
                    }, 2000);

                })
                .catch(function (error) {
                    console.log(error);
                    setSubmitError(error.response.data.message || error.message)
                });
        },
    );

    return (
        <>
            <p>Inscription</p>
            {!accountCreated ?
                <Form onSubmit={handleSubmit((onSubmit))}>
                    <Form.Group className="mb-3">
                        <Form.Label>Nom d'utilisateur</Form.Label>
                        <Form.Control {...register("username", {
                            required: "Veuillez choisir un nom d'utilisateur", minLength: {
                                value: 4,
                                message: "Minimum 4 caractères"
                            }
                        })}
                            placeholder="Nom d'utilisateur" />
                        <Form.Text className="text-danger">
                            {errors.username?.message}
                        </Form.Text>

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control {...register(
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
                        <Form.Text className="text-danger">
                            {errors.password?.message}
                        </Form.Text>
                        <Form.Control {...register(
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
                        <Form.Text className="text-danger">
                            {errors.passwordconfirm?.message}
                        </Form.Text>


                    </Form.Group>
                    <Form.Group>
                        <Form.Text className="text-danger">
                            {submitError}
                        </Form.Text>
                        <Button type="submit">Inscription</Button>

                    </Form.Group>


                </Form>
                :
                <Col xs={12}>
                    <p className='text-center'>Votre compte est enregistré, veuillez vous connecter !</p>
                </Col>
            }
        </>
    )
}




