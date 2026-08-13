/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Pro 전용 해설은 화면에서 가리는 것만으로는 부족하다. 무료 빌드 번들에 그대로
// 들어가면 누구나 읽을 수 있으므로 빌드 시점에 잘라낸다. ox는 무료에서도 쓰므로 남긴다.
const PRO_DETAIL_FIELDS = ['love', 'work', 'relationship', 'innerMind']

function stripProCardFields(isPaid: boolean): Plugin {
    return {
        name: 'strip-pro-card-fields',
        enforce: 'pre',
        transform(code, id) {
            if (isPaid || !id.includes('cards.ko.json')) return
            const cards = JSON.parse(code)
            for (const card of cards) {
                for (const detail of [card.detailUp, card.detailRev]) {
                    if (!detail) continue
                    for (const field of PRO_DETAIL_FIELDS) delete detail[field]
                }
            }
            return JSON.stringify(cards)
        },
    }
}

export default defineConfig(({ mode }) => ({
    plugins: [
        react(),
        stripProCardFields(loadEnv(mode, process.cwd(), '').VITE_APP_TIER === 'paid'),
    ],
    base: '/tarolog/',
    test: {
        environment: 'jsdom',
        globals: true,
    },
}))
