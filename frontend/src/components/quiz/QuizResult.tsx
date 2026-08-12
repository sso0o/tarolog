// src/components/QuizResult.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import type { QuizQuestion } from '../../lib/quiz/quiz.ts'

interface Props {
    questions: QuizQuestion[]
    answers: number[]
    onMarkMemorized: (cardIds: string[]) => void
    onRestart: () => void
    onBackToSetup: () => void
}

export function QuizResult({ questions, answers, onMarkMemorized, onRestart, onBackToSetup }: Props) {
    const [applied, setApplied] = useState(false)

    const correctCount = answers.filter((answer, i) => answer === questions[i].correctIndex).length
    const wrongCards = questions.filter((q, i) => answers[i] !== q.correctIndex).map((q) => q.card)
    const correctCardIds = questions.filter((q, i) => answers[i] === q.correctIndex).map((q) => q.card.id)

    function handleApply() {
        onMarkMemorized(correctCardIds)
        setApplied(true)
    }

    return (
        <Box
            sx={{
                width: 'calc(100% - 32px)',
                maxWidth: 720,
                mx: 'auto',
                my: { xs: 6, md: 10 },
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                p: { xs: 4, sm: 6 },
                bgcolor: 'background.paper',
                border: '3px solid',
                borderColor: 'text.primary',
                boxShadow: 4,
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="overline" color="text.secondary">RESULT SHEET</Typography>
                <Typography variant="h2">퀴즈 결과</Typography>
            </Box>
            <Typography variant="h1" sx={{ fontSize: { xs: '3.5rem', sm: '5rem' } }}>
                {correctCount} / {questions.length}
            </Typography>

            <Divider sx={{ borderColor: 'text.primary' }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h6">틀린 카드</Typography>
                <Typography color="text.secondary">
                    {wrongCards.length > 0
                        ? wrongCards.map((card) => card.nameKo).join(' · ')
                        : '모두 맞혔어요.'}
                </Typography>
            </Box>

            <Divider sx={{ borderColor: 'text.primary' }} />

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' }, gap: 2 }}>
                <Button variant="contained" disabled={applied} onClick={handleApply}>
                    {applied ? '✓ 반영 완료' : '외운 카드로 표시'}
                </Button>
                <Button variant="outlined" onClick={onRestart}>다시 풀기</Button>
                <Button variant="outlined" onClick={onBackToSetup}>설정으로</Button>
            </Box>
        </Box>
    )
}
