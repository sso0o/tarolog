// src/design/system.test.ts
import { describe, expect, it } from 'vitest'
import { colors, featureAccents, featureFromPath, isFocusPath } from './system.ts'

describe('Tarolog design system', () => {
    it('승인된 팔레트를 노출한다', () => {
        expect(colors.canvas).toBe('#F3EAD4')
        expect(colors.paper).toBe('#FFF9EA')
        expect(colors.ink).toBe('#171515')
        expect(colors.brick).toBe('#DA493D')
        expect(colors.lavender).toBe('#C8A5FF')
        expect(colors.gold).toBe('#EFC84B')
    })

    it('기능별 강조색을 제공한다', () => {
        expect(featureAccents.dictionary).toBe(colors.sage)
        expect(featureAccents.flashcard).toBe(colors.gold)
        expect(featureAccents.quiz).toBe(colors.brick)
        expect(featureAccents.matching).toBe(colors.lavender)
        expect(featureAccents.journal).toBe(colors.slateBlue)
    })

    it.each([
        ['/dictionary', 'dictionary'],
        ['/flashcard/setup', 'flashcard'],
        ['/quiz/result', 'quiz'],
        ['/matching/playing', 'matching'],
        ['/journal/new', 'journal'],
    ] as const)('%s 경로를 %s 기능으로 분류한다', (path, feature) => {
        expect(featureFromPath(path)).toBe(feature)
    })

    it.each(['/flashcard/playing', '/quiz/playing', '/matching/playing', '/journal/new'])(
        '%s는 집중 모드다',
        (path) => expect(isFocusPath(path)).toBe(true),
    )
})