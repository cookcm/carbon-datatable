import {
  UnknownFilled16,
  CheckmarkFilled16,
  Checkmark16,
  Renew16,
  Incomplete16,
  IncompleteError16
} from "@carbon/icons-react";

export function getStatusIdentifiers(statusText) {
  let statusName = "";
  let icon = null;
  switch (statusText) {
    case "incomplete-errors":
      statusName = "grid has errors";
      icon = <IncompleteError16 className="icon-orange" />;
      break;
    case "incomplete":
      statusName = "grid incomplete";
      icon = <Incomplete16 className="icon-red" />;
      break;
    case "in-progress":
      statusName = "crossword in progress";
      icon = <Renew16 className="icon-blue" />;
      break;
    case "validated":
      statusName = "grid validated";
      icon = <Checkmark16 className="icon-green" />;
      break;
    case "ready":
      statusName = "crossword ready to play";
      icon = <CheckmarkFilled16 className="icon-green" />;
      break;
    default:
      statusName = "unknown";
      icon = <UnknownFilled16 className="icon-grey" />;
      break;
  }
  return {
    name: statusName,
    icon: icon
  };
}
