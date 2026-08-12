// src/theme.test.ts
import { describe, expect, it } from 'vitest'
import { colors } from './design/system.ts'
import { theme } from './theme.ts'

describe('Tarolog MUI theme', () => {
    it('라이트 양피지 팔레트를 사용한다', () => {
        expect(theme.palette.mode).toBe('light')
        expect(theme.palette.background.default).toBe(colors.canvas)
        expect(theme.palette.background.paper).toBe(colors.paper)
        expect(theme.palette.text.primary).toBe(colors.ink)
        expect(theme.palette.text.secondary).toBe(colors.mutedInk)
    })

    it('단단한 그림자를 사용한다', () => {
        expect(theme.shadows[2]).toBe(`4px 4px 0 ${colors.ink}`)
        expect(theme.shadows[4]).toBe(`8px 8px 0 ${colors.ink}`)
    })
})