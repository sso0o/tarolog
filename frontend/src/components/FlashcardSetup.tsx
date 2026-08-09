// src/components/FlashcardSetup.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { filterByMemorized, filterCards } from '../lib/cards'
import { FilterTabs, type ArcanaFilter, type SuitFilter } from './FilterTabs'
import type { StudyDirection } from '../lib/flashcard'
import type { Card } from '../types/card'

type MemorizedScope = 'all' | 'memorized' | 'unmemorized'
type CountMode = 'all' | 'custom'

interface Props {
    allCards: Card[]
    memorizedIds: string[]
    onStart: (pool: Card[], direction: StudyDirection, count: number) => void
}

const DIRECTION_OPTIONS: { value: StudyDirection; label: string }[] = [
    { value: 'both', label: '전체' },
    { value: 'up', label: '정방향' },
    { value: 'reversed', label: '역방향' },
]

const MEMORIZED_OPTIONS: { value: MemorizedScope; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'memorized', label: '외운 카드만' },
    { value: 'unmemorized', label: '안 외운 카드만' },
]

const COUNT_MODE_OPTIONS: { value: CountMode; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'custom', label: '개수 지정' },
]

export function FlashcardSetup({ allCards, memorizedIds, onStart }: Props) {
    const [direction, setDirection] = useState<StudyDirection>('both')
    const [arcana, setArcana] = useState<ArcanaFilter>('all')
    const [suit, setSuit] = useState<SuitFilter>('all')
    const [memorizedScope, setMemorizedScope] = useState<MemorizedScope>('all')
    const [countMode, setCountMode] = useState<CountMode>('all')
    const [count, setCount] = useState(10)

    const scopePool = useMemo(() => filterCards(allCards, arcana, suit), [allCards, arcana, suit])
    const finalPool = useMemo(
        () => filterByMemorized(scopePool, memorizedIds, memorizedScope),
        [scopePool, memorizedIds, memorizedScope],
    )

    const showCountModeToggle = memorizedScope === 'all'
    const showCountInput = showCountModeToggle && countMode === 'custom'
    const maxCount = Math.max(scopePool.length, 1)
    const canStart = finalPool.length >= 1

    function handleStart() {
        const finalCount = showCountInput ? Math.min(Math.max(count, 1), maxCount) : finalPool.length
        onStart(finalPool, direction, finalCount)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 4, py: 6 }}>
            <Typography variant="h2" sx={{ m: 0 }}>학습 설정</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" fontWeight={600}>의미 방향</Typography>
                <ToggleButtonGroup
                    value={direction}
                    exclusive
                    onChange={(_, v: StudyDirection | null) => { if (v) setDirection(v) }}
                    aria-label="의미 방향"
                    sx={{ flexWrap: 'wrap' }}
                >
                    {DIRECTION_OPTIONS.map((opt) => (
                        <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" fontWeight={600}>범위</Typography>
                <FilterTabs arcana={arcana} suit={suit} onArcanaChange={setArcana} onSuitChange={setSuit} />
                <ToggleButtonGroup
                    value={memorizedScope}
                    exclusive
                    onChange={(_, v: MemorizedScope | null) => { if (v) setMemorizedScope(v) }}
                    aria-label="암기 진도"
                    sx={{ flexWrap: 'wrap' }}
                >
                    {MEMORIZED_OPTIONS.map((opt) => (
                        <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>

            {showCountModeToggle && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="body2" fontWeight={600}>학습 개수</Typography>
                    <ToggleButtonGroup
                        value={countMode}
                        exclusive
                        onChange={(_, v: CountMode | null) => { if (v) setCountMode(v) }}
                        aria-label="학습 개수"
                        sx={{ flexWrap: 'wrap' }}
                    >
                        {COUNT_MODE_OPTIONS.map((opt) => (
                            <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    {showCountInput && (
                        <TextField
                            label="학습 개수"
                            type="number"
                            value={count}
                            onChange={(e) => {
                                const next = Number(e.target.value)
                                setCount(Number.isNaN(next) ? 1 : Math.min(Math.max(next, 1), maxCount))
                            }}
                            slotProps={{ htmlInput: { min: 1, max: maxCount } }}
                            sx={{ maxWidth: 160 }}
                        />
                    )}
                </Box>
            )}

            {!canStart && (
                <Typography variant="body2" color="error">
                    선택한 범위에 카드가 없습니다
                </Typography>
            )}

            <Button variant="contained" disabled={!canStart} onClick={handleStart}>
                시작하기
            </Button>
        </Box>
    )
}