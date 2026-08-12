// src/components/shared/SplashScreen.test.tsx
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithTheme } from '../../test/renderWithTheme.tsx'
import { SplashScreen } from './SplashScreen.tsx'

describe('SplashScreen', () => {
    it('타로 아카이브 포스터 정보를 표시한다', () => {
        renderWithTheme(<SplashScreen fading={false} />)

        expect(screen.getByText('CHAPTER · 00')).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'TAROLOG' })).toBeInTheDocument()
        expect(screen.getByText('TAROT STUDY ARCHIVE')).toBeInTheDocument()
        expect(screen.getByTestId('splash-screen')).toHaveStyle({ opacity: '1' })
    })

    it('종료 단계에서 투명해진다', () => {
        renderWithTheme(<SplashScreen fading />)

        expect(screen.getByTestId('splash-screen')).toHaveStyle({ opacity: '0' })
    })
})
