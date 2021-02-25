import React from 'react';
import PropTypes from 'prop-types';
import TailwindCSSColors from 'tailwindcss/colors';

const BgPattern = ({ patternVariant, patternColor, patternOpacity, backgroundColor, children }) => {
  /**
   * Return a hex code from the TailwindCSS color palete
   * @param {string} hue - provide a color defined in 'tailwindcss/colors' (e.g. 'red' or 'emerald')
   * @param {string} shade - provide a shade defined in 'tailwindcss/colors (e.g. '50' or '700')
   */
  const getHexFromTailwindColor = (hue, shade) => {
    return TailwindCSSColors[hue][shade];
  };

  /**
   * Format a hexadecimal color code for use in SVG by escaping fragment identifier ('#)
   * @param {string} hex - provide a hexadecimal color code (e.g. #9CA3AF)
   */
  const formatHexForSVG = (hex) => {
    return `%23${hex.substr(1).toUpperCase()}`;
  };

  const getStyles = () => {
    const { hue: bgHue, shade: bgShade } = backgroundColor;
    const bgColor = `bg-${bgHue}-${bgShade}`;
    return `${bgColor}`;
  };

  const pattern = {
    diagonalStripes: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${formatHexForSVG(
        getHexFromTailwindColor(patternColor.hue, patternColor.shade),
      )}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
    },
    thinDiagonalLines: {
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='${formatHexForSVG(
        getHexFromTailwindColor(patternColor.hue, patternColor.shade),
      )}' fill-opacity='${patternOpacity}' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")`,
    },
  };

  return (
    <div style={pattern[patternVariant]} className={getStyles()}>
      {children}
    </div>
  );
};

BgPattern.propTypes = {
  patternVariant: PropTypes.oneOf(['diagonalStripes', 'thinDiagonalLines']),
  patternColor: PropTypes.shape({
    hue: PropTypes.string,
    shade: PropTypes.oneOf(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']),
  }),
  patternOpacity: PropTypes.oneOf(['0.10', '0.20', '0.30', '0.40', '0.50', '0.60', '0.70', '0.80', '0.90', '1']),
  backgroundColor: PropTypes.shape({
    hue: PropTypes.string,
    shade: PropTypes.oneOf(['50', '100', '200', '300', '400', '500', '600', '700', '800', '900']),
  }),
  children: PropTypes.node,
};

BgPattern.defaultProps = {
  patternOpacity: '1',
};

export default BgPattern;
