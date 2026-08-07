// src/pages/FlashcardPage.tsx
import { useMemo, useState } from 'react'
import { getAllCards } from '../lib/cards'
import { getMemorizedIds, toggleMemorized } from '../lib/progress'
import { Flashcard } from '../components/Flashcard'

export function FlashcardPage() {
  const cards = useMemo(() => getAllCards(), [])
  const [index, setIndex] = useState(0)
  const [memorizedIds, setMemorizedIds] = useState(() => new Set(getMemorizedIds()))

  const card = cards[index]

  function next() {
    setIndex((i) => (i + 1) % cards.length)
  }

  function prev() {
    setIndex((i) => (i - 1 + cards.length) % cards.length)
  }

  function handleToggle() {
    toggleMemorized(card.id)
    setMemorizedIds(new Set(getMemorizedIds()))
  }

  const navBtnClass =
    'border border-ink text-ink rounded-full px-xl py-[11px] text-button-md bg-transparent cursor-pointer'

  return (
    <div className="flex flex-col items-center gap-xl py-section">
      <p className="text-body-sm text-steel m-0">
        {index + 1} / {cards.length}
      </p>
      <Flashcard card={card} memorized={memorizedIds.has(card.id)} onToggleMemorized={handleToggle} />
      <div className="flex gap-md">
        <button type="button" onClick={prev} className={navBtnClass}>
          이전
        </button>
        <button type="button" onClick={next} className={navBtnClass}>
          다음
        </button>
      </div>
    </div>
  )
}