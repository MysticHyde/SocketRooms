import { useEffect, useLayoutEffect, useState, useRef } from 'react';
import { useAuth } from "../context/Auth";
import { useSocket } from "../context/Socket";


export default function Chat() {
    const { user, setUser } = useAuth();
    const socket = useSocket();
    const [currentRoom, setCurrentRoom] = useState(null);
    const [roomChoice, setRoomChoice] = useState("Général");
    const [message, setMessage] = useState("");
    const containerRef = useRef(null)
    // const [isLoading, setisLoading] = useState(false)


    // useLayoutEffect(() => {
    //     // if (roomChoice !== currentRoom) {
    //     socket.emit('from client', 'join room', {
    //         username: user.username,
    //         current_room: currentRoom,
    //         new_room: roomChoice
    //     })
    //     setCurrentRoom(roomChoice)
    //     clearChat()
    //     // }
    // }, [])

    useEffect(() => {
        // if (roomChoice !== currentRoom) {
        socket.emit('from client', 'join room', {
            username: user.username,
            current_room: currentRoom,
            new_room: roomChoice
        })
        setCurrentRoom(roomChoice)
        clearChat()
        // }
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

                    break;

                default:
                    break;
            }
        })

    }, [socket])




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
            }
            messageText.innerText = data.message;
            messageParent.appendChild(messageText)
            containerRef.current.appendChild(messageParent);
        }
    }

    function clearChat() {
        containerRef.current.innerText = ''
    }


    function handleSubmit(e) {
        e.preventDefault();

        socket.emit('from client', 'new message', {
            username: user.username,
            message: message,
            room: currentRoom
        })

    }


    return (
        <div>
            <div>
                <h4>Utilisateurs</h4>
            </div>
            <div>
                <h4>Salons disponibles</h4>
                <form>
                    <label>
                        Général
                        <input name="form_selection"
                            type="radio"
                            value="Général"
                            checked={currentRoom === 'Général' && true}
                            onChange={(e) => setRoomChoice(e.target.value)}
                        />
                    </label>

                    <label>
                        Salon 2
                        <input name="form_selection"
                            type="radio"
                            value="Salon 2"
                            checked={currentRoom === "Salon 2" && true}
                            onChange={(e) => setRoomChoice(e.target.value)}

                        />
                    </label>
                    <label>
                        Salon 3
                        <input name="form_selection"
                            type="radio"
                            value="Salon 3"
                            checked={currentRoom === "Salon 3" && true}
                            onChange={(e) => setRoomChoice(e.target.value)}
                        />
                    </label>
                </form>
            </div>

            <ul ref={containerRef}>
            </ul>

            <form onSubmit={e => handleSubmit(e)}>
                <textarea placeholder='Entrez votre message'
                    onChange={e => setMessage(e.target.value)}
                    value={message}
                >

                </textarea>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    )
}
