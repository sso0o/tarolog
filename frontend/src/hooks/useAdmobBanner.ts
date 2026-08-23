// src/hooks/useAdmobBanner.ts
import { useEffect, useState } from 'react'
import { Capacitor } from '@capacitor/core'
import { AdMob, BannerAdPluginEvents, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob'
import { StatusBar } from '@capacitor/status-bar'
import { ADMOB_BANNER_AD_UNIT_ID } from '../lib/admobConfig'
import { isPremium } from '../lib/shared/tier.ts'

// AdMob 배너는 웹뷰 위에 뜨는 네이티브 오버레이라 실제 높이/위치를 CSS에서 알 수 없다.
// margin으로 상태바 높이만큼 띄워 배너를 상태바 아래에 고정하고, bannerAdSizeChanged로
// 받은 실제 배너 높이를 상태바 높이와 합쳐 반환해 AdBannerSpacer가 정확한 자리를 비우게 한다.
export function useAdmobBanner() {
    const [clearance, setClearance] = useState(0)

    useEffect(() => {
        if (!Capacitor.isNativePlatform() || isPremium()) return

        let cancelled = false
        let statusBarHeight = 0

        const listenerPromise = AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info) => {
            if (info.height > 0) setClearance(statusBarHeight + info.height)
        })

        StatusBar.getInfo().then(({ height }) => {
            if (cancelled) return
            statusBarHeight = height
            AdMob.initialize()
            AdMob.showBanner({
                adId: ADMOB_BANNER_AD_UNIT_ID,
                adSize: BannerAdSize.BANNER,
                position: BannerAdPosition.TOP_CENTER,
                margin: height,
            })
        })

        return () => {
            cancelled = true
            listenerPromise.then((listener) => listener.remove())
            AdMob.removeBanner()
        }
    }, [])

    return clearance
}