import React from 'react';
import PropTypes from 'prop-types';
import { getSeverityIdentifiers, severityRank } from './severityHelper';
import { Tooltip, Tag } from 'carbon-components-react';
import classnames from 'classnames';


const SeverityBreakdown = function(props) {
    const {
        severityCounts,
        maxVisible,
        id,
        className
    } = props;
    if (!severityCounts) {
        return null;
    }
    const visibleSevs = {};
    Object.keys(severityCounts).forEach(sev => {
        if (severityCounts[sev] > 0) {
            visibleSevs[sev] = severityCounts[sev];
        }
    });
    const keys = Object.keys(visibleSevs);

    const sortSev = function(a, b) {
        if (severityRank[a] > severityRank[b]) {
            return -1;
        }
        if (severityRank[a] < severityRank[b]) {
            return 1;
        }
        return 0;
    };
    keys.sort(sortSev);

    const sevsComponent = [];
    for (let i = 0; i < keys.length && (!maxVisible || i < maxVisible); i++) {
        const sev = getSeverityIdentifiers(keys[i]);
        const SevIcon = sev.icon;
        sevsComponent.push(<div key={id + keys[i] + 'item'} className='severity-breakdown-item' title={`${sev.name}: ${visibleSevs[keys[i]]}`}>
            {SevIcon}
            <span>
                {visibleSevs[keys[i]]}
            </span>
        </div>);
    }
    let overflowComponent = null;
    if (keys.length > maxVisible) {
        const sevValues = [];
        keys.forEach(key => {
            const sev = getSeverityIdentifiers(key);
            const SevIcon = sev.iconDark;
            const value = ` ${sev.name}  ${visibleSevs[key]}`;
            sevValues.push(<div key={id + value} className='severity-breakdown-tooltip-item'>
                {SevIcon}
                {value}
            </div>);
        });
        // eslint-disable-next-line react/display-name
        const overflowTag = React.forwardRef(() => (
                <Tag className='severity-breakdown-tooltip-tag'>{`+${keys.length - maxVisible}`}</Tag> 
        ));
        overflowComponent = <Tooltip
            id={`severityBreakdownTooltip-${id}`}
            triggerId={`severityBreakdownTooltipTriggerId-${id}`}
            className='severity-breakdown-tooltip'
            direction={'top'}
            renderIcon={overflowTag}
        >
            {sevValues}
        </Tooltip>;
    }
    return (
        <div className={classnames('severity-breakdown', className)}>
            {sevsComponent}
            {overflowComponent}
        </div>
    );
};

SeverityBreakdown.propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    maxVisible: PropTypes.number,
    severityCounts: PropTypes.object,
    overflowType: PropTypes.oneOf(['Tag', 'Text'])
};

export default SeverityBreakdown;
