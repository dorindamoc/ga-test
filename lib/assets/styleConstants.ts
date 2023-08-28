import { keyframes } from 'styled-components'

export const colors = {
    captureBlue: '#0091D2',
    captureBlueRGB: '0, 145, 210',
    captureBlue50: '#E5F4FA',
    captureBlue100: '#B2DEF1',
    captureBlue200: '#66BDE4',
    captureBlue900: '#00496B',
    captureGreen: '#008A0E',
    captureGrey50: '#FAFAFA',
    captureGrey50_rgb: '250, 250, 250',
    captureGrey100: '#F5F5F5',
    captureGrey200: '#EEEEEE',
    captureGrey300: '#E0E0E0',
    captureGrey400: '#BDBDBD',
    captureGrey400rgb: '189, 189, 189',
    captureGrey500: '#9E9E9E',
    captureGrey500rgb: '158, 158, 158',
    captureGrey600: '#757575',
    captureGrey700: '#616161',
    captureGrey800: '#424242',
    captureGrey800rgb: '66, 66, 66',
    captureMagenta: '#FF3F95',
    captureYellow: '#FFCD14',
    captureNavBar: 'rgba(255, 255, 255, 0.95)',

    turquoise: '#0E93AB',
    lightTurquoise: '#3DC4DC',
    turquoise_rgb: '14, 147, 171',

    white_rgb: '255, 255, 255',
    greyBorder: 'rgba(151,151,151,0.3)',
    gradientGreen: '#86D6C6',

    successGreen: '#0C865F',

    warn: '#FCDC00',
    info: '#007BC2',
    alert: '#FF8080',

    warningRed: '#D0021B',
    warningRed_rgb: '208, 2, 27',
    warningRed50: '#FFEFEF',

    darkBackground: '#191919',
    darkBackground_rgb: '25, 25, 25',
    blackSemitransparent: 'rgba(0,0,0,0.5)',
    black: '#000',

    defaultIconColor: '#424242',
}
type ThemeSet = {
    // TODO: create a more comprehensive theme. This has been created very much on a as-needed basis
    active: string
}

// Font stacks for use with fontFamily-attribute for styling
export const fonts = {
    Lato: 'Lato, Arial, sans-serif',
}

export const fontSize = {
    xSmall_10: '0.625rem',
    small_12: '0.75rem',
    small_14: '0.875rem',
    medium_16: '1rem',
    medium_18: '1.125rem',
    medium_20: '1.25rem',
    large_22: '1.375rem',
    large_24: '1.5rem',
    large_28: '1.75rem',
    xLarge_32: '2rem',
    xLarge_36: '2.25rem',
    xLarge_38: '2.375rem',
    xLarge_48: '3rem',
    xxLarge_60: '3.75rem',
}

export const layout = {
    maxContainerWidth: 1200,
    topNavBarHeight: 56,
    selectionToolbarHeight: 56, // cover topNavBar completely
    fastScrollerWidth: 40,
    fastScrollerWidthSelection: 70,
}

export const zIndex = {
    hint: 1000, // UI hints
    menu: 1100, // dropdown and context menus
    appBar: 1200, // top bar
    drawer: 1250, // info drawer
    backgroundCover: 1300, // modal and banner backgrounds
    modal: 1350,
    snackbar: 1400, // toasts
    tooltip: 1500,
    fullscreen: 2000,
}

export const mediaBreakpoint__mobile = 600
export const mediaBreakpoint__tabletPortrait = 900
export const mediaBreakpoint__tabletLandscape = 1200

export const mediaBreakpoint__TVsmall = 1400

export const mediaQueries = {
    mobile: `@media (max-width: ${mediaBreakpoint__mobile}px)`,
    tabletPortraitDown: `@media (max-width: ${mediaBreakpoint__tabletPortrait}px)`,
    tabletLandscapeDown: `@media (max-width: ${mediaBreakpoint__tabletLandscape}px)`,
    isTVSmall: `@media (max-width: ${mediaBreakpoint__TVsmall}px)`,
}

// animations
const makeFadeTo = (startOpacity: number, endOpacity: number) => keyframes`
    0% {
        opacity: ${startOpacity};
    }
    100% {
        opacity: ${endOpacity};
    }
`
export const animations = {
    swingInTopFwd: keyframes`
        0% {
            transform: rotateX(-100deg);
            transform-origin: top;
            opacity: 0;
        }
        100% {
            transform: rotateX(0deg);
            transform-origin: top;
            opacity: 1;
        }
    `,
    fadeIn: makeFadeTo(0, 1),
    fadeOut: makeFadeTo(1, 0),
    pulseEffect: keyframes`
        0%, 100% {
            opacity: 0.7;
        }
        50% {
            opacity: 1;
        }
    `,
}
