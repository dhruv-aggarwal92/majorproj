//recive a connection request 
module.exports.chatSockets = function(socketServer){
    // let io = require('socket.io')(socketServer)
    var io = require('socket.io')(socketServer, {
        cors: {
          origin: '*',
        }
    })     //we need to write this cors in new version
    io.sockets.on('connection', function(socket){        //fires from client file io.connect()
        console.log('new connection recived', socket.id)

        socket.on('disconnect', function(){
            console.log('socket disconnected!')
        })

        socket.on('join_room', function(data){
            console.log('joining request rec', data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        })

        //detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('recive_message',data);
        })
    });     
}