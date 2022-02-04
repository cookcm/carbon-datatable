import React from 'react';
import PropTypes from 'prop-types';
import { Toggle } from 'carbon-components-react';

const SmallToggle = (props) => {
    return <div className='small-toggle' style={{minWidth: props.minWidth || 0}}>
        <Toggle
            size='sm'
            id={props.id}
            defaultToggled={props.defaultToggled}
            toggled={props.toggled}
            onToggle={props.onToggle}
            disabled={props.disabled}
            aria-label={props['aria-label']}
            labelA=""
            labelB=""
        />
        <span className='small-toggle__label'>
            {props.toggled ? props.labelB : props.labelA}
        </span>
    </div>;
};

SmallToggle.propTypes =
    {
        id: PropTypes.string,
        toggled: PropTypes.bool,
        defaultToggled: PropTypes.bool,
        disabled: PropTypes.bool,
        labelA: PropTypes.string,
        labelB: PropTypes.string,
        ['aria-label']: PropTypes.string,
        onToggle: PropTypes.func,
        minWidth: PropTypes.string
    };

export default SmallToggle;
