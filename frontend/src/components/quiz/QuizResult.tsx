// src/components/QuizResult.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
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
    const [shouldMark, setShouldMark] = useState(true)
    const [applied, setApplied] = useState(false)

    const correctCount = answers.filter((answer, i) => answer === questions[i].correctIndex).length
    const wrongCards = questions.filter((q, i) => answers[i] !== q.correctIndex).map((q) => q.card)
    const correctCardIds = questions.filter((q, i) => answers[i] === q.correctIndex).map((q) => q.card.id)

    function handleApply() {
        if (shouldMark) onMarkMemorized(correctCardIds)
        setApplied(true)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 8, px: 4 }}>
            <Typography variant="h1" sx={{ m: 0 }}>{correctCount} / {questions.length}</Typography>

            {wrongCards.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                    <Typography variant="body2" fontWeight={600}>틀린 카드</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                        {wrongCards.map((c) => c.nameKo).join(', ')}
                    </Typography>
                </Box>
            )}

            {!applied ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <FormControlLabel
                        control={<Checkbox checked={shouldMark} onChange={(e) => setShouldMark(e.target.checked)} />}
                        label={<Typography variant="body2">정답 맞힌 카드를 외운 카드로 표시</Typography>}
                    />
                    <Button variant="contained" onClick={handleApply}>확인</Button>
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">반영했어요</Typography>
            )}

            <Box sx={{ display: 'flex', gap: 4 }}>
                <Button variant="outlined" onClick={onRestart}>다시 하기</Button>
                <Button variant="outlined" onClick={onBackToSetup}>설정으로</Button>
            </Box>
        </Box>
    )
}