import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';

const propTypes = {
    socket: AppPropTypes.socket.isRequired,
    lobbyCode: PropTypes.string.isRequired,
    players: AppPropTypes.players.isRequired,
};

const defaultProps = {};

const WaitingRoom = ({ socket, lobbyCode, players }) => {
    useEffect(() => {});

    const onStartGame = () => {
        socket.emit('game:start_game', lobbyCode);
    };

    return (
        <>
            <Helmet>
                <title>Don't Get Caught Cheating</title>
                <meta name="description" content="Game" />
            </Helmet>
            <div>
                Waiting for the host to start...
                <div>
                    Code:{' '}
                    <span className="text-xl bold tracking-wide" data-cy="lobby_code">
                        {lobbyCode}
                    </span>
                </div>
                <h3>Players</h3>
                <ul data-cy="players">
                    {players.map((player) => (
                        <li key={player.id}>
                            <b>{player.name}</b>
                            {player.avatar}
                        </li>
                    ))}
                </ul>
            </div>

            <button type="button" onClick={onStartGame} data-cy="start_game">
                Start Game
            </button>
        </>
    );
};

WaitingRoom.propTypes = propTypes;
WaitingRoom.defaultProps = defaultProps;

const WithReduxContainer = connect(
    ({ site, lobby }) => ({
        socket: site.socket,
        content: site.pannelContent,
        hidden: site.pannelOpen,
        players: lobby.players,
        lobbyCode: lobby.lobbyCode,
    }),
    () => ({}),
)(WaitingRoom);

export default WithReduxContainer;
