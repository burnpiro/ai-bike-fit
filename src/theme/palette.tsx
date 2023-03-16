import { alpha } from '@mui/material';

// ----------------------------------------------------------------------

// SETUP COLORS
const BACKGROUND = {
    DEFAULT: '#212121',
    PAPER: '#424242'
}

const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
};

const PRIMARY = {
    lighter: '#EDF4FD',
    light: '#D1E9FC',
    main: '#76B0F1',
    dark: '#2065D1',
    darker: '#103996',
    // darkest: '#061B64',
    contrastText: GREY[800],
};

const SECONDARY = {
    lighter: '#fceedd',
    light: '#f7d4ab',
    main: '#f1b876',
    dark: '#e78718',
    darker: '#de6800',
    // darkest: '#091A7A',
    contrastText: GREY[800],
};

const INFO = {
    lighter: '#EBF7FF',
    light: '#D0F2FF',
    main: '#74CAFF',
    dark: '#1890FF',
    darker: '#0C53B7',
    // darkest: '#04297A',
    contrastText: GREY[800],
};

const SUCCESS = {
    lighter: '#F3FDEC',
    light: '#E9FCD4',
    main: '#AAF27F',
    dark: '#54D62C',
    darker: '#229A16',
    // darkest: '#08660D',
    contrastText: GREY[800],
};

const WARNING = {
    lighter: '#FFFBEB',
    light: '#FFF7CD',
    main: '#FFE16A',
    dark: '#FFC107',
    darker: '#B78103',
    // darkest: '#7A4F01',
    contrastText: GREY[800],
};

const ERROR = {
    lighter: '#FFEFEB',
    light: '#FFE7D9',
    main: '#FFA48D',
    dark: '#FF4842',
    darker: '#B72136',
    // darkest: '#7A0C2E',
    contrastText: GREY[800],
};

const palette = {
    common: { black: '#000', white: GREY[0] },
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    grey: GREY,
    divider: alpha(GREY[0], 0.14),
    text: {
        primary: GREY[0],
        secondary: alpha(GREY[0], 0.7),
        disabled: alpha(GREY[0], 0.5),
        icon: alpha(GREY[0], 0.5),
    },
    background: {
        paper: BACKGROUND.PAPER,
        default: BACKGROUND.DEFAULT,
        neutral: GREY[700],
        light: GREY[400],
    },
    action: {
        active: GREY[0],
        hover: alpha(GREY[0], 0.08),
        selected: alpha(GREY[0], 0.16),
        disabled: alpha(GREY[0], 0.8),
        disabledBackground: alpha(GREY[0], 0.24),
        focus: alpha(GREY[0], 0.24),
        hoverOpacity: 0.08,
        disabledOpacity: 0.48,
    },
};

export default palette;