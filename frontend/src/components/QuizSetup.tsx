// src/components/QuizSetup.tsx
import { useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Typography from '@mui/material/Typography'
import { filterByMemorized, filterCards } from '../lib/cards'
import { FilterTabs, type ArcanaFilter, type SuitFilter } from './FilterTabs'
import type { MeaningDirection, QuizType } from '../lib/quiz'
import type { Card } from '../types/card'

type MemorizedScope = 'all' | 'memorized' | 'unmemorized'

interface Props {
    allCards: Card[]
    memorizedIds: string[]
    onStart: (pool: Card[], quizType: QuizType, direction: MeaningDirection, count: number) => void
}

const QUIZ_TYPE_OPTIONS: { value: QuizType; label: string }[] = [
    { value: 'image-to-name', label: '이미지 → 이름' },
    { value: 'name-to-meaning', label: '이름 → 의미' },
    { value: 'mixed', label: '혼합' },
]

const DIRECTION_OPTIONS: { value: MeaningDirection; label: string }[] = [
    { value: 'up', label: '정방향' },
    { value: 'reversed', label: '역방향' },
    { value: 'random', label: '무작위' },
]

const MEMORIZED_OPTIONS: { value: MemorizedScope; label: string }[] = [
    { value: 'all', label: '전체' },
    { value: 'memorized', label: '외운 카드만' },
    { value: 'unmemorized', label: '안 외운 카드만' },
]

export function QuizSetup({ allCards, memorizedIds, onStart }: Props) {
    const [quizType, setQuizType] = useState<QuizType>('image-to-name')
    const [direction, setDirection] = useState<MeaningDirection>('random')
    const [arcana, setArcana] = useState<ArcanaFilter>('all')
    const [suit, setSuit] = useState<SuitFilter>('all')
    const [memorizedScope, setMemorizedScope] = useState<MemorizedScope>('all')
    const [count, setCount] = useState(10)

    const scopePool = useMemo(() => filterCards(allCards, arcana, suit), [allCards, arcana, suit])
    const finalPool = useMemo(
        () => filterByMemorized(scopePool, memorizedIds, memorizedScope),
        [scopePool, memorizedIds, memorizedScope],
    )

    const showCountInput = memorizedScope === 'all'
    const maxCount = Math.max(scopePool.length, 1)
    const canStart = finalPool.length >= 4

    function handleStart() {
        const finalCount = showCountInput ? Math.min(Math.max(count, 1), maxCount) : finalPool.length
        onStart(finalPool, quizType, direction, finalCount)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, px: 4, py: 6 }}>
            <Typography variant="h2" sx={{ m: 0 }}>퀴즈 설정</Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" fontWeight={600}>퀴즈 유형</Typography>
                <ToggleButtonGroup
                    value={quizType}
                    exclusive
                    onChange={(_, v: QuizType | null) => { if (v) setQuizType(v) }}
                    aria-label="퀴즈 유형"
                    sx={{ flexWrap: 'wrap' }}
                >
                    {QUIZ_TYPE_OPTIONS.map((opt) => (
                        <ToggleButton key={opt.value} value={opt.value}>{opt.label}</ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Box>

            {quizType !== 'image-to-name' && (
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
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body2" fontWeight={600}>출제범위</Typography>
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

            {showCountInput && (
                <TextField
                    label="문제수"
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

            {!canStart && (
                <Typography variant="body2" color="error">
                    선택한 범위에 카드가 부족합니다 (최소 4장 필요, 현재 {finalPool.length}장)
                </Typography>
            )}

            <Button variant="contained" disabled={!canStart} onClick={handleStart}>
                시작하기
            </Button>
        </Box>
    )
}