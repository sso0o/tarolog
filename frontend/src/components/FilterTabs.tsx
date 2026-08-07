// src/components/FilterTabs.tsx
import type { Arcana, Suit } from '../types/card'

export type ArcanaFilter = Arcana | 'all'
export type SuitFilter = Suit | 'all'

interface Props {
  arcana: ArcanaFilter
  suit: SuitFilter
  onArcanaChange: (arcana: ArcanaFilter) => void
  onSuitChange: (suit: SuitFilter) => void
}

const ARCANA_OPTIONS: { value: ArcanaFilter; label: string }[] = [
  { value: 'all', label: '전체' },
  { value: 'major', label: '메이저' },
  { value: 'minor', label: '마이너' },
]

const SUIT_OPTIONS: { value: SuitFilter; label: string }[] = [
  { value: 'all', label: '전체 수트' },
  { value: 'wands', label: '완드' },
  { value: 'cups', label: '컵' },
  { value: 'swords', label: '소드' },
  { value: 'pentacles', label: '펜타클' },
]

const pillClass =
  'text-button-md rounded-full px-md py-xs border border-hairline text-steel bg-canvas cursor-pointer ' +
  'aria-pressed:bg-primary aria-pressed:text-on-primary aria-pressed:border-primary'

export function FilterTabs({ arcana, suit, onArcanaChange, onSuitChange }: Props) {
  return (
    <div className="flex flex-col gap-xs">
      <div role="group" aria-label="아르카나 필터" className="flex gap-xs flex-wrap">
        {ARCANA_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={arcana === opt.value}
            onClick={() => onArcanaChange(opt.value)}
            className={pillClass}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div role="group" aria-label="수트 필터" className="flex gap-xs flex-wrap">
        {SUIT_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            aria-pressed={suit === opt.value}
            onClick={() => onSuitChange(opt.value)}
            className={pillClass}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}