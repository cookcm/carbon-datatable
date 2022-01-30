import { ReactComponent as Clear } from "../../images/status/clear.svg";
import { ReactComponent as IndeterminateStroke } from "../../images/status/indeterminateStroke.svg";
import { ReactComponent as Information } from "../../images/status/information.svg";
import { ReactComponent as Warning } from "../../images/status/warning.svg";
import { ReactComponent as Minor } from "../../images/status/minor.svg";
import { ReactComponent as Major } from "../../images/status/major.svg";
import { ReactComponent as Critical } from "../../images/status/critical.svg";
import { ReactComponent as Unknown } from "../../images/status/unknown.svg";

import { ReactComponent as ClearDark } from "../../images/status/clear-dark.svg";
import { ReactComponent as IndeterminateStrokeDark } from "../../images/status/indeterminateStroke-dark.svg";
import { ReactComponent as InformationDark } from "../../images/status/information-dark.svg";
import { ReactComponent as WarningDark } from "../../images/status/warning-dark.svg";
import { ReactComponent as MinorDark } from "../../images/status/minor-dark.svg";
import { ReactComponent as MajorDark } from "../../images/status/major-dark.svg";
import { ReactComponent as CriticalDark } from "../../images/status/critical-dark.svg";
import { ReactComponent as UnknownDark } from "../../images/status/unknown-dark.svg";

import {
  UnknownFilled16,
  CheckmarkFilled16,
  Checkmark16,
  Renew16,
  Incomplete16,
  IncompleteError16,
} from "@carbon/icons-react";

export function getSeverityIdentifiers(severityText) {
  let icon = null;
  let iconDark = null;
  let severityName = "";
  switch (severityText) {
    case "clear":
      icon = <Clear className="severity-breakdown-item__icon" />;
      iconDark = <ClearDark className="severity-breakdown-item__icon" />;
      severityName = "clear";
      break;
    case "indeterminate":
      icon = <IndeterminateStroke className="severity-breakdown-item__icon" />;
      iconDark = (
        <IndeterminateStrokeDark className="severity-breakdown-item__icon" />
      );
      severityName = "indeterminate";
      break;
    case "information":
      icon = <Information className="severity-breakdown-item__icon" />;
      iconDark = <InformationDark className="severity-breakdown-item__icon" />;
      severityName = "information";
      break;
    case "warning":
      icon = <Warning className="severity-breakdown-item__icon" />;
      iconDark = <WarningDark className="severity-breakdown-item__icon" />;

      severityName = "warning";
      break;
    case "minor":
      icon = <Minor className="severity-breakdown-item__icon" />;
      iconDark = <MinorDark className="severity-breakdown-item__icon" />;
      severityName = "minor";
      break;
    case "major":
      icon = <Major className="severity-breakdown-item__icon" />;
      iconDark = <MajorDark className="severity-breakdown-item__icon" />;
      severityName = "major";
      break;
    case "critical":
      icon = <Critical className="severity-breakdown-item__icon" />;
      iconDark = <CriticalDark className="severity-breakdown-item__icon" />;
      severityName = "critical";
      break;
    default:
      icon = <Unknown className="severity-breakdown-item__icon" />;
      iconDark = <UnknownDark className="severity-breakdown-item__icon" />;
      severityName = severityText;
      break;
  }

  return {
    name: severityName,
    icon: icon,
    iconDark: iconDark
  };
}

export function getStateIdentifiers(stateText) {
  let stateName = "";
  switch (stateText) {
    case "open":
      stateName = "open";
      break;
    case "clear":
      stateName = "clear";
      break;
    case "closed":
      stateName = "closed";
      break;
    default:
      stateName = stateText;
      break;
  }
  return stateName;
}

export function getStatusIdentifiers(statusText) {
  let statusName = "";
  let icon = null;
  switch (statusText) {
    case "incomplete-errors":
      statusName = "grid has errors";
      icon = <IncompleteError16 className="icon-orange"/>;
      break;
    case "incomplete":
      statusName = "grid incomplete";
      icon = <Incomplete16 className="icon-red"/>;
      break;
    case "in-progress":
      statusName = "crossword in progress";
      icon = <Renew16 className="icon-blue"/>;
      break;
    case "validated":
      statusName = "grid validated";
      icon = <Checkmark16 className="icon-green"/>;
      break;
    case "ready":
      statusName = "crossword ready to play";
      icon = <CheckmarkFilled16 className="icon-green"/>;
      break;
    default:
      statusName = "unknown";
      icon = <UnknownFilled16 className="icon-grey"/>;
      break;
  }
  return {
    name: statusName,
    icon: icon
  };
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
    return function (a, b) {
      if (rankMap[a[propertyName]] > rankMap[b[propertyName]]) {
        return -1;
      }
      if (rankMap[a[propertyName]] < rankMap[b[propertyName]]) {
        return 1;
      }
      return 0;
    };
  }
  return function (a, b) {
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
    return function (a, b) {
      if (rankMap[a[propertyName]] < rankMap[b[propertyName]]) {
        return -1;
      }
      if (rankMap[a[propertyName]] > rankMap[b[propertyName]]) {
        return 1;
      }
      return 0;
    };
  }
  return function (a, b) {
    if (a[propertyName] < b[propertyName]) {
      return -1;
    }
    if (a[propertyName] > b[propertyName]) {
      return 1;
    }
    return 0;
  };
}
