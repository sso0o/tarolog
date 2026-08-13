// src/pages/DictionaryPage.tsx
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import GridViewIcon from '@mui/icons-material/GridView'
import ViewListIcon from '@mui/icons-material/ViewList'
import { getAllCards, searchCards, filterCards, filterByMemorized } from '../lib/shared/cards.ts'
import { getMemorizedIds, toggleMemorized, clearAllMemorized } from '../lib/shared/progress.ts'
import { SearchBar } from '../components/dictionary/SearchBar.tsx'
import { FilterTabs, type ArcanaFilter, type SuitFilter, type MemorizedFilter } from '../components/dictionary/FilterTabs.tsx'
import { CardGrid } from '../components/dictionary/CardGrid.tsx'
import { CardList } from '../components/dictionary/CardList.tsx'
import { CardDetail } from '../components/dictionary/CardDetail.tsx'
import { PageHeader } from '../components/shared/PageHeader.tsx'
import { EmptyState } from '../components/shared/EmptyState.tsx'
import { ExitConfirmDialog } from '../components/shared/ExitConfirmDialog.tsx'
import type { Card } from '../types/card'

type ViewMode = 'grid' | 'list'

const STORAGE_KEY = 'tarolog:dictionary:viewMode'

function getInitialViewMode(): ViewMode {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'list' ? 'list' : 'grid'
}

