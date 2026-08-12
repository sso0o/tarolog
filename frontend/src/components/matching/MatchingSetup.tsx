// src/components/MatchingSetup.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { filterCards } from '../../lib/shared/cards.ts'
import { FilterTabs, type ArcanaFilter, type SuitFilter } from '../dictionary/FilterTabs.tsx'
import { PageHeader } from '../shared/PageHeader.tsx'
import { SetupSection } from '../shared/SetupSection.tsx'
import type { MeaningDirection } from '../../types/study.ts'
import type { Card } from '../../types/card.ts'

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
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, px: { xs: 4, sm: 6, md: 8 }, py: { xs: 6, md: 10 } }}>
            <PageHeader title="매칭 설정" compact />

            <SetupSection number="01" title="의미 방향">
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
            </SetupSection>

            <SetupSection number="02" title="출제 범위">
                <FilterTabs arcana={arcana} suit={suit} onArcanaChange={setArcana} onSuitChange={setSuit} />
            </SetupSection>

            {canStart && (
                <SetupSection number="03" title="라운드 수">
                    <TextField
                        label="라운드 수 (1라운드 = 4쌍)"
                        type="number"
                        value={displayRoundCount}
                        onChange={(e) => {
                            const next = Number(e.target.value)
                            setRoundCount(Number.isNaN(next) ? 1 : Math.min(Math.max(next, 1), maxRounds))
                        }}
                        slotProps={{ htmlInput: { min: 1, max: maxRounds } }}
                        sx={{ width: 240 }}
                    />
                </SetupSection>
            )}

            {!canStart && (
                <Typography variant="body2" color="error">
                    선택한 범위에 카드가 부족합니다 (최소 4장 필요, 현재 {pool.length}장)
                </Typography>
            )}

            <Button
                variant="contained"
                disabled={!canStart}
                onClick={handleStart}
                sx={{ minHeight: 52, color: 'text.primary', backgroundColor: 'var(--feature-accent)' }}
            >
                시작하기
            </Button>
        </Box>
    )
}
