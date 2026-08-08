// src/lib/adsConfig.test.ts
import { describe, expect, it } from 'vitest'
import { isBannerAdEnabled, shouldShowInterstitial } from './adsConfig'

describe('adsConfig', () => {
    it('배너 slot id가 비어 있으면 배너는 비활성 상태다', () => {
        expect(isBannerAdEnabled()).toBe(false)
    })

    it('client id와 인터스티셜 slot id가 모두 있으면 인터스티셜을 띄운다', () => {
        expect(shouldShowInterstitial()).toBe(true)
    })
})