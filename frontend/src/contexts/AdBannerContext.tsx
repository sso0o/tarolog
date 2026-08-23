// src/contexts/AdBannerContext.tsx
import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Capacitor } from '@capacitor/core'
import { AdMob, BannerAdPluginEvents, BannerAdPosition, BannerAdSize } from '@capacitor-community/admob'
import { StatusBar } from '@capacitor/status-bar'
import { ADMOB_BANNER_AD_UNIT_ID } from '../lib/admobConfig'
import { isPremium } from '../lib/shared/tier.ts'

// AdMob 배너는 웹뷰 위에 뜨는 네이티브 오버레이라 실제 높이/위치를 CSS에서 알 수 없다.
// 상태바 바로 아래(TOP_CENTER)에 고정한다. 하단(BOTTOM_CENTER) 고정도 시도했었으나,
// @capacitor-community/admob 8.0.0이 Android 15+(API 35, VANILLA_ICE_CREAM)에서
// 우리가 넘긴 margin을 무시하고 시스템 네비게이션 바 인셋으로 덮어써버려
// (BannerExecutor.java의 OnApplyWindowInsetsListener), 배너가 우리 앱의 커스텀 하단
// 탭바보다 낮은 위치에 붙어 탭바와 겹치는 문제가 있었다. 그래서 상단 고정으로 통일한다.
// bannerAdSizeChanged로 받은 실제 배너 높이를 반영해 호출부가 정확한 자리를 비울 수
// 있게 한다.

interface AdBannerValue {
    // App 최상단에 예약할 높이(px, 상태바+배너).
    topClearance: number
}

const AdBannerContext = createContext<AdBannerValue | null>(null)

export function AdBannerProvider({ children }: { children: ReactNode }) {
    const [adHeight, setAdHeight] = useState(0)
    const [statusBarHeight, setStatusBarHeight] = useState(0)

    useEffect(() => {
        if (!Capacitor.isNativePlatform() || isPremium()) return

        let cancelled = false

        const listenerPromise = AdMob.addListener(BannerAdPluginEvents.SizeChanged, (info) => {
            console.log('[AdBanner] sizeChanged', info)
            // 배너 자동 새로고침 중에는 새 소재가 완전히 로드되기 전에 height<=0으로 이벤트가
            // 잠깐 올 수 있다. 한 번 실측 높이를 확보한 뒤에는 그 값을 유지해, 새로고침 과도기에
            // topClearance가 0으로 떨어져 콘텐츠가 배너 아래로 밀리지 않는 문제를 막는다.
            if (info.height > 0) setAdHeight(info.height)
        })

        async function show() {
            const { height } = await StatusBar.getInfo()
            if (cancelled) return
            setStatusBarHeight(height)
            await AdMob.initialize()
            if (cancelled) return
            const options = {
                adId: ADMOB_BANNER_AD_UNIT_ID,
                // 고정 크기(BANNER=320x50)로 요청하면, 실제로 서빙되는 광고 소재가 더 커서
                // (예: 468x60) 컨테이너 밖으로 넘쳐 보이는 경우가 있었다. bannerAdSizeChanged가
                // 돌려주는 값은 실측이 아니라 우리가 setAdSize에 넘긴 값의 echo라 이 불일치를
                // 감지할 수도 없었다. ADAPTIVE_BANNER는 기기 너비에 맞는 크기를 먼저 계산해서
                // 그 크기로만 광고를 요청하므로 요청 크기와 실제 렌더링 크기가 항상 일치한다.
                adSize: BannerAdSize.ADAPTIVE_BANNER,
                position: BannerAdPosition.TOP_CENTER,
                margin: height,
            }
            console.log('[AdBanner] showBanner', options)
            await AdMob.showBanner(options)
        }

        show()

        return () => {
            cancelled = true
            listenerPromise.then((listener) => listener.remove())
            AdMob.removeBanner()
        }
    }, [])

    const value: AdBannerValue = {
        topClearance: adHeight > 0 ? statusBarHeight + adHeight : 0,
    }

    return <AdBannerContext.Provider value={value}>{children}</AdBannerContext.Provider>
}

function useAdBannerContext() {
    const value = useContext(AdBannerContext)
    if (!value) throw new Error('AdBannerProvider가 필요합니다')
    return value
}

export function useAdBannerTopClearance() {
    return useAdBannerContext().topClearance
}
