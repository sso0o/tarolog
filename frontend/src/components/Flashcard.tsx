// src/components/Flashcard.tsx
import { useState } from 'react'
import type { Card } from '../types/card'

interface Props {
  card: Card
  memorized: boolean
  onToggleMemorized: () => void
}

export function Flashcard({ card, memorized, onToggleMemorized }: Props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flex flex-col items-center gap-sm">
      <button
        type="button"
        className="bg-canvas rounded-hero shadow-[0px_4px_6px_rgba(0,0,0,0.08)] min-h-[360px] w-full max-w-[400px] flex items-center justify-center p-xxl cursor-pointer border-0"
        onClick={() => setFlipped((f) => !f)}
      >
        {flipped ? (
          <div className="flex flex-col items-center gap-md">
            <h2 className="text-heading-md text-ink m-0">{card.nameKo}</h2>
            <p className="text-body-md text-charcoal m-0">{card.meaningUpKo}</p>
          </div>
        ) : (
          <img
            src={import.meta.env.BASE_URL + card.image.slice(1)}
            alt="카드를 눌러 의미 확인"
            className="rounded-xl max-w-[240px] w-full h-auto"
          />
        )}
      </button>
      <label className="flex items-center gap-xs text-body-sm text-slate cursor-pointer">
        <input type="checkbox" checked={memorized} onChange={onToggleMemorized} className="w-4 h-4" />
        외웠어요
      </label>
    </div>
  )
}