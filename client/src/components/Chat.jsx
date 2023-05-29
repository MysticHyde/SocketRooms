import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { useAuth } from "../context/Auth";
import { useSocket } from "../context/Socket";
import { Container, Col, Row, Form, Button, } from "react-bootstrap";
import EmojiPicker from 'emoji-picker-react';
import { useForm } from 'react-hook-form';



export default function Chat() {
    const { user, setUser } = useAuth();
    const socket = useSocket();
    let storage = localStorage.socket_rooms_user;
    storage = storage ? JSON.parse(storage) : null;

    const [currentRoom, setCurrentRoom] = useState(storage.room);
    const [roomChoice, setRoomChoice] = useState(storage.room);
    const [message, setMessage] = useState("");
    const [emoteMenu, setEmoteMenu] = useState(false);
    const containerRef = useRef(null)
    const textareaRef = useRef(null)

    const [usersMenu, setUsersMenu] = useState(false)
    const [roomsMenu, setRoomsMenu] = useState(true)

    const socketRequest = (url, data) => {
        if (!data) {
            data = {};
        }
        data = { ...data, token: user.token, username: user.username, room: currentRoom }
        socket.emit('request', url, data)
        console.log('new socket request', url, data);
    }


    useEffect(() => {
        if (roomChoice != currentRoom) {
            console.log(roomChoice);
            console.log(currentRoom);
            socketRequest('change room', { new_room: roomChoice })
            // storage = { ...storage, room: roomChoice }
            // localStorage.setItem("socket_rooms_user", JSON.stringify(storage))
            // setUser({ ...user, room: roomChoice })
            setCurrentRoom(roomChoice)
        }
    }, [roomChoice])


    useEffect(() => {
        console.log('message', message);
    }, [message])


    useEffect(() => {
        socketRequest('join chat', {})
    }, [])




    useEffect(() => {
        socket.on('response', (path, data) => {
            switch (path) {
                case 'new message':
                    let messageNode = createMessage(data);
                    if (containerRef.current != null) {
                        containerRef.current.appendChild(messageNode);
                    }
                    break;

                case 'all messages':
                    if (containerRef.current != null) {
                        containerRef.current.innerText = ""
                        data.map(element => {
                            let messageNode = createMessage(element)
                            containerRef.current.appendChild(messageNode);
                        })
                    }
                    break;

                case 'join room':
                    console.log('JOIN');
                    storage = { ...storage, room: roomChoice }
                    localStorage.setItem("socket_rooms_user", JSON.stringify(storage))
                    setUser({ ...user, room: roomChoice })
                    break;


                default:
                    break;
            }
        })

    }, [socket])


    function handleSubmit(e) {
        e.preventDefault();
        socketRequest('new message', { message: message })
    }



    function createMessage(data) {
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
        return messageParent;
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
                        <form>

                            <label>
                                Général
                                <input
                                    name="form_selection"
                                    type="radio"
                                    value="Général"
                                    checked={currentRoom === 'Général' && true}
                                    onChange={(e) => setRoomChoice(e.target.value)}
                                />
                            </label>

                            <label>
                                Salon 2
                                <input
                                    name="form_selection"
                                    type="radio"
                                    value="Salon 2"
                                    checked={currentRoom === "Salon 2" && true}
                                    onChange={(e) => setRoomChoice(e.target.value)}

                                />
                            </label>

                            <label>
                                Salon 3
                                <input
                                    name="form_selection"
                                    type="radio"
                                    value="Salon 3"
                                    checked={currentRoom === "Salon 3" && true}
                                    onChange={(e) => setRoomChoice(e.target.value)}
                                />
                            </label>

                        </form>
                    </div>
                    <button className='icon' onClick={() => setRoomsMenu(!roomsMenu)}>💬</button>
                </div>
            </div>

            <Row>
                <Col xs={12}>
                    <ul className='chat_messages w-100' ref={containerRef}></ul>

                </Col>

                <Col xs={12} className='chat_form fixed-bottom'>
                    <Form onSubmit={e => handleSubmit(e)}>
                        <EmojiPicker
                            width="100%"
                            height={emoteMenu ? '450px' : '0px'}

                            onEmojiClick={e => handleEmojiCLick(e.emoji)}
                        />
                        <textarea
                            className='w-100'
                            ref={textareaRef}
                            placeholder='Entrez votre message'
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
