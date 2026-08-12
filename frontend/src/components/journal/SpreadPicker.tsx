// src/components/journal/SpreadPicker.tsx
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'
import { PRESET_SPREADS } from '../../lib/journal/presets.ts'
import type { SpreadTemplate } from '../../types/journal'

interface Props {
    open: boolean
    customSpreads: SpreadTemplate[]
    onSelect: (spread: SpreadTemplate) => void
    onClose: () => void
}

export function SpreadPicker({ open, customSpreads, onSelect, onClose }: Props) {
    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    maxHeight: '80vh',
                    borderRadius: 0,
                    borderTop: '3px solid',
                    borderColor: 'text.primary',
                },
            }}
        >
            <Box sx={{ px: 2, pt: 2, pb: 1, position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>스프레드 선택</Typography>
            </Box>
            <List sx={{ pb: 'calc(16px + env(safe-area-inset-bottom))' }}>
                <Typography variant="overline" color="text.secondary" sx={{ px: 2 }}>기본</Typography>
                {PRESET_SPREADS.map((s) => (
                    <ListItemButton
                        key={s.id}
                        onClick={() => { onSelect(s); onClose() }}
                        sx={{ minHeight: 56 }}
                    >
                        <ListItemText primary={s.name} secondary={s.positions.join(' · ')} />
                    </ListItemButton>
                ))}
                {customSpreads.length > 0 && (
                    <>
                        <Divider />
                        <Typography variant="overline" color="text.secondary" sx={{ px: 2 }}>커스텀</Typography>
                        {customSpreads.map((s) => (
                            <ListItemButton
                                key={s.id}
                                onClick={() => { onSelect(s); onClose() }}
                                sx={{ minHeight: 56 }}
                            >
                                <ListItemText primary={s.name} secondary={s.positions.join(' · ')} />
                            </ListItemButton>
                        ))}
                    </>
                )}
            </List>
        </Drawer>
    )
}
