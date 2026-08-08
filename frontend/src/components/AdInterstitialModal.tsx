// src/components/AdInterstitialModal.tsx
import { useEffect, useRef, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import { ADSENSE_CLIENT_ID, ADSENSE_INTERSTITIAL_SLOT_ID } from '../lib/adsConfig'
import { ensureAdSenseScriptLoaded } from '../lib/loadAdSenseScript'

const CLOSE_DELAY_SECONDS = 3

interface Props {
    open: boolean
    onClose: () => void
}

export function AdInterstitialModal({ open, onClose }: Props) {
    const [secondsLeft, setSecondsLeft] = useState(CLOSE_DELAY_SECONDS)
    const pushedRef = useRef(false)

    useEffect(() => {
        if (!open) return
        setSecondsLeft(CLOSE_DELAY_SECONDS)
        const interval = setInterval(() => {
            setSecondsLeft((s) => Math.max(0, s - 1))
        }, 1000)
        return () => clearInterval(interval)
    }, [open])

    useEffect(() => {
        if (!open) return
        ensureAdSenseScriptLoaded(ADSENSE_CLIENT_ID)
        if (pushedRef.current) return
        pushedRef.current = true
        try {
            const w = window as typeof window & { adsbygoogle?: unknown[] }
            w.adsbygoogle = w.adsbygoogle || []
            w.adsbygoogle.push({})
        } catch {
            // 광고 차단기 등으로 실패해도 닫기 버튼은 정상 동작
        }
    }, [open])

    return (
        <Dialog open={open} onClose={() => secondsLeft === 0 && onClose()} maxWidth="xs" fullWidth>
            <Box sx={{ position: 'relative', p: 4 }}>
                <IconButton
                    onClick={onClose}
                    disabled={secondsLeft > 0}
                    aria-label="닫기"
                    size="small"
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
                {secondsLeft > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', m: 0 }}>
                        {secondsLeft}초 후 닫기
                    </Typography>
                )}
                <ins
                    className="adsbygoogle"
                    style={{ display: 'block', minHeight: 250, marginTop: 16 }}
                    data-ad-client={ADSENSE_CLIENT_ID}
                    data-ad-slot={ADSENSE_INTERSTITIAL_SLOT_ID}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </Box>
        </Dialog>
    )
}