// src/lib/useNativeAppSetup.ts
import { useEffect } from 'react'
import { Capacitor } from '@capacitor/core'
import { App } from '@capacitor/app'
import { StatusBar } from '@capacitor/status-bar'
import { resolveBackButtonAction } from '../lib/shared/androidBackButton.ts'

export function useNativeAppSetup(requestFocusExit: () => boolean) {
    useEffect(() => {
        if (!Capacitor.isNativePlatform()) return

        StatusBar.setOverlaysWebView({ overlay: false })

        const listenerPromise = App.addListener('backButton', ({ canGoBack }) => {
            if (requestFocusExit()) return

            if (resolveBackButtonAction(canGoBack) === 'goBack') {
                window.history.back()
            } else {
                App.exitApp()
            }
        })

        return () => {
            listenerPromise.then((listener) => listener.remove())
        }
    }, [])
}