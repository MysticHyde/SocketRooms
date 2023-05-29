require('dotenv').config();
const pool = require('../utils/db');

exports.createMessage = (io, socket, data) => {
    console.log(data);
    pool.promise().query('INSERT INTO `messages` (`username`, `message`, room) VALUES (?,?,?)',
        [
            data.username,
            data.message,
            data.room
        ]
    )
        .then(() => {
            console.log(`nouveau message enregistré (${data.username})`)
            io.emit('response', 'new message', data)
        })
        .catch((error) => {
            console.log('erreur enregistrement message')
            console.log(error);
        })
}



exports.getMessages = (io, socket, data) => {
    console.log('data', data);
    pool.promise().query(`SELECT * FROM messages WHERE room = '${data.room}'`)
        .then(([rows, fields]) => {
            io.to(socket.id).emit('response', 'all messages', rows)
        })
        .catch((error) => {
            console.log('erreur obtention des messages' + error)
        })
}



exports.joinRoom = (io, socket, data) => {
    if (data.room) {
        socket.leave(data.room)
    }
    socket.join(data.new_room)
    io.to(socket.id).emit('response', 'join room', { room: data.new_room })

}