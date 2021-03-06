import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';

import * as AppPropTypes from '../../../lib/PropTypes';

import CreateAvatar from './CreateAvatar';
import { setName as setNameAction } from '../../../redux/actions/playerActions';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    className: null,
};

const CharacterCreation = ({ socket, name, setName, avatar, className }) => {
    const [lobbyCode, setLobbyCode] = useState('');
    const { lid } = useParams();

    const onCreateLobby = () => {
        if (lid) {
            // do some error
            return;
        }

        socket.emit('lobby:create', name, avatar);
    };

    const onJoinLobby = () => {
        if (lid) {
            socket.emit('lobby:join', name, avatar, lid);
            return;
        }

        socket.emit('lobby:join', name, avatar, lobbyCode);
    };

    return (
        <div className={`max-w-[800px] mx-auto  ${className || ''}`}>
            <form className="bg-white p-4 mb-3 ">
                <input
                    type="text"
                    placeholder="Name..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-solid border-black px-2 w-full"
                    data-cy="name"
                />
                <CreateAvatar />
            </form>
            {!lid ? (
                <>
                    <div className="bg-white p-4 mb-3">
                        <button
                            type="button"
                            className="text-center w-full border border-solid border-black "
                            onClick={onCreateLobby}
                            data-cy="create_lobby"
                        >
                            Create Lobby
                        </button>
                    </div>
                    <form className="bg-white p-4">
                        <input
                            type="text"
                            placeholder="Lobby Code..."
                            value={lobbyCode}
                            onChange={(e) => setLobbyCode(e.target.value)}
                            className="border border-solid border-black mb-3 px-2 w-full"
                            data-cy="input_lobby_code"
                        />
                        <button
                            type="button"
                            className={`text-center w-full border border-solid border-black disabled ${
                                lid ? 'disabled' : ''
                            } disabled:opacity-70 disabled:bg-gray-300`}
                            onClick={onJoinLobby}
                            data-cy="join_lobby"
                        >
                            Join Lobby
                        </button>
                    </form>
                </>
            ) : (
                <div className="bg-white p-4 mb-3">
                    <button
                        type="button"
                        className="text-center w-full border border-solid border-black "
                        onClick={onJoinLobby}
                    >
                        Join Lobby
                    </button>
                </div>
            )}
        </div>
    );
};

CharacterCreation.propTypes = propTypes;
CharacterCreation.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, player }) => ({
        name: player.name,
        avatar: player.avatar,
        socket: site.socket,
    }),
    (dispatch) => ({
        setName: (value) => dispatch(setNameAction(value)),
    }),
)(CharacterCreation);

export default WithReduxContainer;
