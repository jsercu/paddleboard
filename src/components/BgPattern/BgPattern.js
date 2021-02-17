import React from 'react';

const BgPattern = ({ pattern, bgColor, children }) => {
  const patternStyles = (pattern) => {
    switch (pattern) {
      case 'diagonalStripes':
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23DC2626' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        };
      case 'thinDiagonalLines':
      default:
        return {
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D946EF' fill-opacity='0.8' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
        };
    }
  };

  return (
    <div style={patternStyles(pattern)} className={bgColor}>
      {children}
    </div>
  );
};

export default BgPattern;
