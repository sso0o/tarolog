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

export function filterByMemorized(
    cards: Card[],
    memorizedIds: string[],
    filter: 'all' | 'memorized' | 'unmemorized',
): Card[] {
    if (filter === 'all') return cards
    const memorizedSet = new Set(memorizedIds)
    return cards.filter((c) => memorizedSet.has(c.id) === (filter === 'memorized'))
}

function shuffle<T>(items: T[]): T[] {
    const result = [...items]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
}

export function selectStudyCards(cards: Card[], count: number): Card[] {
    const finalCount = Math.min(count, cards.length)
    return shuffle(cards).slice(0, finalCount)
}