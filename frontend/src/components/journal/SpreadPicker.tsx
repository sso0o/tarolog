// src/components/journal/SpreadPicker.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { PRESET_SPREADS } from '../../lib/journal/presets.ts'
import { addCustomSpread } from '../../lib/journal/spreads.ts'
import type { SpreadTemplate } from '../../types/journal'

interface Props {
    open: boolean
    customSpreads: SpreadTemplate[]
    minPositions?: number
    onSelect: (spread: SpreadTemplate) => void
    onSpreadCreated?: (spread: SpreadTemplate) => void
    onClose: () => void
}

export function SpreadPicker({ open, customSpreads, minPositions, onSelect, onSpreadCreated, onClose }: Props) {
    const [name, setName] = useState('')
    const [positionsInput, setPositionsInput] = useState('')

    const visiblePresets = minPositions
        ? PRESET_SPREADS.filter((s) => s.positions.length >= minPositions)
        : PRESET_SPREADS
    const visibleCustoms = minPositions
        ? customSpreads.filter((s) => s.positions.length >= minPositions)
        : customSpreads

    function handleClose() {
        setName('')
        setPositionsInput('')
        onClose()
    }

    function handlePick(spread: SpreadTemplate) {
        onSelect(spread)
        handleClose()
    }

    function handleCreate() {
        const positions = positionsInput.split(',').map((p) => p.trim()).filter(Boolean)
        if (!name.trim() || positions.length === 0) return
        try {
            const spread = addCustomSpread({ name: name.trim(), positions })
            onSpreadCreated?.(spread)
            handlePick(spread)
        } catch {
            // localStorage 저장 실패 — 추가하지 않음
        }
    }

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={handleClose}
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
                {minPositions !== undefined && (
                    <Typography variant="caption" color="text.secondary">
                        카드 {minPositions}장에 맞는 스프레드만 표시
                    </Typography>
                )}
            </Box>
            <List sx={{ pb: minPositions !== undefined ? 0 : 'calc(16px + env(safe-area-inset-bottom))' }}>
                {visiblePresets.length > 0 && (
                    <>
                        <Typography variant="overline" color="text.secondary" sx={{ px: 2 }}>기본</Typography>
                        {visiblePresets.map((s) => (
                            <ListItemButton key={s.id} onClick={() => handlePick(s)} sx={{ minHeight: 56 }}>
                                <ListItemText primary={s.name} secondary={s.positions.join(' · ')} />
                            </ListItemButton>
                        ))}
                    </>
                )}
                {visibleCustoms.length > 0 && (
                    <>
                        <Divider />
                        <Typography variant="overline" color="text.secondary" sx={{ px: 2 }}>커스텀</Typography>
                        {visibleCustoms.map((s) => (
                            <ListItemButton key={s.id} onClick={() => handlePick(s)} sx={{ minHeight: 56 }}>
                                <ListItemText primary={s.name} secondary={s.positions.join(' · ')} />
                            </ListItemButton>
                        ))}
                    </>
                )}
            </List>
            {minPositions !== undefined && (
                <Box
                    sx={{
                        px: 2,
                        py: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderTop: '2px solid',
                        borderColor: 'text.primary',
                        pb: 'calc(16px + env(safe-area-inset-bottom))',
                    }}
                >
                    <Typography variant="subtitle2">새 스프레드 만들기</Typography>
                    <TextField label="스프레드 이름" size="small" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
                    <TextField
                        label="포지션 (쉼표로 구분)"
                        placeholder="과거, 현재, 미래"
                        size="small"
                        value={positionsInput}
                        onChange={(e) => setPositionsInput(e.target.value)}
                        fullWidth
                    />
                    <Button
                        variant="contained"
                        onClick={handleCreate}
                        disabled={!name.trim() || !positionsInput.trim()}
                        sx={{ minHeight: 44 }}
                    >
                        만들고 선택하기
                    </Button>
                </Box>
            )}
        </Drawer>
    )
}