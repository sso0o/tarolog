// src/components/shared/PageHeader.tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { headingFontSizeSx } from '../../design/system.ts'

interface Props {
    title: string
    description?: string
    compact?: boolean
}

export function PageHeader({ title, description, compact = false }: Props) {
    return (
        <Box component="header" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography
                variant={compact ? 'h3' : 'h1'}
                sx={compact ? undefined : headingFontSizeSx}
            >
                {title}
            </Typography>
            {description && <Typography color="text.secondary">{description}</Typography>}
        </Box>
    )
}