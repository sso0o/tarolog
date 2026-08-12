// src/components/shared/PageHeader.tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface Props {
    chapter: string
    title: string
    description?: string
    compact?: boolean
}

export function PageHeader({ chapter, title, description, compact = false }: Props) {
    return (
        <Box component="header" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="overline" color="text.secondary">{chapter}</Typography>
            <Typography variant={compact ? 'h3' : 'h1'}>{title}</Typography>
            {description && <Typography color="text.secondary">{description}</Typography>}
        </Box>
    )
}