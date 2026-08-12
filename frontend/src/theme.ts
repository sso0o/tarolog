// src/theme.ts
import { createTheme } from '@mui/material/styles'
import { colors } from './design/system.ts'

const hardShadow = `4px 4px 0 ${colors.ink}`
const posterShadow = `8px 8px 0 ${colors.ink}`

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: { main: colors.ink, contrastText: colors.paper },
        secondary: { main: colors.lavender, contrastText: colors.ink },
        error: { main: colors.brick, contrastText: colors.paper },
        success: { main: colors.successInk, light: colors.successSurface },
        background: { default: colors.canvas, paper: colors.paper },
        text: { primary: colors.ink, secondary: colors.mutedInk, disabled: colors.mutedInk },
        divider: colors.ink,
    },
    spacing: 4,
    shape: { borderRadius: 4 },
    typography: {
        fontFamily: '"Noto Sans KR", system-ui, sans-serif',
        h1: { fontFamily: '"Noto Serif KR", serif', fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.15 },
        h2: { fontFamily: '"Noto Serif KR", serif', fontSize: '2rem', fontWeight: 700, lineHeight: 1.2 },
        h3: { fontFamily: '"Noto Serif KR", serif', fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.3 },
        h6: { fontFamily: '"Noto Serif KR", serif', fontWeight: 600 },
        body1: { fontSize: '1rem', lineHeight: 1.7 },
        body2: { fontSize: '0.875rem', lineHeight: 1.6 },
        button: { fontWeight: 700, textTransform: 'none' },
        overline: { fontFamily: '"Roboto Mono", monospace', fontWeight: 500, letterSpacing: '0.08em' },
    },
    shadows: [
        'none', `2px 2px 0 ${colors.ink}`, hardShadow, `6px 6px 0 ${colors.ink}`,
        posterShadow, 'none', 'none', 'none', 'none', 'none',
        'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none', 'none',
        'none', 'none', 'none', 'none', 'none',
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: { backgroundColor: colors.canvas },
                '#root': {
                    maxWidth: '1280px', margin: '0 auto', minHeight: '100svh',
                    borderInline: `2px solid ${colors.ink}`,
                },
            },
        },
        MuiButton: {
            defaultProps: { disableElevation: true },
            styleOverrides: {
                root: {
                    minHeight: 44,
                    borderRadius: 4,
                    border: `2px solid ${colors.ink}`,
                    boxShadow: hardShadow,
                    '&:active': { transform: 'translate(3px, 3px)', boxShadow: `1px 1px 0 ${colors.ink}` },
                    '&.Mui-disabled': {
                        color: colors.mutedInk,
                        backgroundColor: colors.disabledSurface,
                        borderColor: colors.ink,
                    },
                    '@media (max-width: 600px)': {
                        minHeight: 'unset',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: { border: `2px solid ${colors.ink}`, borderRadius: 4, boxShadow: hardShadow },
            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: { border: `3px solid ${colors.ink}`, borderRadius: 4, boxShadow: posterShadow },
            },
        },
        MuiTextField: {
            defaultProps: { variant: 'outlined' },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    backgroundColor: colors.paper,
                    '& .MuiOutlinedInput-notchedOutline': { borderWidth: 2, borderColor: colors.ink },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderWidth: 3, borderColor: 'var(--feature-accent)' },
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    minHeight: 44, borderRadius: '4px !important', border: `2px solid ${colors.ink} !important`,
                    color: colors.ink,
                    '&.Mui-selected': { backgroundColor: 'var(--feature-accent)', color: colors.ink },
                    '@media (max-width: 600px)': {
                        minHeight: 'unset',
                        paddingTop: '4px',
                        paddingBottom: '4px',
                    },
                },
            },
        },
        MuiToggleButtonGroup: {
            styleOverrides: { root: { gap: 8, flexWrap: 'wrap' }, grouped: { margin: '0 !important' } },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 4,
                    border: `2px solid ${colors.ink}`,
                    backgroundColor: colors.paper,
                    color: colors.ink,
                    fontWeight: 700,
                    boxShadow: `2px 2px 0 ${colors.ink}`,
                },
                deleteIcon: { color: colors.ink, '&:hover': { color: colors.brick } },
            },
        },
    },
})