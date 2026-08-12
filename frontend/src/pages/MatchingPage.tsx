// src/pages/MatchingPage.tsx
import { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import { getAllCards } from '../lib/shared/cards.ts'
import { buildMatchingRounds } from '../lib/matching/matching.ts'
import type { MatchingRound, MatchingRoundOutcome, MatchingSessionResult } from '../lib/matching/matching.ts'
import type { MeaningDirection } from '../types/study.ts'
import { MatchingSetup } from '../components/matching/MatchingSetup.tsx'
import { MatchingBoard } from '../components/matching/MatchingBoard.tsx'
import { MatchingResult } from '../components/matching/MatchingResult.tsx'
import { FocusLayout } from '../components/shared/FocusLayout.tsx'
import { ExitConfirmDialog } from '../components/shared/ExitConfirmDialog.tsx'
import type { Card } from '../types/card'

const PAIR_COUNT = 4

interface MatchingSession {
    rounds: MatchingRound[]
    pool: Card[]
    direction: MeaningDirection
    roundCount: number
    startedAt: number
    roundIndex: number
    wrongAttempts: number
    wrongCardIds: Set<string>
}

export function MatchingPage() {
    const navigate = useNavigate()
    const allCards = useMemo(() => getAllCards(), [])
    const [session, setSession] = useState<MatchingSession | null>(null)
    const [result, setResult] = useState<MatchingSessionResult | null>(null)
    const [confirmingEnd, setConfirmingEnd] = useState(false)

    function handleStart(pool: Card[], direction: MeaningDirection, roundCount: number) {
        const rounds = buildMatchingRounds(pool, direction, roundCount, PAIR_COUNT)
        setSession({
            rounds,
            pool,
            direction,
            roundCount,
            startedAt: Date.now(),
            roundIndex: 0,
            wrongAttempts: 0,
            wrongCardIds: new Set(),
        })
        setResult(null)
        navigate('/matching/playing')
    }

    function handleRoundComplete(outcome: MatchingRoundOutcome) {
        if (!session) return

        const wrongAttempts = session.wrongAttempts + outcome.wrongAttempts
        const wrongCardIds = new Set(session.wrongCardIds)
        outcome.wrongCardIds.forEach((id) => wrongCardIds.add(id))

        if (session.roundIndex + 1 < session.rounds.length) {
            setSession({ ...session, roundIndex: session.roundIndex + 1, wrongAttempts, wrongCardIds })
            return
        }

        setResult({
            elapsedMs: Date.now() - session.startedAt,
            wrongAttempts,
            wrongCardIds: [...wrongCardIds],
        })
        navigate('/matching/result')
    }

    function handleRestart() {
        if (!session) return
        const rounds = buildMatchingRounds(session.pool, session.direction, session.roundCount, PAIR_COUNT)
        setSession({
            ...session,
            rounds,
            startedAt: Date.now(),
            roundIndex: 0,
            wrongAttempts: 0,
            wrongCardIds: new Set(),
        })
        setResult(null)
        navigate('/matching/playing')
    }

    function handleBackToSetup() {
        setSession(null)
        setResult(null)
        navigate('/matching/setup')
    }

    function handleEnd() {
        setConfirmingEnd(false)
        setSession(null)
        setResult(null)
        navigate('/matching/setup')
    }

    const wrongCards = useMemo(() => {
        if (!session || !result) return []
        const cardsById = new Map(
            session.rounds.flatMap((round) => round.pairs).map((pair) => [pair.card.id, pair.card]),
        )
        return result.wrongCardIds.map((id) => cardsById.get(id)).filter((c): c is Card => c !== undefined)
    }, [session, result])

    return (
        <Routes>
            <Route path="setup" element={<MatchingSetup allCards={allCards} onStart={handleStart} />} />
            <Route
                path="playing"
                element={
                    session ? (
                        <>
                            <FocusLayout
                                title="카드 매칭"
                                progress={`${session.roundIndex + 1} / ${session.rounds.length} 라운드`}
                                onExit={() => setConfirmingEnd(true)}
                            >
                                <MatchingBoard
                                    key={session.roundIndex}
                                    round={session.rounds[session.roundIndex]}
                                    onRoundComplete={handleRoundComplete}
                                />
                            </FocusLayout>
                            <ExitConfirmDialog
                                open={confirmingEnd}
                                title="매칭을 종료할까요?"
                                description="현재 라운드의 진행 상황은 저장되지 않습니다."
                                onCancel={() => setConfirmingEnd(false)}
                                onConfirm={handleEnd}
                            />
                        </>
                    ) : (
                        <Navigate to="/matching/setup" replace />
                    )
                }
            />
            <Route
                path="result"
                element={
                    session && result ? (
                        <MatchingResult
                            elapsedMs={result.elapsedMs}
                            wrongAttempts={result.wrongAttempts}
                            wrongCards={wrongCards}
                            onRestart={handleRestart}
                            onBackToSetup={handleBackToSetup}
                        />
                    ) : (
                        <Navigate to="/matching/setup" replace />
                    )
                }
            />
            <Route path="*" element={<Navigate to="/matching/setup" replace />} />
        </Routes>
    )
}
