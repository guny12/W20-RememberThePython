import React from 'react';
import { Tooltip } from 'react-bootstrap';

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Click to see all tasks
  </Tooltip>
);

export default renderTooltip;
