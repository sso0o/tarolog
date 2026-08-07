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

    function choiceVariant(index: number): 'contained' | 'outlined' {
        if (selected === null) return 'outlined'
        return index === question.correctIndex || index === selected ? 'contained' : 'outlined'
    }

    function choiceColor(index: number): 'error' | 'primary' {
        if (selected !== null && index === selected && index !== question.correctIndex) return 'error'
        return 'primary'
    }

    function choiceSx(index: number) {
        if (selected !== null && index === question.correctIndex) {
            return { bgcolor: '#16a34a', color: '#ffffff', borderColor: '#16a34a', '&:hover': { bgcolor: '#16a34a' } }
        }
        return {}
    }

    function isWrongChoiceRevealed(index: number): boolean {
        return question.type === 'name-to-meaning' && selected !== null && index !== question.correctIndex
    }

    function captionColor(index: number): string {
        if (selected !== null && index === selected && index !== question.correctIndex) {
            return 'rgba(255,255,255,0.8)'
        }
        return 'text.disabled'
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
                    sx={{
                        borderRadius: '16px',
                        maxWidth: 240,
                        width: '100%',
                        height: 'auto',
                        transform: question.direction === 'reversed' ? 'rotate(180deg)' : 'none',
                    }}
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
                        key={choice.card.id}
                        variant={choiceVariant(index)}
                        color={choiceColor(index)}
                        onClick={() => handleSelect(index)}
                        disabled={selected !== null && index !== question.correctIndex && index !== selected}
                        sx={{
                            justifyContent: 'flex-start',
                            textAlign: 'left',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            ...choiceSx(index),
                        }}
                    >
                        <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                            {choice.text}
                        </Typography>
                        {isWrongChoiceRevealed(index) && (
                            <Typography component="span" variant="caption" sx={{ color: captionColor(index) }}>
                                {choice.card.nameKo}
                            </Typography>
                        )}
                    </Button>
                ))}
            </Box>

            <Button variant="contained" disabled={selected === null} onClick={handleNext}>
                다음 문제
            </Button>
        </Box>
    )
}