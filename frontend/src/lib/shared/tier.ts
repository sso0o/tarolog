// src/lib/shared/tier.ts
export function isPremium(): boolean {
    return import.meta.env.VITE_APP_TIER === 'paid'
}