export function DictionaryPage() {
    const navigate = useNavigate()
    const allCards = useMemo(() => getAllCards(), [])
    const [query, setQuery] = useState('')
    const [arcana, setArcana] = useState<ArcanaFilter>('all')
    const [suit, setSuit] = useState<SuitFilter>('all')
    const [memorized, setMemorized] = useState<MemorizedFilter>('all')
    const [memorizedIds, setMemorizedIds] = useState(() => new Set(getMemorizedIds()))
    const [selected, setSelected] = useState<Card | null>(null)
    const [viewMode, setViewMode] = useState<ViewMode>(getInitialViewMode)
    const [selectionMode, setSelectionMode] = useState(false)
    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [confirmingClearAll, setConfirmingClearAll] = useState(false)

    const visibleCards = useMemo(
        () => filterByMemorized(filterCards(searchCards(allCards, query), arcana, suit), [...memorizedIds], memorized),
        [allCards, query, arcana, suit, memorized, memorizedIds],
    )

    const managementActive = memorized === 'memorized' && viewMode === 'list'

    function handleViewModeChange(mode: ViewMode) {
        setViewMode(mode)
        localStorage.setItem(STORAGE_KEY, mode)
    }

    function handleMemorizedChange(next: MemorizedFilter) {
        setMemorized(next)
        setSelectionMode(false)
        setSelectedIds([])
        if (next === 'memorized') {
            setViewMode('list')
        }
    }

    function resetFilters() {
        setQuery('')
        setArcana('all')
        setSuit('all')
        setMemorized('all')
        setSelectionMode(false)
        setSelectedIds([])
    }

    function handleRowClick(card: Card) {
        if (selectionMode) {
            setSelectedIds((prev) =>
                prev.includes(card.id) ? prev.filter((id) => id !== card.id) : [...prev, card.id],
            )
            return
        }
        setSelected(card)
    }

    function handleUnmemorize(id: string) {
        toggleMemorized(id)
        setMemorizedIds(new Set(getMemorizedIds()))
    }

    function handleToggleSelectionMode() {
        setSelectionMode((v) => !v)
        setSelectedIds([])
    }

    function handleConfirmClearAll() {
        setConfirmingClearAll(false)
        clearAllMemorized()
        setMemorizedIds(new Set())
        setSelectedIds([])
    }

    function handleStartJournal() {
        navigate('/journal/new', { state: { presetCardIds: selectedIds } })
    }

    function renderMemorizedAction(card: Card) {
        if (selectionMode) {
            return (
                <Checkbox
                    checked={selectedIds.includes(card.id)}
                    readOnly
                    sx={{ pointerEvents: 'none' }}
                    inputProps={{ 'aria-label': `${card.nameKo} 선택` }}
                />
            )
        }
        return (
            <Button size="small" onClick={() => handleUnmemorize(card.id)}>
                해제
            </Button>
        )
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, px: { xs: 4, sm: 6, md: 8 }, py: { xs: 6, md: 10 } }}>
            <PageHeader
                title="카드의 상징을 읽는 작은 도감"
                description="78장의 타로 카드를 살펴보고 정방향과 역방향 의미를 찾아보세요."
            />
            <SearchBar value={query} onChange={setQuery} />
            <FilterTabs
                arcana={arcana}
                suit={suit}
                memorized={memorized}
                onArcanaChange={setArcana}
                onSuitChange={setSuit}
                onMemorizedChange={handleMemorizedChange}
            />
            {managementActive && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="outlined" size="small" onClick={handleToggleSelectionMode}>
                        {selectionMode ? '선택 취소' : '선택'}
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        disabled={memorizedIds.size === 0}
                        onClick={() => setConfirmingClearAll(true)}
                    >
                        전체 해제
                    </Button>
                </Box>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                    {memorized === 'memorized'
                        ? `${memorizedIds.size} / ${allCards.length}장 외웠어요`
                        : `${visibleCards.length}장`}
                </Typography>
                <Box>
                    <IconButton
                        onClick={() => handleViewModeChange('grid')}
                        color={viewMode === 'grid' ? 'primary' : 'inherit'}
                        size="small"
                        aria-label="그리드 뷰"
                    >
                        <GridViewIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => handleViewModeChange('list')}
                        color={viewMode === 'list' ? 'primary' : 'inherit'}
                        size="small"
                        aria-label="리스트 뷰"
                    >
                        <ViewListIcon />
                    </IconButton>
                </Box>
            </Box>
            {selected && <CardDetail card={selected} onClose={() => setSelected(null)} />}
            {visibleCards.length === 0 ? (
                memorized === 'memorized' ? (
                    <EmptyState
                        title="아직 외운 카드가 없어요"
                        description="플래시카드 학습에서 카드를 외웠다고 표시해보세요."
                        actionLabel="플래시카드 학습하기"
                        onAction={() => navigate('/flashcard/setup')}
                    />
                ) : (
                    <EmptyState
                        title="검색 결과가 없습니다"
                        description="검색어나 필터 조건을 바꿔보세요."
                        actionLabel="필터 초기화"
                        onAction={resetFilters}
                    />
                )
            ) : viewMode === 'grid' ? (
                <CardGrid cards={visibleCards} onSelect={setSelected} />
            ) : (
                <CardList
                    cards={visibleCards}
                    onSelect={handleRowClick}
                    renderAction={memorized === 'memorized' ? renderMemorizedAction : undefined}
                />
            )}
            <ExitConfirmDialog
                open={confirmingClearAll}
                title="외운 카드를 모두 해제할까요?"
                description="모든 카드의 암기 표시가 초기화됩니다."
                confirmLabel="전체 해제"
                onCancel={() => setConfirmingClearAll(false)}
                onConfirm={handleConfirmClearAll}
            />
            {selectionMode && selectedIds.length > 0 && (
                <Box
                    sx={{
                        position: 'sticky',
                        bottom: 'calc(66px + env(safe-area-inset-bottom))',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 2,
                        p: 3,
                        bgcolor: 'background.paper',
                        border: '2px solid',
                        borderColor: 'text.primary',
                    }}
                >
                    <Typography variant="body2">{selectedIds.length}장 선택됨</Typography>
                    <Button
                        variant="contained"
                        onClick={handleStartJournal}
                        sx={{ backgroundColor: 'var(--feature-accent)', color: 'text.primary' }}
                    >
                        일지 등록
                    </Button>
                </Box>
            )}
        </Box>
    )
}