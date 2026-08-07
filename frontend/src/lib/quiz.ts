// src/lib/quiz.ts
import type { Card } from '../types/card'

export type QuizType = 'image-to-name' | 'name-to-meaning' | 'mixed'
export type MeaningDirection = 'up' | 'reversed' | 'random'

export interface QuizChoice {
    text: string
    card: Card
}

export interface QuizQuestion {
    card: Card
    type: 'image-to-name' | 'name-to-meaning'
    direction: 'up' | 'reversed' | null
    choices: QuizChoice[]
    correctIndex: number
}

function shuffle<T>(items: T[]): T[] {
    const result = [...items]
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
}

function pickQuestionType(quizType: QuizType): 'image-to-name' | 'name-to-meaning' {
    if (quizType === 'mixed') {
        return Math.random() < 0.5 ? 'image-to-name' : 'name-to-meaning'
    }
    return quizType
}

function pickDirection(direction: MeaningDirection): 'up' | 'reversed' {
    if (direction === 'random') {
        return Math.random() < 0.5 ? 'up' : 'reversed'
    }
    return direction
}

function buildChoices(
    correctCard: Card,
    pool: Card[],
    extract: (c: Card) => string,
): { choices: QuizChoice[]; correctIndex: number } {
    const distractorPool = pool.filter((c) => c.id !== correctCard.id)
    const distractorCards = shuffle(distractorPool).slice(0, 3)
    const rawChoices = [correctCard, ...distractorCards].map((c) => ({ text: extract(c), card: c }))
    const choices = shuffle(rawChoices)
    return { choices, correctIndex: choices.findIndex((c) => c.card.id === correctCard.id) }
}

export function buildQuiz(
    pool: Card[],
    quizType: QuizType,
    direction: MeaningDirection,
    count: number,
): QuizQuestion[] {
    const questionCount = Math.min(count, pool.length)
    const selectedCards = shuffle(pool).slice(0, questionCount)

    return selectedCards.map((card) => {
        const type = pickQuestionType(quizType)

        if (type === 'image-to-name') {
            const { choices, correctIndex } = buildChoices(card, pool, (c) => c.nameKo)
            return { card, type, direction: null, choices, correctIndex }
        }

        const cardDirection = pickDirection(direction)
        const extract = cardDirection === 'up' ? (c: Card) => c.meaningUpKo : (c: Card) => c.meaningRevKo
        const { choices, correctIndex } = buildChoices(card, pool, extract)
        return { card, type, direction: cardDirection, choices, correctIndex }
    })
}