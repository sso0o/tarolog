// src/lib/journal/spreads.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getCustomSpreads, addCustomSpread, deleteCustomSpread } from './spreads.ts'

beforeEach(() => {
    localStorage.clear()
})

describe('getCustomSpreads', () => {
    it('저장된 항목이 없으면 빈 배열 반환', () => {
        expect(getCustomSpreads()).toEqual([])
    })

    it('JSON이 깨져 있으면 던지지 않고 빈 배열 반환', () => {
        localStorage.setItem('tarolog:spreads', 'not json')
        expect(getCustomSpreads()).toEqual([])
    })
})

describe('addCustomSpread', () => {
    it('새 스프레드를 localStorage에 저장하고 반환', () => {
        const spread = addCustomSpread({ name: '테스트', positions: ['A', 'B'] })
        expect(spread.name).toBe('테스트')
        expect(spread.positions).toEqual(['A', 'B'])
        expect(spread.isCustom).toBe(true)
        expect(spread.id).toBeTypeOf('string')
        expect(getCustomSpreads()).toHaveLength(1)
    })

    it('localStorage.setItem 실패 시 throw', () => {
        const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('storage disabled')
        })
        expect(() => addCustomSpread({ name: 'X', positions: ['Y'] })).toThrow()
        spy.mockRestore()
    })
})

describe('deleteCustomSpread', () => {
    it('해당 id의 스프레드를 삭제', () => {
        const spread = addCustomSpread({ name: '삭제 대상', positions: ['X'] })
        deleteCustomSpread(spread.id)
        expect(getCustomSpreads()).toHaveLength(0)
    })

    it('다른 스프레드는 남겨둠', () => {
        addCustomSpread({ name: '남을 것', positions: ['A'] })
        const toDelete = addCustomSpread({ name: '삭제될 것', positions: ['B'] })
        deleteCustomSpread(toDelete.id)
        const result = getCustomSpreads()
        expect(result).toHaveLength(1)
        expect(result[0].name).toBe('남을 것')
    })
})