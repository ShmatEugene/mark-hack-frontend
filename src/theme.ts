import { extendTheme } from '@mui/joy/styles';

export default extendTheme({
    fontFamily: {
        display: "'Inter', var(--joy-fontFamily-fallback)",
        body: "'Inter', var(--joy-fontFamily-fallback)",
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    50: '#EEEFF0',
                    // 100: '#EEEFF0',
                    // 200: '#333333',
                    // 300: '#333333',
                    // 400: '#333333',
                    // 500: '#333333',
                    // 600: '#333333',
                    // 700: '#333333',
                    // 800: '#333333',
                    // 900: '#333333',
                },
            },
        },
    },
});
