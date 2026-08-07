// src/lib/adsConfig.test.ts
import { describe, expect, it } from 'vitest'
import { isAdsEnabled, shouldShowInterstitial } from './adsConfig'

describe('adsConfig', () => {
    it('client id와 slot id가 비어 있으면 광고가 비활성 상태다', () => {
        expect(isAdsEnabled()).toBe(false)
    })

    it('광고가 비활성 상태면 인터스티셜도 띄우지 않는다', () => {
        expect(shouldShowInterstitial()).toBe(false)
    })
})