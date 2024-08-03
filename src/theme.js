import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#009688',
        },
        secondary: {
            main: '#03dac6',
        },
        background: {
            default: '#F8F8FF',
            paper: '#1e1e1e',
        },
        text: {
            primary: '#e0e0e0',
            secondary: '#b0bec5',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700,
            color: '#e0e0e0',
            letterSpacing: '0.1em',
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700,
            color: '#e0e0e0',
            letterSpacing: '0.1em',
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#e0e0e0',
            letterSpacing: '0.1em',
        },
        h4: {
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#e0e0e0',
            letterSpacing: '0.1em',
        },
        h5: {
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#e0e0e0',
            letterSpacing: '0.1em',
        },
        h6: {
            fontSize: '1rem',
            fontWeight: 700,
            color: '#e0e0e0',
            letterSpacing: '0.1em',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#b0bec5',
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            color: '#b0bec5',
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    }
});

export default theme;
