import { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as AppPropTypes from '../../../../lib/PropTypes';
import {
    selectCard as selectCardAction,
    deselectCard as deselectCardAction,
} from '../../../../redux/actions/handActions';

const propTypes = {
    card: AppPropTypes.card,
    selectCard: PropTypes.func.isRequired,
    deselectCard: PropTypes.func.isRequired,
    className: PropTypes.string,
};

const defaultProps = {
    card: {
        img: '../../../../images/notfound.jpg',
        value: 'NA',
        suit: 'NA',
        code: 'NA',
    },
    className: '',
};

const Card = ({ card, selectCard, deselectCard, className }) => {
    const [selected, setSelected] = useState(false);

    const onClickCard = () => {
        if (selected) {
            setSelected(false);
            return deselectCard(card);
        }

        setSelected(true);
        return selectCard(card);
    };

    return (
        <button type="button" onClick={onClickCard} className={`${className}`}>
            <img alt={`${card.value} of ${card.suit}`} src={card.img} />
        </button>
    );
};

Card.propTypes = propTypes;
Card.defaultProps = defaultProps;

const WithReduxContainer = connect(
    () => ({}),
    (dispatch) => ({
        selectCard: (value) => dispatch(selectCardAction(value)),
        deselectCard: (value) => dispatch(deselectCardAction(value)),
    }),
)(Card);

export default WithReduxContainer;