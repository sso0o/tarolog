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
        <div className="flashcard">
            <button type="button" className="flashcard-face" onClick={() => setFlipped((f) => !f)}>
                {flipped ? (
                    <div>
                        <h2>{card.nameKo}</h2>
                        <p>{card.meaningUpKo}</p>
                    </div>
                ) : (
                    <img src={import.meta.env.BASE_URL + card.image.slice(1)} alt="카드를 눌러 의미 확인" />
                )}
            </button>
            <label>
                <input type="checkbox" checked={memorized} onChange={onToggleMemorized} />
                외웠어요
            </label>
        </div>
    )
}