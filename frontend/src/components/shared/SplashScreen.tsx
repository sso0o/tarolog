// src/components/shared/SplashScreen.tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
    fading: boolean
}

export function SplashScreen({ fading }: Props) {
    return (
        <Box
            sx={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0d0d0d',
                opacity: fading ? 0 : 1,
                transition: 'opacity 500ms ease-in-out',
                zIndex: 9999,
            }}
        >
            <Typography variant='h1' sx={{ color: '#f5f5f5' }}>
                tarolog
            </Typography>
        </Box>
    )
}