// src/components/shared/AppNavigation.test.tsx
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderWithTheme } from '../../test/renderWithTheme.tsx'
import { AppNavigation } from './AppNavigation.tsx'

describe('AppNavigation', () => {
    it('다섯 기능을 표시하고 현재 기능을 알린다', () => {
        renderWithTheme(<AppNavigation pathname="/quiz/setup" onNavigate={vi.fn()} />)

        const navigation = screen.getByRole('navigation', { name: '주요 기능' })
        expect(navigation).toBeInTheDocument()
        expect(screen.getAllByRole('button')).toHaveLength(5)
        expect(screen.getByRole('button', { name: '퀴즈' })).toHaveAttribute('aria-current', 'page')
        expect(screen.getByRole('button', { name: '사전' })).not.toHaveAttribute('aria-current')
    })

    it('기능 버튼을 누르면 해당 진입 경로로 이동을 요청한다', async () => {
        const user = userEvent.setup()
        const onNavigate = vi.fn()
        renderWithTheme(<AppNavigation pathname="/dictionary" onNavigate={onNavigate} />)

        await user.click(screen.getByRole('button', { name: '학습' }))
        expect(onNavigate).toHaveBeenCalledWith('/flashcard/setup')
    })
})
