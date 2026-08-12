// src/pages/SpreadManagePage.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import { useNavigate } from 'react-router'
import { PRESET_SPREADS } from '../lib/journal/presets.ts'
import { getCustomSpreads, addCustomSpread, deleteCustomSpread } from '../lib/journal/spreads.ts'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import { SetupSection } from '../components/shared/SetupSection.tsx'
import type { SpreadTemplate } from '../types/journal'

export function SpreadManagePage() {
    const navigate = useNavigate()
    const [customs, setCustoms] = useState<SpreadTemplate[]>(getCustomSpreads)
    const [name, setName] = useState('')
    const [positionsInput, setPositionsInput] = useState('')

    function handleAdd() {
        const positions = positionsInput.split(',').map((p) => p.trim()).filter(Boolean)
        if (!name.trim() || positions.length === 0) return
        try {
            const spread = addCustomSpread({ name: name.trim(), positions })
            setCustoms((prev) => [...prev, spread])
            setName('')
            setPositionsInput('')
        } catch {
            // localStorage 저장 실패 — 추가하지 않음
        }
    }

    function handleDelete(id: string) {
        try {
            deleteCustomSpread(id)
            setCustoms((prev) => prev.filter((s) => s.id !== id))
        } catch {
            // localStorage 저장 실패
        }
    }

    return (
        <Box sx={{ px: { xs: 4, sm: 6, md: 8 }, py: { xs: 6, md: 10 }, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/journal')}
                sx={{ alignSelf: 'flex-start' }}
            >
                일지
            </Button>

            <PageHeader title="스프레드 관리" compact />

            <SetupSection number="01" title="기본 스프레드">
                <List disablePadding>
                    {PRESET_SPREADS.map((s) => (
                        <ListItem key={s.id} disablePadding sx={{ py: 1 }}>
                            <ListItemText
                                primary={s.name}
                                secondary={s.positions.join(' · ')}
                            />
                        </ListItem>
                    ))}
                </List>
            </SetupSection>

            <SetupSection number="02" title="커스텀 스프레드">
                {customs.length === 0 ? (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        아직 커스텀 스프레드가 없습니다.
                    </Typography>
                ) : (
                    <List disablePadding>
                        {customs.map((s) => (
                            <ListItem
                                key={s.id}
                                disablePadding
                                sx={{ py: 1 }}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="삭제"
                                        onClick={() => handleDelete(s.id)}
                                        sx={{ minWidth: 48, minHeight: 48 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={s.name}
                                    secondary={s.positions.join(' · ')}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </SetupSection>

            <SetupSection number="03" title="새 커스텀 스프레드 추가">
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="스프레드 이름"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="포지션 (쉼표로 구분)"
                        placeholder="과거, 현재, 미래"
                        value={positionsInput}
                        onChange={(e) => setPositionsInput(e.target.value)}
                        fullWidth
                        helperText="예: 과거, 현재, 미래"
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleAdd}
                        disabled={!name.trim() || !positionsInput.trim()}
                        sx={{ minHeight: 48 }}
                    >
                        추가
                    </Button>
                </Box>
            </SetupSection>
        </Box>
    )
}
