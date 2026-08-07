// src/components/AdBanner.tsx
import { useEffect, useRef } from 'react'
import Box from '@mui/material/Box'
import { ADSENSE_CLIENT_ID, ADSENSE_SLOT_ID, isAdsEnabled } from '../lib/adsConfig'
import { ensureAdSenseScriptLoaded } from '../lib/loadAdSenseScript'

export function AdBanner() {
    const pushedRef = useRef(false)

    useEffect(() => {
        if (!isAdsEnabled()) return
        ensureAdSenseScriptLoaded(ADSENSE_CLIENT_ID)
        if (pushedRef.current) return
        pushedRef.current = true
        try {
            const w = window as typeof window & { adsbygoogle?: unknown[] }
            w.adsbygoogle = w.adsbygoogle || []
            w.adsbygoogle.push({})
        } catch {
            // 광고 차단기 등으로 실패해도 화면에는 영향 없음
        }
    }, [])

    if (!isAdsEnabled()) return null

    return (
        <Box
            sx={{
                position: 'sticky',
                bottom: 0,
                borderTop: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
            }}
        >
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client={ADSENSE_CLIENT_ID}
                data-ad-slot={ADSENSE_SLOT_ID}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </Box>
    )
}