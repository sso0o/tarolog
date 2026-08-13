// src/hooks/useInterstitialAd.ts
import { useEffect, useRef } from 'react'
import { Capacitor } from '@capacitor/core'
import { AdMob, InterstitialAdPluginEvents } from '@capacitor-community/admob'
import { ADMOB_INTERSTITIAL_AD_UNIT_ID } from '../lib/admobConfig.ts'
import { isPremium } from '../lib/shared/tier.ts'

function shouldShowAds(): boolean {
    return Capacitor.isNativePlatform() && !isPremium()
}

function prepare(): void {
    AdMob.initialize()
    AdMob.prepareInterstitial({ adId: ADMOB_INTERSTITIAL_AD_UNIT_ID }).catch(() => {})
}

export function useInterstitialAd() {
    const pendingActionRef = useRef<(() => void) | null>(null)

    useEffect(() => {
        if (!shouldShowAds()) return

        prepare()

        function runPendingAction() {
            const action = pendingActionRef.current
            pendingActionRef.current = null
            prepare()
            action?.()
        }

        const dismissedHandle = AdMob.addListener(InterstitialAdPluginEvents.Dismissed, runPendingAction)
        const failedHandle = AdMob.addListener(InterstitialAdPluginEvents.FailedToShow, runPendingAction)

        return () => {
            dismissedHandle.then((handle) => handle.remove())
            failedHandle.then((handle) => handle.remove())
        }
    }, [])

    return function showThenRun(action: () => void) {
        if (!shouldShowAds()) {
            action()
            return
        }
        pendingActionRef.current = action
        AdMob.showInterstitial().catch(() => {
            pendingActionRef.current = null
            action()
        })
    }
}