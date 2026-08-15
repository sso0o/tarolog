// src/lib/progress.ts
const STORAGE_KEY = 'tarolog:memorized'

export function getMemorizedIds(): string[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export function isMemorized(id: string): boolean {
    return getMemorizedIds().includes(id)
}

export function toggleMemorized(id: string): void {
    try {
        const ids = new Set(getMemorizedIds())
        if (ids.has(id)) {
            ids.delete(id)
        } else {
            ids.add(id)
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]))
    } catch {
        // localStorage unavailable (e.g. disabled/private mode) — progress just won't persist
    }
}

export function markAllMemorized(ids: string[]): void {
    try {
        const existing = new Set(getMemorizedIds())
        ids.forEach((id) => existing.add(id))
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing]))
    } catch {
        // localStorage unavailable (e.g. disabled/private mode) — progress just won't persist
    }
}

export function clearAllMemorized(): void {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
    } catch {
        // localStorage unavailable (e.g. disabled/private mode) — progress just won't persist
    }
}