// src/components/MatchingBoard.tsx
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { isMatch } from '../../lib/matching/matching.ts'
import type { MatchingRound, MatchingRoundOutcome } from '../../lib/matching/matching.ts'
import { colors } from '../../design/system.ts'

interface Props {
    round: MatchingRound
    progress: string
    onRoundComplete: (outcome: MatchingRoundOutcome) => void
}

const WRONG_FLASH_MS = 500

function itemStateSx(selected: boolean, wrong: boolean, matched: boolean) {
    const base = {
        minHeight: 72,
        border: '2px solid',
        borderColor: colors.ink,
        color: colors.ink,
        bgcolor: colors.paper,
        '&.Mui-disabled': { opacity: 1 },
    }

    if (matched) {
        return {
            ...base,
            color: colors.successInk,
            bgcolor: colors.successSurface,
            borderColor: colors.successInk,
            '&.Mui-disabled': { opacity: 1, color: colors.successInk },
        }
    }
    if (wrong) {
        return {
            ...base,
            color: colors.paper,
            bgcolor: colors.brick,
            border: '4px double',
            borderColor: colors.ink,
            backgroundImage: `repeating-linear-gradient(135deg, transparent 0 8px, ${colors.ink} 8px 10px)`,
        }
    }
    if (selected) return { ...base, bgcolor: colors.lavender }
    return base
}

export function MatchingBoard({ round, progress, onRoundComplete }: Props) {
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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Typography variant="overline" sx={{ textAlign: 'center' }}>{progress}</Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box component="section" aria-label="이미지 카드" sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <Typography variant="overline">IMAGE CARDS</Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 2 }}>
                    {round.imageItems.map((item, index) => {
                        const isMatched = matchedCardIds.has(item.cardId)
                        const isSelected = selectedImageId === item.id
                        const isWrong = wrongIds?.imageId === item.id
                        const cardName = round.pairs.find((pair) => pair.card.id === item.cardId)?.card.nameKo ?? '카드'

                        return (
                            <Button
                                key={item.id}
                                type="button"
                                variant="outlined"
                                aria-label={`이미지 카드 ${index + 1}`}
                                aria-pressed={isSelected}
                                disabled={isMatched}
                                onClick={() => handleSelectImage(item.id)}
                                sx={{
                                    ...itemStateSx(isSelected, isWrong, isMatched),
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 1,
                                    p: 2,
                                }}
                            >
                                <Box
                                    component="img"
                                    src={import.meta.env.BASE_URL + item.label.slice(1)}
                                    alt={cardName}
                                    sx={{ width: '100%', maxWidth: 140, height: 'auto', borderRadius: 0 }}
                                />
                                {isSelected && !isWrong && !isMatched && <Box component="span">선택됨</Box>}
                                {isWrong && <Box component="span">✕ 오답</Box>}
                                {isMatched && <Box component="span">✓ 매칭 완료</Box>}
                            </Button>
                        )
                    })}
                </Box>
            </Box>

            <Box component="section" aria-label="의미 카드" sx={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                <Typography variant="overline">MEANING CARDS</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {round.meaningItems.map((item, index) => {
                        const isMatched = matchedCardIds.has(item.cardId)
                        const isSelected = selectedMeaningId === item.id
                        const isWrong = wrongIds?.meaningId === item.id

                        return (
                            <Button
                                key={item.id}
                                type="button"
                                variant="outlined"
                                aria-label={`의미 카드 ${index + 1}`}
                                aria-pressed={isSelected}
                                disabled={isMatched}
                                onClick={() => handleSelectMeaning(item.id)}
                                sx={{
                                    ...itemStateSx(isSelected, isWrong, isMatched),
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                    gap: 1,
                                    p: 2,
                                    textAlign: 'left',
                                }}
                            >
                                <Typography component="span" sx={{ color: 'inherit' }}>
                                    {item.label}
                                </Typography>
                                {isSelected && !isWrong && !isMatched && <Box component="span">선택됨</Box>}
                                {isWrong && <Box component="span">✕ 오답</Box>}
                                {isMatched && <Box component="span">✓ 매칭 완료</Box>}
                            </Button>
                        )
                    })}
                </Box>
            </Box>
            </Box>
        </Box>
    )
}
