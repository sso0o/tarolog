// src/lib/matching.ts
import type { Card } from '../types/card'
import type { MeaningDirection } from './quiz'

export interface MatchingItem {
    id: string
    cardId: string
    label: string
}

export interface MatchingPair {
    card: Card
    direction: 'up' | 'reversed'
}

export interface MatchingRound {
    pairs: MatchingPair[]
    imageItems: MatchingItem[]
    meaningItems: MatchingItem[]
}

export interface MatchingRoundOutcome {
    wrongAttempts: number
    wrongCardIds: string[]
}

export interface MatchingSessionResult {
    elapsedMs: number
    wrongAttempts: number
    wrongCardIds: string[]
}

function shuffle<T>(items: T[]): T[] {
    const result = [...items]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
}

function pickDirection(direction: MeaningDirection): 'up' | 'reversed' {
    if (direction === 'random') {
        return Math.random() < 0.5 ? 'up' : 'reversed'
    }
    return direction
}

function buildRound(cards: Card[], direction: MeaningDirection): MatchingRound {
    const pairs: MatchingPair[] = cards.map((card) => ({
        card,
        direction: pickDirection(direction),
    }))

    const imageItems = shuffle(
        pairs.map((pair) => ({
            id: `${pair.card.id}-image`,
            cardId: pair.card.id,
            label: pair.card.image,
        })),
    )

    const meaningItems = shuffle(
        pairs.map((pair) => ({
            id: `${pair.card.id}-meaning`,
            cardId: pair.card.id,
            label: pair.direction === 'up' ? pair.card.meaningUpKo : pair.card.meaningRevKo,
        })),
    )

    return { pairs, imageItems, meaningItems }
}

export function buildMatchingRounds(
    pool: Card[],
    direction: MeaningDirection,
    roundCount: number,
    pairCount: number,
): MatchingRound[] {
    const maxRounds = Math.floor(pool.length / pairCount)
    const count = Math.min(roundCount, maxRounds)
    const shuffledPool = shuffle(pool)

    const rounds: MatchingRound[] = []
    for (let i = 0; i < count; i++) {
        const cards = shuffledPool.slice(i * pairCount, (i + 1) * pairCount)
        rounds.push(buildRound(cards, direction))
    }
    return rounds
}

export function isMatch(imageItem: MatchingItem, meaningItem: MatchingItem): boolean {
    return imageItem.cardId === meaningItem.cardId
}

export function formatDuration(ms: number): string {
    const totalSeconds = Math.round(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`
}