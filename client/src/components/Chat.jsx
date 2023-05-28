import { useEffect, useState, useRef } from 'react';
import { useAuth } from "../context/Auth";
import { useSocket } from "../context/Socket";
import { Container, Col, Row, Form, Button, } from "react-bootstrap";
import EmojiPicker from 'emoji-picker-react';
import { useForm } from 'react-hook-form';



export default function Chat() {
    const { user, setUser } = useAuth();
    const socket = useSocket();
    const [currentRoom, setCurrentRoom] = useState(null);
    const [roomChoice, setRoomChoice] = useState("Général");
    const [message, setMessage] = useState("");
    const [emoteMenu, setEmoteMenu] = useState(false);
    const containerRef = useRef(null)
    const textareaRef = useRef(null)

    const [usersMenu, setUsersMenu] = useState(false)
    const [roomsMenu, setRoomsMenu] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    console.log(errors);


    useEffect(() => {
        if (roomChoice !== currentRoom) {
            socket.emit('from client', 'join room', {
                username: user.username,
                current_room: currentRoom,
                new_room: roomChoice
            })
            setCurrentRoom(roomChoice)
            clearChat()
        }
    }, [roomChoice])



    useEffect(() => {
        socket.on('from server', (path, data) => {
            switch (path) {
                case 'new message':
                    addMessage(data)
                    break;

                case 'room messages':
                    console.log(data);
                    data.map(element => {
                        addMessage(element)
                    });

                case 'server message':
                    addMessage(data)
                    break;
                case 'hello':
                    console.log(data);
                    break;

                default:
                    break;
            }
        })

    }, [socket])


    function onSubmit(data) {
        console.log(data);

        socket.emit('from client', 'new message', {
            username: user.username,
            message: message,
            room: currentRoom
        })
    }


    function addMessage(data) {
        if (containerRef.current != null) {
            if (!data.message) {
                return;
            }
            let messageParent = document.createElement("li");
            let messageText = document.createElement("p");
            let messageUsername = document.createElement("span");

            if (data.username) {
                if (data.username === user.username) {
                    messageParent.classList.add('self')
                }
                messageUsername.innerText = data.username;
                messageParent.appendChild(messageUsername)
            } else {
                messageParent.classList.add('server')
            }
            messageText.innerText = data.message;
            messageParent.appendChild(messageText)
            containerRef.current.appendChild(messageParent);
        }
    }

    function clearChat() {
        containerRef.current.innerText = ''
    }


    // function handleSubmit(e) {
    //     e.preventDefault();

    //     socket.emit('from client', 'new message', {
    //         username: user.username,
    //         message: message,
    //         room: currentRoom
    //     })
    // }

    function handleEmojiCLick(e) {
        let currentMessage = message;
        currentMessage = currentMessage + e;
        setMessage(currentMessage)

    }


    return (
        <Container fluid className='position-relative'>

            <div className='chat_buttons position-absolute '>
                <div className='users' style={{ maxWidth: usersMenu ? 700 : 0 }}>
                    <div className="content" style={{ padding: usersMenu ? "15px 30px 15px 20px" : "15px 0px 0px 20px" }}>
                        <h4>Utilisateurs</h4>
                        <ul>
                            <li>MysticHyde</li>
                            <li>MysticHyde2</li>
                            <li>Ali</li>
                            <li>MysticHyde234</li>
                        </ul>
                    </div>
                    <button className='icon' onClick={() => setUsersMenu(!usersMenu)} >👥</button>
                </div>
                <div className='rooms' style={{ maxWidth: roomsMenu ? 700 : 0 }}>
                    <div className="content" style={{ padding: roomsMenu ? "15px 30px 15px 20px" : "15px 0px 0px 20px" }}>
                        <h4>Salons</h4>
                        <Form>
                            <Form.Group>
                                <Form.Label>
                                    Général
                                    <input
                                        className='d-none'
                                        name="form_selection"
                                        type="radio"
                                        value="Général"
                                        checked={currentRoom === 'Général' && true}
                                        onChange={(e) => setRoomChoice(e.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>
                                    Salon 2
                                    <input
                                        className='d-none'
                                        name="form_selection"
                                        type="radio"
                                        value="Salon 2"
                                        checked={currentRoom === "Salon 2" && true}
                                        onChange={(e) => setRoomChoice(e.target.value)}

                                    />
                                </Form.Label>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>
                                    Salon 3
                                    <input
                                        className='d-none'
                                        name="form_selection"
                                        type="radio"
                                        value="Salon 3"
                                        checked={currentRoom === "Salon 3" && true}
                                        onChange={(e) => setRoomChoice(e.target.value)}
                                    />
                                </Form.Label>
                            </Form.Group>
                        </Form>
                    </div>
                    <button className='icon' onClick={() => setRoomsMenu(!roomsMenu)}>💬</button>
                </div>
            </div>

            <Row>
                <Col xs={12} className='fixed-bottom'>
                    <ul className='chat_messages w-100' ref={containerRef}></ul>

                </Col>

                <Col xs={12} className='chat_form fixed-bottom'>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <EmojiPicker
                            width="100%"
                            height={emoteMenu ? '450px' : '0px'}

                            onEmojiClick={e => handleEmojiCLick(e.emoji)}
                        />
                        {/* <textarea
                            className='w-100'
                            placeholder='Entrez votre message'
                            onChange={e => setMessage(e.target.value)}
                            value={message}
                            ref={textareaRef}
                        /> */}
                        <textarea {...register("message", {

                        })}
                            className='w-100'
                            ref={textareaRef}
                            value={message}
                            onChange={e => setMessage(e.target.value)} />

                        <Button onClick={() => setEmoteMenu(!emoteMenu)}>🙂</Button>
                        <Button type="submit">Envoyer</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
