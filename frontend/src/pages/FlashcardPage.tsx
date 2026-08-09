// src/pages/FlashcardPage.tsx
import { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography'
import { getAllCards, selectStudyCards } from '../lib/shared/cards.ts'
import { getMemorizedIds, toggleMemorized } from '../lib/shared/progress.ts'
import { FlashcardSetup } from '../components/flashcard/FlashcardSetup.tsx'
import { Flashcard } from '../components/flashcard/Flashcard.tsx'
import type { StudyDirection } from '../types/study.ts'
import type { Card } from '../types/card'

interface StudySession {
    cards: Card[]
    direction: StudyDirection
}

export function FlashcardPage() {
    const navigate = useNavigate()
    const allCards = useMemo(() => getAllCards(), [])
    const [session, setSession] = useState<StudySession | null>(null)
    const [index, setIndex] = useState(0)
    const [memorizedIds, setMemorizedIds] = useState(() => new Set(getMemorizedIds()))
    const [confirmingEnd, setConfirmingEnd] = useState(false)

    function handleStart(pool: Card[], direction: StudyDirection, count: number) {
        setSession({ cards: selectStudyCards(pool, count), direction })
        setIndex(0)
        navigate('/flashcard/playing')
    }

    function next() {
        if (!session) return
        setIndex((i) => (i + 1) % session.cards.length)
    }

    function prev() {
        if (!session) return
        setIndex((i) => (i - 1 + session.cards.length) % session.cards.length)
    }

    function handleToggle(cardId: string) {
        toggleMemorized(cardId)
        setMemorizedIds(new Set(getMemorizedIds()))
    }

    function handleConfirmEnd() {
        setConfirmingEnd(false)
        setSession(null)
        setIndex(0)
        navigate('/dictionary')
    }

    return (
        <Routes>
            <Route
                path="setup"
                element={<FlashcardSetup allCards={allCards} memorizedIds={getMemorizedIds()} onStart={handleStart} />}
            />
            <Route
                path="playing"
                element={
                    session ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, py: 16 }}>
                            <Typography variant="body2" color="text.disabled" sx={{ m: 0 }}>
                                {index + 1} / {session.cards.length}
                            </Typography>
                            <Flashcard
                                card={session.cards[index]}
                                direction={session.direction}
                                memorized={memorizedIds.has(session.cards[index].id)}
                                onToggleMemorized={() => handleToggle(session.cards[index].id)}
                            />
                            <Box sx={{ display: 'flex', gap: 4 }}>
                                <Button variant="outlined" onClick={prev}>이전</Button>
                                <Button variant="outlined" onClick={next}>다음</Button>
                            </Box>
                            <Button color="error" onClick={() => setConfirmingEnd(true)}>학습종료</Button>
                            <Dialog open={confirmingEnd} onClose={() => setConfirmingEnd(false)}>
                                <DialogTitle>학습을 종료할까요?</DialogTitle>
                                <DialogActions>
                                    <Button onClick={() => setConfirmingEnd(false)}>취소</Button>
                                    <Button color="error" onClick={handleConfirmEnd}>종료</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    ) : (
                        <Navigate to="/flashcard/setup" replace />
                    )
                }
            />
            <Route path="*" element={<Navigate to="/flashcard/setup" replace />} />
        </Routes>
    )
}