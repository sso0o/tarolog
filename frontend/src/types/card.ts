export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'

export interface Card {
    id: string
    nameEn: string
    nameKo: string
    arcana: Arcana
    suit: Suit | null
    number: number
    meaningUpKo: string
    meaningRevKo: string
    keywordsKo: string[]
    image: string
}