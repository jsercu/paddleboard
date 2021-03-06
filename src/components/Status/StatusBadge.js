import React from 'react';
import PropTypes from 'prop-types';
import { STATUSES } from './Status';

const StatusBadgeTheme = {
  NOT_STARTED: 'text-gray-900 bg-gray-200',
  ACTIVE: 'text-green-900 bg-green-200',
  PAUSED: 'text-yellow-900 bg-yellow-200',
  COMPLETED: 'text-indigo-900 bg-indigo-200',
  CLOSED: 'text-red-900 bg-red-200',
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`px-2 mt-1 ml-2 text-xs font-semibold rounded-full bg-opacity-80 ${StatusBadgeTheme[status]}`}>
      {STATUSES[status].title}
    </span>
  );
};

StatusBadge.propTypes = {
  /** The status of the badge. The badge text and style are set based on this prop  */
  status: PropTypes.oneOf(['NOT_STARTED', 'ACTIVE', 'PAUSED', 'COMPLETED', 'CLOSED']),
};

export default StatusBadge;
