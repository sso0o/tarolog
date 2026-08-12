// src/pages/FlashcardPage.tsx
import { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { getAllCards, selectStudyCards } from '../lib/shared/cards.ts'
import { getMemorizedIds, toggleMemorized } from '../lib/shared/progress.ts'
import { FlashcardSetup } from '../components/flashcard/FlashcardSetup.tsx'
import { Flashcard } from '../components/flashcard/Flashcard.tsx'
import { FocusLayout } from '../components/shared/FocusLayout.tsx'
import { ExitConfirmDialog } from '../components/shared/ExitConfirmDialog.tsx'
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
                        <>
                            <FocusLayout
                                title="플래시카드"
                                onExit={() => setConfirmingEnd(true)}
                                actions={
                                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
                                        <Button variant="outlined" onClick={prev}>이전</Button>
                                        <Button variant="contained" onClick={next}>다음</Button>
                                    </Box>
                                }
                            >
                                <Flashcard
                                    card={session.cards[index]}
                                    direction={session.direction}
                                    memorized={memorizedIds.has(session.cards[index].id)}
                                    progress={`${index + 1} / ${session.cards.length}`}
                                    onToggleMemorized={() => handleToggle(session.cards[index].id)}
                                />
                            </FocusLayout>
                            <ExitConfirmDialog
                                open={confirmingEnd}
                                title="학습을 종료할까요?"
                                description="현재 학습 위치는 저장되지 않습니다. 외운 카드 표시는 유지됩니다."
                                onCancel={() => setConfirmingEnd(false)}
                                onConfirm={handleConfirmEnd}
                            />
                        </>
                    ) : (
                        <Navigate to="/flashcard/setup" replace />
                    )
                }
            />
            <Route path="*" element={<Navigate to="/flashcard/setup" replace />} />
        </Routes>
    )
}
