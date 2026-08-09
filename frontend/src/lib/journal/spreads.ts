// src/lib/journal/spreads.ts
import type { SpreadTemplate } from '../../types/journal'

const STORAGE_KEY = 'tarolog:spreads'

export function getCustomSpreads(): SpreadTemplate[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export function addCustomSpread(data: { name: string; positions: string[] }): SpreadTemplate {
    const spread: SpreadTemplate = {
        id: crypto.randomUUID(),
        name: data.name,
        positions: data.positions,
        isCustom: true,
    }
    const spreads = getCustomSpreads()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...spreads, spread]))
    return spread
}

export function deleteCustomSpread(id: string): void {
    const spreads = getCustomSpreads().filter((s) => s.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(spreads))
}