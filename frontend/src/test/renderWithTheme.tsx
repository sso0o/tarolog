// src/test/renderWithTheme.tsx
import type { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme } from '../theme.ts'

export function renderWithTheme(ui: ReactElement, initialEntries = ['/']) {
    return render(
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
        </ThemeProvider>,
    )
}