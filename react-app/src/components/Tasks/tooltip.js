import React from 'react';
import { Tooltip } from 'react-bootstrap';

export const checkTooltip = (props) => (
  <Tooltip id="check-tooltip" {...props}>
    Mark task complete/incomplete
  </Tooltip>
);

export const priorityTooltip = (props) => (
  <Tooltip id="priority-tooltip" {...props}>
    Click to edit task priority
  </Tooltip>
);

export const deleteTooltip = (props) => (
  <Tooltip id="delete-tooltip" {...props}>
    Delete task
  </Tooltip>
);
