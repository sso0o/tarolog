// src/lib/loadAdSenseScript.ts
const SCRIPT_ID = 'adsbygoogle-loader'

export function ensureAdSenseScriptLoaded(clientId: string): void {
    if (document.getElementById(SCRIPT_ID)) return
    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.async = true
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`
    script.crossOrigin = 'anonymous'
    document.head.appendChild(script)
}