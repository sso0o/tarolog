// src/components/shared/SplashScreen.tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { colors } from '../../design/system.ts'

interface Props {
    fading: boolean
}

export function SplashScreen({ fading }: Props) {
    return (
        <Box
            data-testid="splash-screen"
            sx={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                px: 4,
                backgroundColor: colors.ink,
                opacity: fading ? 0 : 1,
                transition: 'opacity 500ms ease-in-out',
                zIndex: 9999,
            }}
        >
            <Typography aria-hidden sx={{ color: colors.lavender, fontSize: '3rem', lineHeight: 1 }}>
                ✦
            </Typography>
            <Typography
                component="h1"
                variant="h1"
                sx={{ color: colors.paper, fontSize: { xs: '3rem', sm: '4rem' }, letterSpacing: '0.06em' }}
            >
                TAROLOG
            </Typography>
            <Typography
                variant="overline"
                sx={{ color: colors.paper, fontFamily: '"Roboto Mono", monospace' }}
            >
                TAROT STUDY ARCHIVE
            </Typography>
        </Box>
    )
}
