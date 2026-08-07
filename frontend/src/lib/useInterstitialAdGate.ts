// src/lib/useInterstitialAdGate.ts
import { useState } from 'react'
import { shouldShowInterstitial } from './adsConfig'

export function useInterstitialAdGate<Args extends unknown[]>(startAction: (...args: Args) => void) {
    const [pendingArgs, setPendingArgs] = useState<Args | null>(null)

    function requestStart(...args: Args) {
        if (shouldShowInterstitial()) {
            setPendingArgs(args)
            return
        }
        startAction(...args)
    }

    function handleModalClose() {
        if (pendingArgs) {
            startAction(...pendingArgs)
        }
        setPendingArgs(null)
    }

    return { requestStart, modalOpen: pendingArgs !== null, handleModalClose }
}