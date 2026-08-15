// src/hooks/useAdmobBanner.ts
import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { AdMob, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob'
import { ADMOB_BANNER_AD_UNIT_ID } from '../lib/admobConfig'
import { isPremium } from '../lib/shared/tier.ts'

export function useAdmobBanner() {
    useEffect(() => {
        if (!Capacitor.isNativePlatform() || isPremium()) return

        AdMob.initialize()
        AdMob.showBanner({
            adId: ADMOB_BANNER_AD_UNIT_ID,
            adSize: BannerAdSize.BANNER,
            position: BannerAdPosition.TOP_CENTER,
        })

        return () => {
            AdMob.removeBanner()
        }
    }, [])
}