// src/components/CardDetail.tsx
import type { Card } from '../types/card'

interface Props {
    card: Card
    onClose: () => void
}

export function CardDetail({ card, onClose }: Props) {
    return (
        <div className="card-detail" role="dialog" aria-label={`${card.nameKo} 상세`}>
            <button type="button" onClick={onClose} aria-label="닫기">
                닫기
            </button>
            <img src={card.image} alt={card.nameKo} />
            <h2>{card.nameKo}</h2>
            <p className="keywords">{card.keywordsKo.join(', ')}</p>
            <section>
                <h3>정방향</h3>
                <p>{card.meaningUpKo}</p>
            </section>
            <section>
                <h3>역방향</h3>
                <p>{card.meaningRevKo}</p>
            </section>
        </div>
    )
}