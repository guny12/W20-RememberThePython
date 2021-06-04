import React from 'react';
import { Tooltip } from 'react-bootstrap';

export const completeTooltip = (props) => (
  <Tooltip id="complete-tooltip" {...props}>
    Mark task complete
  </Tooltip>
);

export const incompleteTooltip = (props) => (
  <Tooltip id="complete-tooltip" {...props}>
    Mark task incomplete
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
