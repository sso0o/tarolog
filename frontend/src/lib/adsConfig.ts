// src/lib/adsConfig.ts
export const ADSENSE_CLIENT_ID: string = 'ca-pub-6574442338402760'
export const ADSENSE_BANNER_SLOT_ID: string = ''
export const ADSENSE_INTERSTITIAL_SLOT_ID: string = '5853542570'

export function isBannerAdEnabled(): boolean {
    return ADSENSE_CLIENT_ID !== '' && ADSENSE_BANNER_SLOT_ID !== ''
}

export function shouldShowInterstitial(): boolean {
    return ADSENSE_CLIENT_ID !== '' && ADSENSE_INTERSTITIAL_SLOT_ID !== ''
}