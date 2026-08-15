// src/components/shared/ErrorBoundary.tsx
import { Component } from 'react'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

interface Props {
    children: ReactNode
}

interface State {
    failed: boolean
}

// ponytail: 에러 내용을 화면에 보여주지 않는다. 리포트할 서버가 없으므로
// 사용자가 할 수 있는 건 다시 시작하는 것뿐이다.
export class ErrorBoundary extends Component<Props, State> {
    state: State = { failed: false }

    static getDerivedStateFromError(): State {
        return { failed: true }
    }

    render() {
        if (!this.state.failed) return this.props.children

        return (
            <Box
                sx={{
                    minHeight: '100svh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 3,
                    px: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h6">문제가 생겼어요</Typography>
                <Typography variant="body2" color="text.secondary">
                    앱을 다시 시작하면 저장된 학습 진도와 일지는 그대로 남아 있어요.
                </Typography>
                <Button variant="outlined" onClick={() => window.location.reload()}>
                    다시 시작
                </Button>
            </Box>
        )
    }
}
