// src/components/MatchingSetup.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { filterCards } from '../lib/cards'
import { FilterTabs, type ArcanaFilter, type SuitFilter } from './FilterTabs'
import type { MeaningDirection } from '../lib/quiz'
import type { Card } from '../types/card'

const PAIR_COUNT = 4

interface Props {
    allCards: Card[]
    onStart: (pool: Card[], direction: MeaningDirection, roundCount: number) => void
}

const DIRECTION_OPTIONS: { value: MeaningDirection; label: string }[] = [
    { value: 'up', label: '정방향' },
    { value: 'reversed', label: '역방향' },
    { value: 'random', label: '무작위' },
]

export function MatchingSetup({ allCards, onStart }: Props) {
    const [direction, setDirection] = useState<MeaningDirection>('random')
    const [arcana, setArcana] = useState<ArcanaFilter>('all')
    const [suit, setSuit] = useState<SuitFilter>('all')
    const [roundCount, setRoundCount] = useState(1)

    const pool = useMemo(() => filterCards(allCards, arcana, suit), [allCards, arcana, suit])
    const maxRounds = Math.floor(pool.length / PAIR_COUNT)
    const canStart = maxRounds >= 1
    const displayRoundCount = Math.min(roundCount, Math.max(maxRounds, 1))

    function handleStart() {
        onStart(pool, direction, displayRoundCount)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 4, py: 6 }}>
            <Typography variant="h2" sx={{ m: 0 }}>매칭 설정</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" fontWeight={600}>의미 방향</Typography>
                <ToggleButtonGroup
                    value={direction}
                    exclusive
                    onChange={(_, v: MeaningDirection | null) => { if (v) setDirection(v) }}
                    aria-label="의미 방향"
                    sx={{ flexWrap: 'wrap' }}
                >
                    {DIRECTION_OPTIONS.map((opt) => (
                        <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" fontWeight={600}>출제범위</Typography>
                <FilterTabs arcana={arcana} suit={suit} onArcanaChange={setArcana} onSuitChange={setSuit} />
            </Box>

            {canStart && (
                <TextField
                    label="라운드 수 (1라운드 = 4쌍)"
                    type="number"
                    value={displayRoundCount}
                    onChange={(e) => {
                        const next = Number(e.target.value)
                        setRoundCount(Number.isNaN(next) ? 1 : Math.min(Math.max(next, 1), maxRounds))
                    }}
                    slotProps={{ htmlInput: { min: 1, max: maxRounds } }}
                    sx={{ maxWidth: 240 }}
                />
            )}

            {!canStart && (
                <Typography variant="body2" color="error">
                    선택한 범위에 카드가 부족합니다 (최소 4장 필요, 현재 {pool.length}장)
                </Typography>
            )}

            <Button variant="contained" disabled={!canStart} onClick={handleStart}>
                시작하기
            </Button>
        </Box>
    )
}