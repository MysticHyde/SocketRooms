const socketCtrl = require('../controllers/socket')

function SocketRoutes(io) {
    this.io = io;
}

SocketRoutes.prototype.Route = function Route(socket, path, data) {
    const io = this.io;

    console.log('path', path);
    console.log('data', data);

    switch (path) {
        case "join chat":
            socketCtrl.joinRoom(io, socket, { ...data, new_room: data.room })
            socketCtrl.getMessages(io, socket, data)
            break;

        case "new message":
            socketCtrl.createMessage(io, socket, data)
            break;
        case "change room":
            socketCtrl.joinRoom(io, socket, data)
            socketCtrl.getMessages(io, socket, { ...data, room: data.new_room })
            break;

        default:
            break;
    }

};


module.exports = SocketRoutes;