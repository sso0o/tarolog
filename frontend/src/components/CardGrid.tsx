// src/components/CardGrid.tsx
import type { Card } from '../types/card'

interface Props {
    cards: Card[]
    onSelect: (card: Card) => void
}

export function CardGrid({ cards, onSelect }: Props) {
    if (cards.length === 0) {
        return <p>검색 결과가 없습니다.</p>
    }
    return (
        <div className="card-grid">
            {cards.map((card) => (
                <button key={card.id} type="button" className="card-thumb" onClick={() => onSelect(card)}>
                    <img src={card.image} alt={card.nameKo} loading="lazy" />
                    <span>{card.nameKo}</span>
                </button>
            ))}
        </div>
    )
}