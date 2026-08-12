// src/App.test.tsx
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithTheme } from './test/renderWithTheme.tsx'
import { App } from './App.tsx'

describe('App shell', () => {
    it('일반 기능 경로에서는 하단 내비게이션을 표시한다', () => {
        renderWithTheme(<App />, ['/dictionary'])

        expect(screen.getByTestId('app-shell')).toHaveAttribute('data-feature', 'dictionary')
        expect(screen.getByRole('navigation', { name: '주요 기능' })).toBeInTheDocument()
    })

    it('집중 경로에서는 하단 내비게이션을 숨긴다', () => {
        renderWithTheme(<App />, ['/journal/new'])

        expect(screen.getByTestId('app-shell')).toHaveAttribute('data-feature', 'journal')
        expect(screen.queryByRole('navigation', { name: '주요 기능' })).not.toBeInTheDocument()
    })
    it('trailing slash가 붙은 집중 경로에서도 하단 내비게이션을 숨긴다', () => {
        renderWithTheme(<App />, ['/journal/new/'])

        expect(screen.queryByRole('navigation')).not.toBeInTheDocument()
    })
})
