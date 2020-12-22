import React from 'react';
import './BgPattern.css';

const HeroPattern = ({ pattern, children }) => <div className={pattern}>{children}</div>;

export default HeroPattern;
