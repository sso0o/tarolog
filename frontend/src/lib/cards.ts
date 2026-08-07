// src/lib/cards.ts
import cardsData from '../../data/cards.ko.json'
import type { Arcana, Card, Suit } from '../types/card'

export function getAllCards(): Card[] {
    return cardsData as Card[]
}

export function searchCards(cards: Card[], query: string): Card[] {
    const q = query.trim().toLowerCase()
    if (!q) return cards
    return cards.filter(
        (c) =>
            c.nameKo.toLowerCase().includes(q) ||
            c.nameEn.toLowerCase().includes(q) ||
            c.keywordsKo.some((k) => k.toLowerCase().includes(q)),
    )
}

export function filterCards(cards: Card[], arcana: Arcana | 'all', suit: Suit | 'all'): Card[] {
    return cards.filter(
        (c) => (arcana === 'all' || c.arcana === arcana) && (suit === 'all' || c.suit === suit),
    )
}