// src/pages/JournalNewPage.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Snackbar from '@mui/material/Snackbar'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router'
import { addReading } from '../lib/journal/journal.ts'
import { getCustomSpreads } from '../lib/journal/spreads.ts'
import { getAllCards } from '../lib/shared/cards.ts'
import { SpreadPicker } from '../components/journal/SpreadPicker.tsx'
import { CardPicker } from '../components/journal/CardPicker.tsx'
import type { SpreadTemplate, ReadingCard } from '../types/journal'
import type { Card } from '../types/card'

export function JournalNewPage() {
    const navigate = useNavigate()
    const customSpreads = useMemo(() => getCustomSpreads(), [])
    const allCards = useMemo(() => getAllCards(), [])
    const cardMap = useMemo(
        () => new Map<string, Card>(allCards.map((c) => [c.id, c])),
        [allCards],
    )

    const [date, setDate] = useState(() => dayjs())
    const [question, setQuestion] = useState('')
    const [spread, setSpread] = useState<SpreadTemplate | null>(null)
    const [cardSlots, setCardSlots] = useState<ReadingCard[]>([])
    const [interpretation, setInterpretation] = useState('')
    const [spreadPickerOpen, setSpreadPickerOpen] = useState(false)
    const [cardPickerPosition, setCardPickerPosition] = useState<string | null>(null)
    const [snackbar, setSnackbar] = useState(false)

    function handleSelectSpread(s: SpreadTemplate) {
        setSpread(s)
        setCardSlots(s.positions.map((p) => ({ position: p, cardId: '', reversed: false })))
    }

    function handleSelectCard(card: Card) {
        if (!cardPickerPosition) return
        setCardSlots((prev) =>
            prev.map((slot) =>
                slot.position === cardPickerPosition ? { ...slot, cardId: card.id } : slot,
            ),
        )
    }

    function handleToggleReversed(position: string) {
        setCardSlots((prev) =>
            prev.map((slot) =>
                slot.position === position ? { ...slot, reversed: !slot.reversed } : slot,
            ),
        )
    }

    function handleSave() {
        if (!spread) return
        try {
            addReading({
                createdAt: date.toISOString(),
                question,
                spread: { name: spread.name, positions: spread.positions },
                cards: cardSlots.filter((s) => s.cardId !== ''),
                interpretation,
            })
            navigate('/journal')
        } catch {
            setSnackbar(true)
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ px: 4, py: 4, pb: '88px', display: 'flex', flexDirection: 'column', gap: 4 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/journal')}
                    sx={{ alignSelf: 'flex-start' }}
                >
                    일지
                </Button>

                <Typography variant="h6">새 리딩 기록</Typography>

                <DateTimePicker
                    label="날짜/시간"
                    value={date}
                    onChange={(v) => v && setDate(v)}
                    slotProps={{ textField: { fullWidth: true } }}
                />

                <TextField
                    label="질문/의도"
                    multiline
                    minRows={2}
                    fullWidth
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="오늘의 리딩 주제나 질문을 적어주세요."
                />

                <Box>
                    <Typography variant="overline" color="text.secondary">스프레드</Typography>
                    <Box sx={{ mt: 1 }}>
                        {spread ? (
                            <Chip
                                label={spread.name}
                                onDelete={() => { setSpread(null); setCardSlots([]) }}
                            />
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() => setSpreadPickerOpen(true)}
                                sx={{ minHeight: 48 }}
                            >
                                스프레드 선택
                            </Button>
                        )}
                    </Box>
                </Box>

                {spread && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="overline" color="text.secondary">카드 배치</Typography>
                        {cardSlots.map((slot) => {
                            const card = slot.cardId ? cardMap.get(slot.cardId) : undefined
                            return (
                                <Box
                                    key={slot.position}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}
                                >
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ minWidth: 80 }}
                                    >
                                        {slot.position}
                                    </Typography>
                                    <Button
                                        variant={card ? 'contained' : 'outlined'}
                                        size="small"
                                        onClick={() => setCardPickerPosition(slot.position)}
                                        sx={{ minHeight: 48, flex: 1, justifyContent: 'flex-start' }}
                                    >
                                        {card ? card.nameKo : '카드 선택'}
                                    </Button>
                                    {card && (
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={slot.reversed}
                                                    onChange={() => handleToggleReversed(slot.position)}
                                                    size="small"
                                                />
                                            }
                                            label="역방향"
                                        />
                                    )}
                                </Box>
                            )
                        })}
                    </Box>
                )}

                <TextField
                    label="해석"
                    multiline
                    minRows={4}
                    fullWidth
                    value={interpretation}
                    onChange={(e) => setInterpretation(e.target.value)}
                    placeholder="리딩 해석을 자유롭게 적어주세요."
                />
            </Box>

            <Box
                sx={{
                    position: 'fixed', bottom: 56, left: 0, right: 0,
                    px: 4, py: 2,
                    bgcolor: 'background.paper',
                    borderTop: 1, borderColor: 'divider',
                }}
            >
                <Button
                    variant="contained"
                    fullWidth
                    disabled={!spread}
                    onClick={handleSave}
                    sx={{ minHeight: 48 }}
                >
                    저장
                </Button>
            </Box>

            <SpreadPicker
                open={spreadPickerOpen}
                customSpreads={customSpreads}
                onSelect={handleSelectSpread}
                onClose={() => setSpreadPickerOpen(false)}
            />

            <CardPicker
                open={cardPickerPosition !== null}
                onSelect={handleSelectCard}
                onClose={() => setCardPickerPosition(null)}
            />

            <Snackbar
                open={snackbar}
                onClose={() => setSnackbar(false)}
                message="저장에 실패했습니다. 다시 시도해주세요."
                autoHideDuration={3000}
            />
        </LocalizationProvider>
    )
}