export type Arcana = 'major' | 'minor'
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles'
export type OXValue = '긍정' | '부정' | '모호함'

export interface OrientationDetail {
    love: string
    work: string
    relationship: string
    innerMind: string
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
    keywordsUpKo: string[]
    keywordsRevKo: string[]
    image: string
    detailUp?: OrientationDetail
    detailRev?: OrientationDetail
}