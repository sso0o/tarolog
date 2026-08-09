// src/lib/journal/presets.ts
import type { SpreadTemplate } from '../../types/journal'

export const PRESET_SPREADS: SpreadTemplate[] = [
    {
        id: 'preset-one-card',
        name: '원 카드',
        positions: ['카드'],
        isCustom: false,
    },
    {
        id: 'preset-three-card',
        name: '쓰리 카드',
        positions: ['과거', '현재', '미래'],
        isCustom: false,
    },
    {
        id: 'preset-celtic-cross',
        name: '켈틱 크로스',
        positions: ['현재', '장애물', '과거', '미래', '의식', '무의식', '조언', '외부 영향', '희망/두려움', '결과'],
        isCustom: false,
    },
]