// src/theme.ts
import { createTheme } from '@mui/material'

export const theme = createTheme({
    palette: {
        primary: { main: '#0d0d0d', contrastText: '#ffffff' },
        background: { default: '#ffffff', paper: '#f5f5f5' },
        text: {
            primary: '#1a1a1a',
            secondary: '#6b6b6b',
            disabled: '#9b9b9b',
        },
        success: {
            main: '#dcfce7',
            contrastText: '#166534',
        },
        divider: '#e8e8e8',
    },
    typography: {
        fontFamily: '"DM Sans", Inter, "Helvetica Neue", Helvetica, Arial, sans-serif',
        h1: { fontSize: '2rem', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.5px' },
        h2: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.30 },
        h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.40 },
        subtitle1: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.50 },
        body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.50 },
        body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.50 },
        button: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.40, textTransform: 'none' },
        caption: { fontSize: '0.8125rem', lineHeight: 1.70 },
    },
    shape: { borderRadius: 4 },
    spacing: 4,
    shadows: [
        'none',
        'rgba(0,0,0,0.04) 0px 1px 2px 0px',
        'rgba(0,0,0,0.08) 0px 4px 6px 0px',
        'rgba(0,0,0,0.08) 0px 0px 22px 0px',
        'rgba(36,36,36,0.08) 0px 12px 16px -4px',
        'none', 'none', 'none', 'none', 'none',
        'none', 'none', 'none', 'none', 'none',
        'none', 'none', 'none', 'none', 'none',
        'none', 'none', 'none', 'none', 'none',
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '#root': {
                    maxWidth: '1280px',
                    margin: '0 auto',
                    paddingInline: '2rem',
                    borderInline: '1px solid #e8e8e8',
                    minHeight: '100svh',
                    display: 'flex',
                    flexDirection: 'column',
                },
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: {
                    borderRadius: 9999,
                    padding: '11px 24px',
                    boxShadow: 'none',
                    '&:hover': { boxShadow: 'none' },
                },
                sizeSmall: { padding: '6px 16px' },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: { gap: '8px' },
                grouped: {
                    '&:not(:first-of-type)': {
                        borderRadius: '9999px !important',
                        borderLeft: '1px solid #e8e8e8 !important',
                        marginLeft: '0 !important',
                    },
                    '&:first-of-type': {
                        borderRadius: '9999px !important',
                    },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    borderRadius: '9999px !important',
                    padding: '6px 16px',
                    border: '1px solid #e8e8e8',
                    color: '#9b9b9b',
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    lineHeight: 1.40,
                    '&.Mui-selected': {
                        backgroundColor: '#0d0d0d',
                        color: '#ffffff',
                        '&:hover': { backgroundColor: '#3d3d3d' },
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    border: '1px solid #e8e8e8',
                    boxShadow: 'none',
                    backgroundColor: '#ffffff',
                },
            },
        },
        MuiTextField: {
            defaultProps: { variant: 'outlined', size: 'small' },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        backgroundColor: '#f5f5f5',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e8e8e8',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#1d4ed8',
                            borderWidth: 2,
                        },
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#ffffff',
                    color: '#1a1a1a',
                    boxShadow: 'none',
                    borderBottom: '1px solid #e8e8e8',
                },
            },
        },
    },
})