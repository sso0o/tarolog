// src/lib/shared/tier.test.ts
import { afterEach, describe, expect, it, vi } from 'vitest'
import { isPremium } from './tier.ts'

afterEach(() => {
    vi.unstubAllEnvs()
})

describe('isPremium', () => {
    it('VITE_APP_TIER가 없으면 false (무료)', () => {
        vi.stubEnv('VITE_APP_TIER', undefined)
        expect(isPremium()).toBe(false)
    })

    it("VITE_APP_TIER가 'paid'면 true", () => {
        vi.stubEnv('VITE_APP_TIER', 'paid')
        expect(isPremium()).toBe(true)
    })

    it("VITE_APP_TIER가 'paid'가 아닌 다른 값이면 false", () => {
        vi.stubEnv('VITE_APP_TIER', 'free')
        expect(isPremium()).toBe(false)
    })
})