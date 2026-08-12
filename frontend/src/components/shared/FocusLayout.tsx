// src/components/shared/FocusLayout.tsx
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface Props {
    title: string
    onExit: () => void
    children: ReactNode
    actions?: ReactNode
}

export function FocusLayout({ title, onExit, children, actions }: Props) {
    return (
        <Box sx={{ minHeight: '100svh', display: 'flex', flexDirection: 'column' }}>
            <Box component="header" sx={{ px: { xs: 4, sm: 6 }, py: 3,
                borderBottom: '3px solid', display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h6" sx={{ flex: 1 }}>{title}</Typography>
                <Button variant="text" onClick={onExit}>종료</Button>
            </Box>
            <Box component="main" sx={{ flex: 1, px: { xs: 4, sm: 6 }, py: 6 }}>
                {children}
            </Box>
            {actions && (
                <Box sx={{ position: 'sticky', bottom: 0, p: 4,
                    pb: 'calc(16px + env(safe-area-inset-bottom))',
                    bgcolor: 'background.paper', borderTop: '3px solid' }}>
                    {actions}
                </Box>
            )}
        </Box>
    )
}