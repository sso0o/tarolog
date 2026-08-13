// src/lib/journal/journal.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getReadings, getReadingById, addReading, deleteReading, fillPositionsWithCards } from './journal.ts'
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

describe('fillPositionsWithCards', () => {
    it('카드 수와 포지션 수가 같으면 순서대로 채움', () => {
        const result = fillPositionsWithCards(['과거', '현재', '미래'], ['ar00', 'ar01', 'wa01'])
        expect(result).toEqual([
            { position: '과거', cardId: 'ar00', reversed: false },
            { position: '현재', cardId: 'ar01', reversed: false },
            { position: '미래', cardId: 'wa01', reversed: false },
        ])
    })

    it('카드 수가 포지션 수보다 적으면 남는 포지션은 빈 채로 둠', () => {
        const result = fillPositionsWithCards(['과거', '현재', '미래'], ['ar00'])
        expect(result).toEqual([
            { position: '과거', cardId: 'ar00', reversed: false },
            { position: '현재', cardId: '', reversed: false },
            { position: '미래', cardId: '', reversed: false },
        ])
    })

    it('카드 ID가 없으면 전부 빈 슬롯', () => {
        const result = fillPositionsWithCards(['카드'], [])
        expect(result).toEqual([{ position: '카드', cardId: '', reversed: false }])
    })
})