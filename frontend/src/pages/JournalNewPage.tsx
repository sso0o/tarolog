// src/pages/JournalNewPage.tsx
import { useMemo, useState } from 'react'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
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
import { FocusLayout } from '../components/shared/FocusLayout.tsx'
import { SetupSection } from '../components/shared/SetupSection.tsx'
import { ExitConfirmDialog } from '../components/shared/ExitConfirmDialog.tsx'
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
    const [saveFailed, setSaveFailed] = useState(false)
    const [confirmingExit, setConfirmingExit] = useState(false)

    const hasDraft = question.trim() !== ''
        || spread !== null
        || cardSlots.some((slot) => slot.cardId !== '')
        || interpretation.trim() !== ''

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

    function handleSetReversed(position: string, reversed: boolean) {
        setCardSlots((prev) =>
            prev.map((slot) =>
                slot.position === position ? { ...slot, reversed } : slot,
            ),
        )
    }

    function handleSave() {
        setSaveFailed(false)
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
            setSaveFailed(true)
        }
    }

    function handleRequestExit() {
        if (!hasDraft) {
            navigate('/journal')
            return
        }
        setConfirmingExit(true)
    }

    function handleConfirmExit() {
        setConfirmingExit(false)
        navigate('/journal')
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <>
                <FocusLayout
                    title="새 리딩 기록"
                    onExit={handleRequestExit}
                    actions={
                        <Button
                            variant="contained"
                            fullWidth
                            disabled={!spread}
                            onClick={handleSave}
                            sx={{ minHeight: 52, color: 'text.primary', backgroundColor: 'var(--feature-accent)' }}
                        >
                            저장
                        </Button>
                    }
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <SetupSection number="01" title="날짜와 질문">
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <DateTimePicker
                                    label="날짜/시간"
                                    value={date}
                                    onChange={(value) => value && setDate(value)}
                                    slotProps={{ textField: { fullWidth: true } }}
                                />
                                <TextField
                                    label="질문/의도"
                                    multiline
                                    minRows={2}
                                    fullWidth
                                    value={question}
                                    onChange={(event) => setQuestion(event.target.value)}
                                    placeholder="오늘의 리딩 주제나 질문을 적어주세요."
                                />
                            </Box>
                        </SetupSection>

                        <SetupSection number="02" title="스프레드">
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
                        </SetupSection>

                        <SetupSection number="03" title="카드 배치">
                            {spread ? (
                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {cardSlots.map((slot) => {
                                        const card = slot.cardId ? cardMap.get(slot.cardId) : undefined
                                        return (
                                            <Box
                                                key={slot.position}
                                                sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}
                                            >
                                                <Typography variant="body2" color="text.secondary" sx={{ minWidth: 80 }}>
                                                    {slot.position}
                                                </Typography>
                                                <Button
                                                    variant={card ? 'contained' : 'outlined'}
                                                    size="small"
                                                    onClick={() => setCardPickerPosition(slot.position)}
                                                    sx={{
                                                        minHeight: 48,
                                                        flex: 1,
                                                        justifyContent: 'flex-start',
                                                        ...(card && { backgroundColor: 'var(--feature-accent)', color: 'text.primary' }),
                                                    }}
                                                >
                                                    {card ? card.nameKo : '카드 선택'}
                                                </Button>
                                                {card && (
                                                    <ToggleButtonGroup
                                                        value={slot.reversed ? 'reversed' : 'up'}
                                                        exclusive
                                                        size="small"
                                                        onChange={(_, v: 'up' | 'reversed' | null) => {
                                                            if (v) handleSetReversed(slot.position, v === 'reversed')
                                                        }}
                                                        aria-label="정방향/역방향"
                                                    >
                                                        <ToggleButton value="up">정방향</ToggleButton>
                                                        <ToggleButton value="reversed">역방향</ToggleButton>
                                                    </ToggleButtonGroup>
                                                )}
                                            </Box>
                                        )
                                    })}
                                </Box>
                            ) : (
                                <Typography color="text.secondary">먼저 스프레드를 선택하세요.</Typography>
                            )}
                        </SetupSection>

                        <SetupSection number="04" title="해석">
                            <TextField
                                label="해석"
                                multiline
                                minRows={4}
                                fullWidth
                                value={interpretation}
                                onChange={(event) => setInterpretation(event.target.value)}
                                placeholder="리딩 해석을 자유롭게 적어주세요."
                            />
                        </SetupSection>

                        {saveFailed && (
                            <Alert
                                severity="error"
                                role="alert"
                                action={<Button onClick={handleSave}>다시 시도</Button>}
                                onClose={() => setSaveFailed(false)}
                            >
                                저장에 실패했습니다. 작성 내용은 그대로 유지됩니다.
                            </Alert>
                        )}
                    </Box>
                </FocusLayout>

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

                <ExitConfirmDialog
                    open={confirmingExit}
                    title="작성 중인 리딩을 나갈까요?"
                    description="저장하지 않은 작성 내용은 사라집니다."
                    confirmLabel="나가기"
                    onCancel={() => setConfirmingExit(false)}
                    onConfirm={handleConfirmExit}
                />
            </>
        </LocalizationProvider>
    )
}
