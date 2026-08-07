// src/pages/QuizPage.tsx
import { useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router'
import { getAllCards } from '../lib/cards'
import { getMemorizedIds, markAllMemorized } from '../lib/progress'
import { buildQuiz } from '../lib/quiz'
import type { MeaningDirection, QuizQuestion, QuizType } from '../lib/quiz'
import { QuizSetup } from '../components/QuizSetup'
import { QuizQuestionCard } from '../components/QuizQuestionCard'
import { QuizResult } from '../components/QuizResult'
import type { Card } from '../types/card'

interface QuizSession {
    questions: QuizQuestion[]
    pool: Card[]
    quizType: QuizType
    direction: MeaningDirection
}

export function QuizPage() {
    const navigate = useNavigate()
    const allCards = useMemo(() => getAllCards(), [])
    const [session, setSession] = useState<QuizSession | null>(null)
    const [index, setIndex] = useState(0)
    const [answers, setAnswers] = useState<number[]>([])

    function handleStart(pool: Card[], quizType: QuizType, direction: MeaningDirection, count: number) {
        const questions = buildQuiz(pool, quizType, direction, count)
        setSession({ questions, pool, quizType, direction })
        setIndex(0)
        setAnswers([])
        navigate('/quiz/playing')
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
                        <QuizQuestionCard
                            question={session.questions[index]}
                            questionNumber={index + 1}
                            totalQuestions={session.questions.length}
                            onNext={handleAnswerChoice}
                        />
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