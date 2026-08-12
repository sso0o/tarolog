// src/components/QuizQuestionCard.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import type { QuizQuestion } from '../../lib/quiz/quiz.ts'
import { colors } from '../../design/system.ts'

const CHOICE_LABELS = ['A', 'B', 'C', 'D'] as const

interface Props {
    question: QuizQuestion
    progress: string
    onNext: (choiceIndex: number) => void
}

export function QuizQuestionCard({ question, progress, onNext }: Props) {
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

    function choiceSx(index: number) {
        if (selected === null) {
            return { bgcolor: colors.paper, color: colors.ink, borderColor: colors.ink }
        }
        if (index === question.correctIndex) {
            return {
                bgcolor: colors.successSurface,
                color: colors.successInk,
                borderColor: colors.successInk,
                '&:hover': { bgcolor: colors.successSurface },
            }
        }
        if (index === selected) {
            return {
                bgcolor: colors.brick,
                color: colors.paper,
                borderColor: colors.ink,
                '&:hover': { bgcolor: colors.brick },
            }
        }
        return {
            bgcolor: colors.paper,
            color: colors.ink,
            borderColor: colors.ink,
            '&:hover': { bgcolor: colors.paper },
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, py: 8, px: 4 }}>
            <Typography variant="overline">{progress}</Typography>
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
                        variant="outlined"
                        aria-pressed={selected === index}
                        aria-disabled={selected !== null}
                        onClick={() => handleSelect(index)}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            textAlign: 'left',
                            gap: 2,
                            ...choiceSx(index),
                        }}
                    >
                        <Box component="span" sx={{ width: 32, fontFamily: 'Roboto Mono', flexShrink: 0 }}>
                            {CHOICE_LABELS[index]}
                        </Box>
                        <Typography component="span" sx={{ flex: 1, textAlign: 'left' }}>
                            {choice.text}
                        </Typography>
                        {selected !== null && (index === question.correctIndex || index === selected) && (
                            <Box
                                component="span"
                                sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'inherit', flexShrink: 0 }}
                            >
                                {index === question.correctIndex ? (
                                    <CheckCircleIcon fontSize="small" />
                                ) : (
                                    <CancelIcon fontSize="small" />
                                )}
                                <Box component="strong">
                                    {index === question.correctIndex ? '정답' : '오답'}
                                </Box>
                            </Box>
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
