// src/lib/quiz.test.ts
import { describe, expect, it } from 'vitest'
import { buildQuiz } from './quiz'
import type { Card } from '../types/card'

const fixture: Card[] = [
    { id: 'ar00', nameEn: 'The Fool', nameKo: '바보', arcana: 'major', suit: null, number: 0, meaningUpKo: '새로운 시작', meaningRevKo: '경솔함', keywordsKo: ['시작', '순수'], image: '/cards/ar00.jpg' },
    { id: 'ar01', nameEn: 'The Magician', nameKo: '마법사', arcana: 'major', suit: null, number: 1, meaningUpKo: '창조와 의지', meaningRevKo: '기만', keywordsKo: ['능력', '의지'], image: '/cards/ar01.jpg' },
    { id: 'wa01', nameEn: 'Ace of Wands', nameKo: '완드 에이스', arcana: 'minor', suit: 'wands', number: 1, meaningUpKo: '영감과 활력', meaningRevKo: '지연', keywordsKo: ['영감', '열정'], image: '/cards/wa01.jpg' },
    { id: 'cu01', nameEn: 'Ace of Cups', nameKo: '컵 에이스', arcana: 'minor', suit: 'cups', number: 1, meaningUpKo: '새로운 감정', meaningRevKo: '억압된 감정', keywordsKo: ['사랑', '감정'], image: '/cards/cu01.jpg' },
]

describe('buildQuiz', () => {
    it('generates the requested number of questions', () => {
        const questions = buildQuiz(fixture, 'image-to-name', 'up', 3)
        expect(questions).toHaveLength(3)
    })

    it('clamps count to pool size when count exceeds it', () => {
        const questions = buildQuiz(fixture, 'image-to-name', 'up', 100)
        expect(questions).toHaveLength(fixture.length)
    })

    it('includes exactly one correct choice with no duplicate choices', () => {
        const questions = buildQuiz(fixture, 'image-to-name', 'up', 4)
        for (const q of questions) {
            expect(q.choices).toHaveLength(4)
            expect(new Set(q.choices).size).toBe(4)
            expect(q.choices[q.correctIndex]).toBe(q.card.nameKo)
        }
    })

    it('fixes direction to "up" for all name-to-meaning questions when direction is "up"', () => {
        const questions = buildQuiz(fixture, 'name-to-meaning', 'up', 4)
        for (const q of questions) {
            expect(q.direction).toBe('up')
            expect(q.choices[q.correctIndex]).toBe(q.card.meaningUpKo)
        }
    })

    it('fixes direction to "reversed" for all name-to-meaning questions when direction is "reversed"', () => {
        const questions = buildQuiz(fixture, 'name-to-meaning', 'reversed', 4)
        for (const q of questions) {
            expect(q.direction).toBe('reversed')
            expect(q.choices[q.correctIndex]).toBe(q.card.meaningRevKo)
        }
    })

    it('sets direction to null for all image-to-name questions regardless of direction setting', () => {
        const questions = buildQuiz(fixture, 'image-to-name', 'random', 4)
        for (const q of questions) {
            expect(q.direction).toBeNull()
        }
    })

    it('only produces image-to-name and name-to-meaning question types when mode is "mixed"', () => {
        const questions = buildQuiz(fixture, 'mixed', 'random', 4)
        for (const q of questions) {
            expect(['image-to-name', 'name-to-meaning']).toContain(q.type)
        }
    })
})