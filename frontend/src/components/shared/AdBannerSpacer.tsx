// src/components/shared/AdBannerSpacer.tsx
import Box from '@mui/material/Box'
import { Capacitor } from '@capacitor/core'
import { isPremium } from '../../lib/shared/tier.ts'

// AdMob 배너(BannerAdSize.BANNER, 320x50)는 웹뷰 위에 뜨는 네이티브 오버레이라
// 실제 높이/위치를 CSS에서 알 수 없다. 안드로이드 웹뷰는 env(safe-area-inset-top)이
// 상태바 높이를 반영하지 않아(iOS와 다름) 상수로 보정해야 한다. 16px은 실기기에서
// 상태바 높이를 감안해 겹침 없이 확인한 보정값이다.
const AD_BANNER_CLEARANCE = 'calc(50px + 16px)'

export function AdBannerSpacer() {
    // 유료 빌드는 useAdmobBanner가 배너를 띄우지 않으므로 자리도 비우지 않는다
    if (!Capacitor.isNativePlatform() || isPremium()) return null

    return <Box sx={{ height: AD_BANNER_CLEARANCE, flexShrink: 0 }} />
}
