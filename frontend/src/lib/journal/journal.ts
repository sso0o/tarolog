// src/lib/journal/journal.ts
import type { Reading, ReadingCard } from '../../types/journal'

const STORAGE_KEY = 'tarolog:readings'

export function getReadings(): Reading[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

export function getReadingById(id: string): Reading | null {
    return getReadings().find((r) => r.id === id) ?? null
}

export function addReading(data: Omit<Reading, 'id'>): Reading {
    const reading: Reading = { id: crypto.randomUUID(), ...data }
    const readings = getReadings()
    localStorage.setItem(STORAGE_KEY, JSON.stringify([reading, ...readings]))
    return reading
}

export function deleteReading(id: string): void {
    const readings = getReadings().filter((r) => r.id !== id)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(readings))
}

export function fillPositionsWithCards(positions: string[], cardIds: string[]): ReadingCard[] {
    return positions.map((position, index) => ({
        position,
        cardId: cardIds[index] ?? '',
        reversed: false,
    }))
}