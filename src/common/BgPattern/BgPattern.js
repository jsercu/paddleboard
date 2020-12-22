import React from 'react';
import './BgPattern.css';

const BgPattern = ({ pattern, children }) => <div className={pattern}>{children}</div>;

export default BgPattern;
