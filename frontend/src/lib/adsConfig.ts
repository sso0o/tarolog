// src/lib/adsConfig.ts
export const ADSENSE_CLIENT_ID = ''
export const ADSENSE_SLOT_ID = ''

export function isAdsEnabled(): boolean {
    return ADSENSE_CLIENT_ID !== '' && ADSENSE_SLOT_ID !== ''
}

export function shouldShowInterstitial(): boolean {
    return isAdsEnabled()
}