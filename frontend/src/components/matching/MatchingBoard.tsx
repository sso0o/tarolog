// src/components/MatchingBoard.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { isMatch } from '../../lib/matching/matching.ts'
import type { MatchingRound, MatchingRoundOutcome } from '../../lib/matching/matching.ts'

interface Props {
    round: MatchingRound
    onRoundComplete: (outcome: MatchingRoundOutcome) => void
}

const WRONG_FLASH_MS = 500

export function MatchingBoard({ round, onRoundComplete }: Props) {
    const [matchedCardIds, setMatchedCardIds] = useState<Set<string>>(new Set())
    const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
    const [selectedMeaningId, setSelectedMeaningId] = useState<string | null>(null)
    const [wrongIds, setWrongIds] = useState<{ imageId: string; meaningId: string } | null>(null)
    const [wrongAttempts, setWrongAttempts] = useState(0)
    const [wrongCardIds, setWrongCardIds] = useState<Set<string>>(new Set())

    function evaluate(imageId: string, meaningId: string) {
        const imageItem = round.imageItems.find((item) => item.id === imageId)
        const meaningItem = round.meaningItems.find((item) => item.id === meaningId)
        if (!imageItem || !meaningItem) return

        if (isMatch(imageItem, meaningItem)) {
            const nextMatched = new Set(matchedCardIds)
            nextMatched.add(imageItem.cardId)
            setMatchedCardIds(nextMatched)
            setSelectedImageId(null)
            setSelectedMeaningId(null)

            if (nextMatched.size === round.pairs.length) {
                onRoundComplete({ wrongAttempts, wrongCardIds: [...wrongCardIds] })
            }
            return
        }

        setSelectedImageId(imageId)
        setSelectedMeaningId(meaningId)
        setWrongIds({ imageId, meaningId })
        setWrongAttempts((n) => n + 1)
        setWrongCardIds((prev) => {
            const next = new Set(prev)
            next.add(imageItem.cardId)
            next.add(meaningItem.cardId)
            return next
        })
        setTimeout(() => {
            setWrongIds(null)
            setSelectedImageId(null)
            setSelectedMeaningId(null)
        }, WRONG_FLASH_MS)
    }

    function handleSelectImage(id: string) {
        if (wrongIds) return
        const item = round.imageItems.find((i) => i.id === id)
        if (item && matchedCardIds.has(item.cardId)) return
        if (selectedImageId === id) {
            setSelectedImageId(null)
            return
        }
        if (selectedMeaningId) {
            evaluate(id, selectedMeaningId)
        } else {
            setSelectedImageId(id)
        }
    }

    function handleSelectMeaning(id: string) {
        if (wrongIds) return
        const item = round.meaningItems.find((i) => i.id === id)
        if (item && matchedCardIds.has(item.cardId)) return
        if (selectedMeaningId === id) {
            setSelectedMeaningId(null)
            return
        }
        if (selectedImageId) {
            evaluate(selectedImageId, id)
        } else {
            setSelectedMeaningId(id)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, flex: 1 }}>
                {round.imageItems.map((item) => {
                    const isMatched = matchedCardIds.has(item.cardId)
                    return (
                        <Box
                            key={item.id}
                            component="img"
                            src={import.meta.env.BASE_URL + item.label.slice(1)}
                            alt="카드"
                            onClick={() => handleSelectImage(item.id)}
                            sx={{
                                borderRadius: '16px',
                                width: '100%',
                                maxWidth: 140,
                                height: 'auto',
                                mx: 'auto',
                                cursor: isMatched ? 'default' : 'pointer',
                                opacity: isMatched ? 0.35 : 1,
                                filter: isMatched ? 'grayscale(1)' : 'none',
                                border: '3px solid',
                                borderColor:
                                    wrongIds?.imageId === item.id
                                        ? 'error.main'
                                        : selectedImageId === item.id
                                            ? 'primary.main'
                                            : 'transparent',
                            }}
                        />
                    )
                })}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                {round.meaningItems.map((item) => {
                    const isMatched = matchedCardIds.has(item.cardId)
                    return (
                        <Button
                            key={item.id}
                            variant={selectedMeaningId === item.id ? 'contained' : 'outlined'}
                            color={wrongIds?.meaningId === item.id ? 'error' : 'primary'}
                            disabled={isMatched}
                            onClick={() => handleSelectMeaning(item.id)}
                            sx={{
                                textAlign: 'left',
                                justifyContent: 'flex-start',
                                opacity: isMatched ? 0.35 : 1,
                            }}
                        >
                            <Typography component="span" sx={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
                                {item.label}
                            </Typography>
                        </Button>
                    )
                })}
            </Box>
        </Box>
    )
}