export interface SpreadTemplate {
    id: string
    name: string
    positions: string[]
    isCustom: boolean
}

export interface ReadingCard {
    position: string
    cardId: string
    reversed: boolean
}

export interface Reading {
    id: string
    createdAt: string
    question: string
    spread: {
        name: string
        positions: string[]
    }
    cards: ReadingCard[]
    interpretation: string
}