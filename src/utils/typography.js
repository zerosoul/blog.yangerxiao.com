import Typography from 'typography';
// import oceanBeachTheme from 'typography-theme-ocean-beach';
import { lighten } from 'polished';

const config = require('../../config/SiteConfig');

// oceanBeachTheme.headerFontFamily = config.fontFamily;
// oceanBeachTheme.bodyFontFamily = config.fontFamily;

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.6,
  scaleRatio: 2,
  headerColor: '#333',
  bodyColor: 'hsl(0,0%,0%,0.6)',
  blockMarginBottom: 1,
  headerFontFamily: config.fontFamily,
  bodyFontFamily: config.fontFamily,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    a: {
      textDecoration: 'none',
      color: '#333',
      '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
      '-webkit-tap-highlight-color': 'transparent',
    },
    h2: {
      color: lighten(0.1, '#333'),
    },
  }),
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles();
}

export default typography;
