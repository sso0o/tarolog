// src/components/shared/AdBannerSpacer.tsx
import Box from '@mui/material/Box'
import { Capacitor } from '@capacitor/core'
import { isPremium } from '../../lib/shared/tier.ts'

interface Props {
    // useAdBannerTopClearance가 계산한, 상태바+배너 실측 높이(px). 배너가 아직 로드되기 전이거나
    // 배너가 다른 위치에 고정된 상태라면 0이다.
    clearance: number
}

export function AdBannerSpacer({ clearance }: Props) {
    // 유료 빌드는 배너를 띄우지 않으므로 자리도 비우지 않는다
    if (!Capacitor.isNativePlatform() || isPremium() || clearance === 0) return null

    return <Box sx={{ height: `${clearance}px`, flexShrink: 0 }} />
}
