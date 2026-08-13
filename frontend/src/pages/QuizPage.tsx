// src/pages/QuizPage.tsx
import { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import { FocusLayout } from '../components/shared/FocusLayout.tsx'
import { ExitConfirmDialog } from '../components/shared/ExitConfirmDialog.tsx'
import { getAllCards } from '../lib/shared/cards.ts'
import { getMemorizedIds, markAllMemorized } from '../lib/shared/progress.ts'
import { buildQuiz } from '../lib/quiz/quiz.ts'
import type { MeaningDirection } from '../types/study.ts'
import type { QuizQuestion, QuizType } from '../lib/quiz/quiz.ts'
import { QuizSetup } from '../components/quiz/QuizSetup.tsx'
import { QuizQuestionCard } from '../components/quiz/QuizQuestionCard.tsx'
import { QuizResult } from '../components/quiz/QuizResult.tsx'
import { useInterstitialAd } from '../hooks/useInterstitialAd.ts'
import type { Card } from '../types/card'

interface QuizSession {
    questions: QuizQuestion[]
    pool: Card[]
    quizType: QuizType
    direction: MeaningDirection
}

export function QuizPage() {
    const navigate = useNavigate()
    const showThenRun = useInterstitialAd()
    const allCards = useMemo(() => getAllCards(), [])
    const [session, setSession] = useState<QuizSession | null>(null)
    const [index, setIndex] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])
    const [confirmingEnd, setConfirmingEnd] = useState(false)

    function handleStart(pool: Card[], quizType: QuizType, direction: MeaningDirection, count: number) {
        showThenRun(() => {
            const questions = buildQuiz(pool, quizType, direction, count)
            setSession({ questions, pool, quizType, direction })
            setIndex(0)
            setAnswers([])
            navigate('/quiz/playing')
        })
    }

    function handleAnswerChoice(choiceIndex: number) {
        if (!session) return
        const nextAnswers = [...answers, choiceIndex]
        setAnswers(nextAnswers)
        if (index + 1 < session.questions.length) {
            setIndex((i) => i + 1)
        } else {
            navigate('/quiz/result')
        }
    }

    function handleRestart() {
        if (!session) return
        const questions = buildQuiz(session.pool, session.quizType, session.direction, session.questions.length)
        setSession({ ...session, questions })
        setIndex(0)
        setAnswers([])
        navigate('/quiz/playing')
    }

    function handleBackToSetup() {
        setSession(null)
        setIndex(0)
        setAnswers([])
        navigate('/quiz/setup')
    }

    function handleEnd() {
        setConfirmingEnd(false)
        setSession(null)
        setIndex(0)
        setAnswers([])
        navigate('/quiz/setup')
    }

    return (
        <Routes>
            <Route
                path="setup"
                element={<QuizSetup allCards={allCards} memorizedIds={getMemorizedIds()} onStart={handleStart} />}
            />
            <Route
                path="playing"
                element={
                    session ? (
                        <>
                            <FocusLayout
                                title="퀴즈"
                                onExit={() => setConfirmingEnd(true)}
                            >
                                <QuizQuestionCard
                                    question={session.questions[index]}
                                    progress={`${index + 1} / ${session.questions.length}`}
                                    onNext={handleAnswerChoice}
                                />
                            </FocusLayout>
                            <ExitConfirmDialog
                                open={confirmingEnd}
                                title="퀴즈를 종료할까요?"
                                description="현재 퀴즈 진행 상황은 저장되지 않습니다."
                                onCancel={() => setConfirmingEnd(false)}
                                onConfirm={handleEnd}
                            />
                        </>
                    ) : (
                        <Navigate to="/quiz/setup" replace />
                    )
                }
            />
            <Route
                path="result"
                element={
                    session && answers.length === session.questions.length ? (
                        <QuizResult
                            questions={session.questions}
                            answers={answers}
                            onMarkMemorized={markAllMemorized}
                            onRestart={handleRestart}
                            onBackToSetup={handleBackToSetup}
                        />
                    ) : (
                        <Navigate to="/quiz/setup" replace />
                    )
                }
            />
            <Route path="*" element={<Navigate to="/quiz/setup" replace />} />
        </Routes>
    )
}
