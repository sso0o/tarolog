// src/components/CardGrid.tsx
import type { Card } from '../types/card'

interface Props {
  cards: Card[]
  onSelect: (card: Card) => void
}

export function CardGrid({ cards, onSelect }: Props) {
  if (cards.length === 0) {
    return (
      <p className="text-body-sm text-steel py-section text-center m-0">
        검색 결과가 없습니다.
      </p>
    )
  }
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-md max-sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))]">
      {cards.map((card) => (
        <button
          key={card.id}
          type="button"
          className="bg-canvas border border-hairline rounded-xl p-xs flex flex-col items-center gap-xs cursor-pointer hover:shadow-[0px_4px_6px_rgba(0,0,0,0.08)] transition-shadow"
          onClick={() => onSelect(card)}
        >
          <img
            src={import.meta.env.BASE_URL + card.image.slice(1)}
            alt={card.nameKo}
            loading="lazy"
            className="w-full max-w-[140px] h-auto rounded-md"
          />
          <span className="text-micro text-slate">{card.nameKo}</span>
        </button>
      ))}
    </div>
  )
}