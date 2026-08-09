// src/lib/progress.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getMemorizedIds, isMemorized, toggleMemorized, markAllMemorized } from './progress.ts'

beforeEach(() => {
    localStorage.clear()
})

describe('progress', () => {
    it('returns an empty list when nothing is stored', () => {
        expect(getMemorizedIds()).toEqual([])
    })

    it('adds an id on toggle', () => {
        toggleMemorized('ar00')
        expect(getMemorizedIds()).toEqual(['ar00'])
        expect(isMemorized('ar00')).toBe(true)
    })

    it('removes an id on second toggle', () => {
        toggleMemorized('ar00')
        toggleMemorized('ar00')
        expect(getMemorizedIds()).toEqual([])
        expect(isMemorized('ar00')).toBe(false)
    })

    it('returns an empty list instead of throwing when stored JSON is corrupt', () => {
        localStorage.setItem('tarolog:memorized', 'not json')
        expect(getMemorizedIds()).toEqual([])
    })

    it('does not throw when localStorage.setItem fails', () => {
        const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('storage disabled')
        })
        expect(() => toggleMemorized('ar00')).not.toThrow()
        spy.mockRestore()
    })
})

describe('markAllMemorized', () => {
    it('adds multiple ids at once', () => {
        markAllMemorized(['ar00', 'ar01'])
        expect(getMemorizedIds().sort()).toEqual(['ar00', 'ar01'])
    })

    it('keeps existing memorized ids and de-duplicates', () => {
        toggleMemorized('ar00')
        markAllMemorized(['ar00', 'wa01'])
        expect(getMemorizedIds().sort()).toEqual(['ar00', 'wa01'])
    })

    it('does not throw when localStorage.setItem fails', () => {
        const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
            throw new Error('storage disabled')
        })
        expect(() => markAllMemorized(['ar00'])).not.toThrow()
        spy.mockRestore()
    })
})