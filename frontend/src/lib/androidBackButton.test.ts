// src/lib/androidBackButton.test.ts
import { describe, expect, it } from 'vitest'
import { resolveBackButtonAction } from './androidBackButton'

describe('resolveBackButtonAction', () => {
    it('뒤로 갈 히스토리가 있으면 goBack을 반환한다', () => {
        expect(resolveBackButtonAction(true)).toBe('goBack')
    })

    it('뒤로 갈 히스토리가 없으면 exit을 반환한다', () => {
        expect(resolveBackButtonAction(false)).toBe('exit')
    })
})