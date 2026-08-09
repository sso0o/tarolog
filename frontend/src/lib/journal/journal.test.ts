// src/lib/journal/journal.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getReadings, getReadingById, addReading, deleteReading } from './journal.ts'
import type { Reading } from '../../types/journal'

const SAMPLE: Omit<Reading, 'id'> = {
    createdAt: '2026-08-09T12:00:00.000Z',
    question: '오늘의 에너지는?',
    spread: { name: '원 카드', positions: ['카드'] },
    cards: [{ position: '카드', cardId: 'ar00', reversed: false }],
    interpretation: '좋은 에너지',
}

beforeEach(() => {
    localStorage.clear()
})

describe('getReadings', () => {
    it('저장된 항목이 없으면 빈 배열 반환', () => {
        expect(getReadings()).toEqual([])
    })

    it('JSON이 깨져 있으면 던지지 않고 빈 배열 반환', () => {
        localStorage.setItem('tarolog:readings', 'not json')
        expect(getReadings()).toEqual([])
    })
})

describe('addReading', () => {
    it('새 리딩을 저장하고 id를 붙여 반환', () => {
        const reading = addReading(SAMPLE)
        expect(reading.id).toBeTypeOf('string')
        expect(getReadings()).toHaveLength(1)
        expect(getReadings()[0].question).toBe('오늘의 에너지는?')
    })

    it('최신 리딩이 맨 앞에 위치', () => {
        addReading({ ...SAMPLE, question: '첫 번째' })
        addReading({ ...SAMPLE, question: '두 번째' })
        expect(getReadings()[0].question).toBe('두 번째')
    })

    it('localStorage.setItem 실패 시 throw', () => {
        const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('storage disabled')
        })
        expect(() => addReading(SAMPLE)).toThrow()
        spy.mockRestore()
    })
})

describe('getReadingById', () => {
    it('해당 id의 리딩 반환', () => {
        const reading = addReading(SAMPLE)
        expect(getReadingById(reading.id)).toMatchObject({ question: '오늘의 에너지는?' })
    })

    it('존재하지 않는 id면 null 반환', () => {
        expect(getReadingById('없는-id')).toBeNull()
    })
})

describe('deleteReading', () => {
    it('해당 id의 리딩을 삭제', () => {
        const reading = addReading(SAMPLE)
        deleteReading(reading.id)
        expect(getReadings()).toHaveLength(0)
    })

    it('다른 리딩은 남겨둠', () => {
        addReading({ ...SAMPLE, question: '남을 것' })
        const toDelete = addReading({ ...SAMPLE, question: '삭제될 것' })
        deleteReading(toDelete.id)
        expect(getReadings()).toHaveLength(1)
        expect(getReadings()[0].question).toBe('남을 것')
    })
})