// src/lib/cards.test.ts
import { describe, expect, it } from 'vitest'
import { searchCards, filterCards, filterByMemorized, selectStudyCards } from './cards'
import type { Card } from '../types/card'

const fixture: Card[] = [
    { id: 'ar00', nameEn: 'The Fool', nameKo: '바보', arcana: 'major', suit: null, number: 0, meaningUpKo: '새로운 시작', meaningRevKo: '경솔함', keywordsKo: ['시작', '순수'], image: '/cards/ar00.jpg' },
    { id: 'ar01', nameEn: 'The Magician', nameKo: '마법사', arcana: 'major', suit: null, number: 1, meaningUpKo: '창조와 의지', meaningRevKo: '기만', keywordsKo: ['능력', '의지'], image: '/cards/ar01.jpg' },
    { id: 'wa01', nameEn: 'Ace of Wands', nameKo: '완드 에이스', arcana: 'minor', suit: 'wands', number: 1, meaningUpKo: '영감과 활력', meaningRevKo: '지연', keywordsKo: ['영감', '열정'], image: '/cards/wa01.jpg' },
    { id: 'cu01', nameEn: 'Ace of Cups', nameKo: '컵 에이스', arcana: 'minor', suit: 'cups', number: 1, meaningUpKo: '새로운 감정', meaningRevKo: '억압된 감정', keywordsKo: ['사랑', '감정'], image: '/cards/cu01.jpg' },
]

describe('searchCards', () => {
    it('matches Korean name substrings', () => {
        expect(searchCards(fixture, '마법사')).toEqual([fixture[1]])
    })

    it('matches English name substrings case-insensitively', () => {
        expect(searchCards(fixture, 'fool')).toEqual([fixture[0]])
    })

    it('matches keywords', () => {
        expect(searchCards(fixture, '열정')).toEqual([fixture[2]])
    })

    it('returns all cards for an empty query', () => {
        expect(searchCards(fixture, '')).toEqual(fixture)
    })
})

describe('filterCards', () => {
    it('filters by arcana', () => {
        expect(filterCards(fixture, 'major', 'all')).toEqual([fixture[0], fixture[1]])
    })

    it('filters by suit', () => {
        expect(filterCards(fixture, 'all', 'cups')).toEqual([fixture[3]])
    })

    it('combines arcana and suit filters', () => {
        expect(filterCards(fixture, 'minor', 'wands')).toEqual([fixture[2]])
    })
})

describe('filterByMemorized', () => {
    it('returns all cards when filter is "all"', () => {
        expect(filterByMemorized(fixture, ['ar00'], 'all')).toEqual(fixture)
    })

    it('returns only memorized cards when filter is "memorized"', () => {
        expect(filterByMemorized(fixture, ['ar00', 'cu01'], 'memorized')).toEqual([fixture[0], fixture[3]])
    })

    it('returns only unmemorized cards when filter is "unmemorized"', () => {
        expect(filterByMemorized(fixture, ['ar00'], 'unmemorized')).toEqual([fixture[1], fixture[2], fixture[3]])
    })
})

describe('selectStudyCards', () => {
    it('returns the requested number of cards', () => {
        expect(selectStudyCards(fixture, 2)).toHaveLength(2)
    })

    it('clamps count to pool size when count exceeds it', () => {
        expect(selectStudyCards(fixture, 100)).toHaveLength(fixture.length)
    })

    it('only returns cards drawn from the original pool with no duplicates', () => {
        const result = selectStudyCards(fixture, 3)
        const ids = result.map((c) => c.id)
        const fixtureIds = fixture.map((c) => c.id)
        expect(new Set(ids).size).toBe(ids.length)
        for (const id of ids) {
            expect(fixtureIds).toContain(id)
        }
    })
})