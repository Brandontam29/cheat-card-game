import lobbyCodeGenerator from '../utils/lobbyCodeGenerator.js';
import formatMessage from '../utils/formatMessage.js';
import { userJoin, userLeave, getRoomUsers } from '../storage/users.js';

const lobbyHandlers = (io, socket) => {
    const botName = 'Mr. BS';

    const createLobby = (name, avatar) => {
        console.log('createLobby');
        const code = `${lobbyCodeGenerator()}`;
        const user = userJoin(socket.id, name, avatar, code);
        socket.join(code);
        io.in(code).emit('update_players', getRoomUsers(code));
        socket.emit('created_lobby', code);
    };

    const joinLobby = (name, avatar, lobby) => {
        console.log('lobby:join');
        const user = userJoin(socket.id, name, avatar, lobby);
        socket.join(lobby);

        io.in(user.lobby).emit('update_players', getRoomUsers(user.lobby));
        socket.emit('joined_lobby', lobby);
        io.in(user.lobby).emit(
            'new_message',
            formatMessage(botName, `${user.name} has joined the chat`),
        );
    };

    const disconnectLobby = () => {
        console.log('disconnectLobby');
        const user = userLeave(socket.id);

        if (user) {
            io.in(user.lobby).emit(
                'new_message',
                formatMessage(botName, `${user.name} has left the chat`),
            );

            // Send users and lobby info
            io.in(user.lobby).emit('update_players', getRoomUsers(user.lobby));
        }
    };

    socket.on('lobby:create', createLobby);
    socket.on('lobby:join', joinLobby);
    socket.on('lobby:disconnect', disconnectLobby);
};

export default lobbyHandlers;
