// src/components/shared/SetupSection.tsx
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
    number: string
    title: string
    children: ReactNode
}

export function SetupSection({ number, title, children }: Props) {
    return (
        <Box component="section" role="group" aria-label={title}
             sx={{ borderTop: '3px solid', borderColor: 'text.primary', pt: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'baseline', mb: 3 }}>
                <Typography variant="overline" sx={{ color: 'var(--feature-accent)' }}>{number}</Typography>
                <Typography variant="h6">{title}</Typography>
            </Box>
            {children}
        </Box>
    )
}