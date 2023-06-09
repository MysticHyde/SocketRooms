require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const pool = require('./utils/db');
const Routes = require('./routes/socket');

const server = http.createServer(app);
io = new Server(server, {
    cors: {
        origin: `http://localhost:3000`
    },
});
var socketRoutes = new Routes(io);


const PORT = process.env.PORT || 3000;
var users = [];

app.set('port', PORT);


function addUser(id, username, token) {
    users.push({
        id: id,
        username: username,
        token: token
    });
}
function removeUser(id) {
    let newUsers = [];
    users.map((user) => {
        if (user.id !== id) {
            newUsers.push(user);
        }
        users = newUsers;
    });
}
// function editUser(userId, room) {
//     let newUsers = [];
//     users.map((user) => {
//         if (user.userId === userId) {
//             newUsers.push({ ...user, room: room });
//         } else {
//             newUsers.push(user);
//         }
//         users = newUsers;
//     });
// }

io.on("connection", (socket) => {

    console.log(`Connexion d'un utilisateur (${socket.id})`);

    addUser(socket.id, socket.handshake.query.x)

    socket.on('request', (path, data) => {
        socketRoutes.Route(socket, path, data);
    })
        // switch (path) {

        //     case 'join room':
        //         socket.leave(data.current_room);
        //         socket.join(data.new_room);

        //         editUser(socket.id, data.username, data.new_room);

        //         socket.in(data.new_room).emit('from server', 'server message', {
        //             message: `${data.username} vient de rejoindre le salon.`
        //         })

        //         pool.promise().query(`SELECT * FROM messages WHERE room = '${data.new_room}'`)
        //             .then(([rows, fields]) => {
        //                 console.log(rows);
        //                 io.in(data.new_room).emit('from server', 'room messages', rows)
        //             })
        //             .catch(
        //                 console.log('erreur obtention des messages')
        //                 )
        //                 break;

        // case 'new message':
        //     console.log(data);
        //     pool.promise().query('INSERT INTO `messages` (`username`, `message`, room) VALUES (?,?,?)',
        //         [
        //             data.username,
        //             data.message,
        //             data.room
        //         ]
        //     )
        //         .then(() => {
        //             io.in(data.room).emit('from server', 'new message', data)
        //         })
        //         .catch(console.log('erreur enregistrement message'))
        //     break;


        // default:
        //     break;
    // }

socket.on("disconnect", () => {

    removeUser(socket.id)

    // users.map((user) => {
    //     console.log(user);
    // });


    // socket.in(data.new_room).emit('from server', 'server message', {
    //     message: `${data.username} vient de quitter le salon.`
    // })
})

});

server.listen(PORT, () => {
    console.log(`server is running on ${PORT}`)
});