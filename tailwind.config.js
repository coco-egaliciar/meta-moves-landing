const colors = require('tailwindcss/colors')

module.exports = {
  corePlugins: [
    'accentColor',
    'accessibility',
    'alignContent',
    'alignItems',
    'alignSelf',
    'animation',
    'appearance',
    'aspectRatio',
    'backdropBlur',
    'backdropBrightness',
    'backdropContrast',
    'backdropFilter',
    'backdropGrayscale',
    'backdropHueRotate',
    'backdropInvert',
    'backdropOpacity',
    'backdropSaturate',
    'backdropSepia',
    'backgroundAttachment',
    'backgroundBlendMode',
    'backgroundClip',
    'backgroundColor',
    'backgroundImage',
    'backgroundOpacity',
    'backgroundOrigin',
    'backgroundPosition',
    'backgroundRepeat',
    'backgroundSize',
    'blur',
    'borderCollapse',
    'borderColor',
    'borderOpacity',
    'borderRadius',
    'borderStyle',
    'borderWidth',
    'boxDecorationBreak',
    'boxShadow',
    'boxShadowColor',
    'boxSizing',
    'breakAfter',
    'breakBefore',
    'breakInside',
    'brightness',
    'caretColor',
    'clear',
    'columns',
    'container',
    'content',
    'contrast',
    'cursor',
    'display',
    'divideColor',
    'divideOpacity',
    'divideStyle',
    'divideWidth',
    'dropShadow',
    'fill',
    'filter',
    'flex',
    'flexBasis',
    'flexDirection',
    'flexGrow',
    'flexShrink',
    'flexWrap',
    'float',
    'fontFamily',
    'fontSize',
    'fontSmoothing',
    'fontStyle',
    'fontVariantNumeric',
    'fontWeight',
    'gap',
    'gradientColorStops',
    'grayscale',
    'gridAutoColumns',
    'gridAutoFlow',
    'gridAutoRows',
    'gridColumn',
    'gridColumnEnd',
    'gridColumnStart',
    'gridRow',
    'gridRowEnd',
    'gridRowStart',
    'gridTemplateColumns',
    'gridTemplateRows',
    'height',
    'hueRotate',
    'inset',
    'invert',
    'isolation',
    'justifyContent',
    'justifyItems',
    'justifySelf',
    'letterSpacing',
    'lineHeight',
    'listStylePosition',
    'listStyleType',
    'margin',
    'maxHeight',
    'maxWidth',
    'minHeight',
    'minWidth',
    'mixBlendMode',
    'objectFit',
    'objectPosition',
    'opacity',
    'order',
    'outlineColor',
    'outlineOffset',
    'outlineStyle',
    'outlineWidth',
    'overflow',
    'overscrollBehavior',
    'padding',
    'placeContent',
    'placeItems',
    'placeSelf',
    'placeholderColor',
    'placeholderOpacity',
    'pointerEvents',
    'position',
    'preflight',
    'resize',
    'ringColor',
    'ringOffsetColor',
    'ringOffsetWidth',
    'ringOpacity',
    'ringWidth',
    'rotate',
    'saturate',
    'scale',
    'scrollBehavior',
    'scrollMargin',
    'scrollPadding',
    'scrollSnapAlign',
    'scrollSnapStop',
    'scrollSnapType',
    'sepia',
    'skew',
    'space',
    'stroke',
    'strokeWidth',
    'tableLayout',
    'textAlign',
    'textColor',
    'textDecoration',
    'textDecorationColor',
    'textDecorationStyle',
    'textDecorationThickness',
    'textIndent',
    'textOpacity',
    'textOverflow',
    'textTransform',
    'textUnderlineOffset',
    'touchAction',
    'transform',
    'transformOrigin',
    'transitionDelay',
    'transitionDuration',
    'transitionProperty',
    'transitionTimingFunction',
    'translate',
    'userSelect',
    'verticalAlign',
    'visibility',
    'whitespace',
    'width',
    'willChange',
    'wordBreak',
    'zIndex'

  ],
  // important: true,
  // purge: ['./dist/*.html'],
  // content: ['**/src/*.{html,js}', '**/src/partials/*.{html,js}'],
  content: ['src/*.{html,js}', 'src/partials/*.{html,js}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      metablue: '#00FFF7',
      metapink: {
        100: '#d02a6c',
        400: '#f30061'
      }
    },
    fontSize: {
      xs: '1.9vh',
      sm: '2.1vh',
      tiny: '2.3vh',
      base: '2.4vh',
      lg: 'calc(2.5vh)',
      xl: 'calc(3vh)',
      xl2: 'calc(3.5vh)',
      '2xl': 'calc(4vh)',
      '3xl': 'calc(6vh)',
      '4xl': 'calc(8vh)',
      '5xl': 'calc(10vh - 2em)',
      '6xl': 'calc(12vh - 2em)'
    },
    fontFamily: {
      marker: ['Permanent Marker'],
      nunito: ['Nunito Sans']
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
      // => @media (min-width: 1536px) { ... }
    }
  }
}
