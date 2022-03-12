/* eslint-disable max-len */
import PropTypes from 'prop-types';

import * as AppPropTypes from '../../../lib/PropTypes';

const propTypes = {
    color: PropTypes.string,
    className: AppPropTypes.className,
};

const defaultProps = {
    color: 'currentColor',
    className: null,
};

const MessageBubbleIcon = ({ color, className }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height="100%"
        width="100%"
        className={className}
    >
        <path
            fill={color}
            d="M448,76.56A38.44,38.44,0,0,1,486.4,115v230.4a38.44,38.44,0,0,1-38.4,38.4H66.2l-7.5,7.5-33.1,33.1V115A38.44,38.44,0,0,1,64,76.56H448M448,51H64A64,64,0,0,0,0,115V443.21A17.78,17.78,0,0,0,17.92,461a17.42,17.42,0,0,0,12.45-5.25L76.8,409.36H448a64,64,0,0,0,64-64V115a64,64,0,0,0-64-64Z"
        />
        <path
            fill={color}
            d="M332.8,191.76H179.2a12.8,12.8,0,0,1,0-25.6H332.8a12.8,12.8,0,1,1,0,25.6Z"
        />
        <path
            fill={color}
            d="M332.8,243H179.2a12.8,12.8,0,1,1,0-25.6H332.8a12.8,12.8,0,1,1,0,25.6Z"
        />
        <path
            fill={color}
            d="M332.8,294.16H179.2a12.8,12.8,0,1,1,0-25.6H332.8a12.8,12.8,0,0,1,0,25.6Z"
        />
    </svg>
);

MessageBubbleIcon.propTypes = propTypes;
MessageBubbleIcon.defaultProps = defaultProps;

export default MessageBubbleIcon;
