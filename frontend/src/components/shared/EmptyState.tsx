// src/components/shared/EmptyState.tsx
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface Props {
    title: string
    description: string
    actionLabel?: string
    onAction?: () => void
}

export function EmptyState({ title, description, actionLabel, onAction }: Props) {
    const hasAction = actionLabel !== undefined && onAction !== undefined

    return (
        <Box
            role="status"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: 2,
                p: { xs: 4, sm: 6 },
                bgcolor: 'background.paper',
                border: '3px solid',
                borderColor: 'text.primary',
            }}
        >
            <Typography variant="h4">{title}</Typography>
            <Typography color="text.secondary">{description}</Typography>
            {hasAction && (
                <Button
                    variant="contained"
                    onClick={onAction}
                    sx={{ color: 'text.primary', backgroundColor: 'var(--feature-accent)' }}
                >
                    {actionLabel}
                </Button>
            )}
        </Box>
    )
}
