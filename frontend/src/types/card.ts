export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type OXValue = 'O' | 'X' | '△'

export interface OrientationDetail {
    love: string
    work: string
    relationship: string
    innerMind: string
    health: string
    ox: OXValue
}

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
    detailUp?: OrientationDetail
    detailRev?: OrientationDetail
}