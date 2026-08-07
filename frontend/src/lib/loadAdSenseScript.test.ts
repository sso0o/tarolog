// src/lib/loadAdSenseScript.test.ts
import { afterEach, describe, expect, it } from 'vitest'
import { ensureAdSenseScriptLoaded } from './loadAdSenseScript'

afterEach(() => {
    document.getElementById('adsbygoogle-loader')?.remove()
})

describe('ensureAdSenseScriptLoaded', () => {
    it('client id를 담은 script 태그를 head에 추가한다', () => {
        ensureAdSenseScriptLoaded('ca-pub-123')
        const script = document.getElementById('adsbygoogle-loader') as HTMLScriptElement | null
        expect(script).not.toBeNull()
        expect(script?.src).toContain('client=ca-pub-123')
    })

    it('두 번 호출해도 script 태그는 하나만 남는다', () => {
        ensureAdSenseScriptLoaded('ca-pub-123')
        ensureAdSenseScriptLoaded('ca-pub-123')
        expect(document.querySelectorAll('#adsbygoogle-loader').length).toBe(1)
    })
})