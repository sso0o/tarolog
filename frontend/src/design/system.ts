// src/design/system.ts
export const colors = {
    canvas: '#F3EAD4',
    paper: '#FFF9EA',
    ink: '#171515',
    brick: '#DA493D',
    lavender: '#C8A5FF',
    gold: '#EFC84B',
    slateBlue: '#7B93B0',
    sage: '#8FA878',
    mutedInk: '#5B554F',
    disabledSurface: '#DED4BF',
    successSurface: '#D7E5C1',
    successInk: '#213B21',
} as const

export const headingFontSizeSx = {
    fontSize: { xs: '1.75rem', sm: '2.5rem' },
    '@media (max-width: 400px)': { fontSize: '1.5rem' },
} as const

export type Feature = 'dictionary' | 'flashcard' | 'quiz' | 'matching' | 'journal'

export const featureAccents: Record<Feature, string> = {
    dictionary: colors.sage,
    flashcard: colors.gold,
    quiz: colors.brick,
    matching: colors.lavender,
    journal: colors.slateBlue,
}

export function featureFromPath(pathname: string): Feature {
    if (pathname.startsWith('/flashcard')) return 'flashcard'
    if (pathname.startsWith('/quiz')) return 'quiz'
    if (pathname.startsWith('/matching')) return 'matching'
    if (pathname.startsWith('/journal')) return 'journal'
    return 'dictionary'
}

export function isFocusPath(pathname: string): boolean {
    return pathname === '/flashcard/playing'
        || pathname === '/quiz/playing'
        || pathname === '/matching/playing'
        || pathname === '/journal/new'
}