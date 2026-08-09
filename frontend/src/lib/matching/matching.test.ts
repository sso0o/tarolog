// src/lib/matching.test.ts
import { describe, expect, it } from 'vitest'
import { buildMatchingRounds, formatDuration, isMatch } from './matching.ts'
import type { Card } from '../../types/card.ts'

function makeCard(id: string): Card {
    return {
        id,
        nameEn: id,
        nameKo: id,
        arcana: 'major',
        suit: null,
        number: 0,
        meaningUpKo: `${id}-up`,
        meaningRevKo: `${id}-rev`,
        keywordsKo: [],
        image: `/cards/${id}.jpg`,
    }
}

const fixture: Card[] = Array.from({ length: 9 }, (_, i) => makeCard(`card${i}`))

describe('buildMatchingRounds', () => {
    it('generates the requested number of rounds, each with pairCount pairs and items', () => {
        const rounds = buildMatchingRounds(fixture, 'up', 2, 4)
        expect(rounds).toHaveLength(2)
        for (const round of rounds) {
            expect(round.pairs).toHaveLength(4)
            expect(round.imageItems).toHaveLength(4)
            expect(round.meaningItems).toHaveLength(4)
        }
    })

    it('never repeats a card across rounds in the same session', () => {
        const rounds = buildMatchingRounds(fixture, 'up', 2, 4)
        const allCardIds = rounds.flatMap((round) => round.pairs.map((pair) => pair.card.id))
        expect(new Set(allCardIds).size).toBe(allCardIds.length)
    })

    it('clamps round count to floor(pool.length / pairCount)', () => {
        const rounds = buildMatchingRounds(fixture, 'up', 10, 4)
        expect(rounds).toHaveLength(Math.floor(fixture.length / 4))
    })

    it('creates exactly one image item and one meaning item per card in each round, with no duplicates', () => {
        const rounds = buildMatchingRounds(fixture, 'up', 2, 4)
        for (const round of rounds) {
            const imageCardIds = round.imageItems.map((item) => item.cardId).sort()
            const meaningCardIds = round.meaningItems.map((item) => item.cardId).sort()
            const pairCardIds = round.pairs.map((pair) => pair.card.id).sort()
            expect(imageCardIds).toEqual(pairCardIds)
            expect(meaningCardIds).toEqual(pairCardIds)
            expect(new Set(imageCardIds).size).toBe(pairCardIds.length)
        }
    })

    it('fixes every pair to "up" when direction is "up"', () => {
        const rounds = buildMatchingRounds(fixture, 'up', 2, 4)
        for (const round of rounds) {
            for (const pair of round.pairs) {
                expect(pair.direction).toBe('up')
            }
            for (const item of round.meaningItems) {
                const pair = round.pairs.find((p) => p.card.id === item.cardId)!
                expect(item.label).toBe(pair.card.meaningUpKo)
            }
        }
    })

    it('fixes every pair to "reversed" when direction is "reversed"', () => {
        const rounds = buildMatchingRounds(fixture, 'reversed', 2, 4)
        for (const round of rounds) {
            for (const pair of round.pairs) {
                expect(pair.direction).toBe('reversed')
            }
            for (const item of round.meaningItems) {
                const pair = round.pairs.find((p) => p.card.id === item.cardId)!
                expect(item.label).toBe(pair.card.meaningRevKo)
            }
        }
    })

    it('only produces "up" or "reversed" directions when direction is "random"', () => {
        const rounds = buildMatchingRounds(fixture, 'random', 2, 4)
        for (const round of rounds) {
            for (const pair of round.pairs) {
                expect(['up', 'reversed']).toContain(pair.direction)
            }
        }
    })

    it('uses the card image path as the image item label', () => {
        const rounds = buildMatchingRounds(fixture, 'up', 2, 4)
        for (const round of rounds) {
            for (const item of round.imageItems) {
                const pair = round.pairs.find((p) => p.card.id === item.cardId)!
                expect(item.label).toBe(pair.card.image)
            }
        }
    })
})

describe('isMatch', () => {
    it('returns true when the image item and meaning item share a card id', () => {
        const [round] = buildMatchingRounds(fixture, 'up', 1, 4)
        const imageItem = round.imageItems[0]
        const meaningItem = round.meaningItems.find((item) => item.cardId === imageItem.cardId)!
        expect(isMatch(imageItem, meaningItem)).toBe(true)
    })

    it('returns false when the image item and meaning item belong to different cards', () => {
        const [round] = buildMatchingRounds(fixture, 'up', 1, 4)
        const imageItem = round.imageItems[0]
        const meaningItem = round.meaningItems.find((item) => item.cardId !== imageItem.cardId)!
        expect(isMatch(imageItem, meaningItem)).toBe(false)
    })
})

describe('formatDuration', () => {
    it('formats sub-minute durations as seconds only', () => {
        expect(formatDuration(45000)).toBe('45초')
    })

    it('formats durations over a minute as minutes and seconds', () => {
        expect(formatDuration(83000)).toBe('1분 23초')
    })

    it('rounds to the nearest second', () => {
        expect(formatDuration(1400)).toBe('1초')
    })
})