// src/components/QuizQuestionCard.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import type { QuizQuestion } from '../lib/quiz'

interface Props {
    question: QuizQuestion
    questionNumber: number
    totalQuestions: number
    onNext: (choiceIndex: number) => void
}

export function QuizQuestionCard({ question, questionNumber, totalQuestions, onNext }: Props) {
    const [selected, setSelected] = useState<number | null>(null)

    function handleSelect(index: number) {
        if (selected !== null) return
        setSelected(index)
    }

    function handleNext() {
        if (selected === null) return
        onNext(selected)
        setSelected(null)
    }

    function choiceColor(index: number): 'success' | 'error' | 'primary' {
        if (selected === null) return 'primary'
        if (index === question.correctIndex) return 'success'
        if (index === selected) return 'error'
        return 'primary'
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 8, px: 4 }}>
            <Typography variant="body2" color="text.disabled" sx={{ m: 0 }}>
                {questionNumber} / {totalQuestions}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <Box
                    component="img"
                    src={import.meta.env.BASE_URL + question.card.image.slice(1)}
                    alt={question.type === 'image-to-name' ? '이 카드의 이름은?' : question.card.nameKo}
                    sx={{ borderRadius: '16px', maxWidth: 240, width: '100%', height: 'auto' }}
                />
                {question.type === 'name-to-meaning' && (
                    <>
                        <Typography variant="h2" sx={{ m: 0 }}>{question.card.nameKo}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {question.direction === 'up' ? '정방향' : '역방향'} 의미는?
                        </Typography>
                    </>
                )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 400 }}>
                {question.choices.map((choice, index) => (
                    <Button
                        key={choice}
                        variant="outlined"
                        color={choiceColor(index)}
                        onClick={() => handleSelect(index)}
                        disabled={selected !== null && index !== question.correctIndex && index !== selected}
                        sx={{ justifyContent: 'flex-start', textAlign: 'left' }}
                    >
                        {choice}
                    </Button>
                ))}
            </Box>

            <Button variant="contained" disabled={selected === null} onClick={handleNext}>
                다음 문제
            </Button>
        </Box>
    )
}