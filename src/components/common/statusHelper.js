// import ClearSvg from '../../images/status/clear.svg';
import {ReactComponent as Clear} from '../../images/status/clear.svg';
// import IndeterminateStrokeSvg from '../../images/status/indeterminateStroke.svg';
import {ReactComponent as IndeterminateStroke} from '../../images/status/indeterminateStroke.svg';
// import InformationSvg from '../../images/status/information.svg';
import {ReactComponent as Information} from '../../images/status/information.svg';
// import WarningSvg from '../../images/status/warning.svg';
import {ReactComponent as Warning} from '../../images/status/warning.svg';
// import MinorSvg from '../../images/status/minor.svg';
import {ReactComponent as Minor} from '../../images/status/minor.svg';
// import MajorSvg from '../../images/status/major.svg';
import {ReactComponent as Major} from '../../images/status/major.svg';
// import CriticalSvg from '../../images/status/critical.svg';
import {ReactComponent as Critical} from '../../images/status/critical.svg';
import UnknownSvg from '../../images/status/unknown.svg';
import {ReactComponent as Unknown} from '../../images/status/unknown.svg';

import ClearDarkSvg from '../../images/status/clear-dark.svg';
import IndeterminateStrokeDarkSvg from '../../images/status/indeterminateStroke-dark.svg';
import InformationDarkSvg from '../../images/status/information-dark.svg';
import WarningDarkSvg from '../../images/status/warning-dark.svg';
import MinorDarkSvg from '../../images/status/minor-dark.svg';
import MajorDarkSvg from '../../images/status/major-dark.svg';
import CriticalDarkSvg from '../../images/status/critical-dark.svg';
import UnknownDarkSvg from '../../images/status/unknown-dark.svg';
// import { getThemedVersion } from './getCurrentTheme';

export function getSeverityIdentifiers(severityText) {
    let icon = null;
    // let iconDark = null;
    let severityName = '';
    switch (severityText) {
    case 'clear':
        icon = <Clear className='severity-breakdown-item__icon'/>;
        // iconDark = ClearDarkSvg;
        severityName = 'clear';
        break;
    case 'indeterminate':
        icon = <IndeterminateStroke className='severity-breakdown-item__icon'/>;
        // iconDark = IndeterminateStrokeDarkSvg;
        severityName = 'indeterminate';
        break;
    case 'information':
        icon = <Information className='severity-breakdown-item__icon'/>;
        // iconDark = InformationDarkSvg;
        severityName = 'information';
        break;
    case 'warning':
        icon = <Warning className='severity-breakdown-item__icon'/>;
        // iconDark = WarningDarkSvg;
        severityName = 'warning';
        break;
    case 'minor':
        icon = <Minor className='severity-breakdown-item__icon'/>;
        // iconDark = MinorDarkSvg;
        severityName = 'minor';
        break;
    case 'major':
        icon = <Major className='severity-breakdown-item__icon'/>;
        // iconDark = MajorDarkSvg;
        severityName = 'major';
        break;
    case 'critical':
        icon = <Critical className='severity-breakdown-item__icon'/>;
        // iconDark = CriticalDarkSvg;
        severityName = 'critical';
        break;
    default:
        icon = <Unknown className='severity-breakdown-item__icon'/>;
        // iconDark = UnknownDarkSvg;
        severityName = severityText;
        break;
    }

    return ({
        name: severityName,
        icon:  icon
        })
  
}

export function getStateIdentifiers(stateText) {
    let stateName = '';
    switch (stateText) {
    case 'open':
        stateName = 'open';
        break;
    case 'clear':
        stateName = 'clear';
        break;
    case 'closed':
        stateName = 'closed';
        break;
    default:
        stateName = stateText;
        break;
    }
    return stateName;
}

export const stateRank = {
    closed: 0,
    clear: 1,
    open: 2
};

export const severityRank = {
    clear: 0,
    indeterminate: 1,
    information: 2,
    warning: 3,
    minor: 4,
    major: 5,
    critical: 6
};

export function propertySortHighToLow(propertyName, rankMap) {
    if (rankMap) {
        return function(a, b) {
            if (rankMap[a[propertyName]] > rankMap[b[propertyName]]) {
                return -1;
            }
            if (rankMap[a[propertyName]] < rankMap[b[propertyName]]) {
                return 1;
            }
            return 0;
        };
    }
    return function(a, b) {
        if (a[propertyName] > b[propertyName]) {
            return -1;
        }
        if (a[propertyName] < b[propertyName]) {
            return 1;
        }
        return 0;
    };
}

export function propertySortLowToHigh(propertyName, rankMap) {
    if (rankMap) {
        return function(a, b) {
            if (rankMap[a[propertyName]] < rankMap[b[propertyName]]) {
                return -1;
            }
            if (rankMap[a[propertyName]] > rankMap[b[propertyName]]) {
                return 1;
            }
            return 0;
        };
    }
    return function(a, b) {
        if (a[propertyName] < b[propertyName]) {
            return -1;
        }
        if (a[propertyName] > b[propertyName]) {
            return 1;
        }
        return 0;
    };
}
