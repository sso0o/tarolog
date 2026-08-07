// src/pages/MatchingPage.tsx
import { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { getAllCards } from '../lib/cards'
import { buildMatchingRounds } from '../lib/matching'
import type { MatchingRound, MatchingRoundOutcome, MatchingSessionResult } from '../lib/matching'
import type { MeaningDirection } from '../lib/quiz'
import { MatchingSetup } from '../components/MatchingSetup'
import { MatchingBoard } from '../components/MatchingBoard'
import { MatchingResult } from '../components/MatchingResult'
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, py: 8, px: 4 }}>
                            <Typography variant="body2" color="text.disabled" sx={{ m: 0, textAlign: 'center' }}>
                                {session.roundIndex + 1} / {session.rounds.length} 라운드
                            </Typography>
                            <MatchingBoard
                                key={session.roundIndex}
                                round={session.rounds[session.roundIndex]}
                                onRoundComplete={handleRoundComplete}
                            />
                        </Box>
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