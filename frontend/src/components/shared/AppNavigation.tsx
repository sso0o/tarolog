// src/components/shared/AppNavigation.tsx
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import StyleIcon from '@mui/icons-material/Style'
import QuizIcon from '@mui/icons-material/Quiz'
import ExtensionIcon from '@mui/icons-material/Extension'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'

interface Props {
    pathname: string
    onNavigate: (path: string) => void
}

const TABS = [
    { root: '/dictionary', entry: '/dictionary', label: '사전', icon: <MenuBookIcon /> },
    { root: '/flashcard', entry: '/flashcard/setup', label: '학습', icon: <StyleIcon /> },
    { root: '/quiz', entry: '/quiz/setup', label: '퀴즈', icon: <QuizIcon /> },
    { root: '/matching', entry: '/matching/setup', label: '매칭', icon: <ExtensionIcon /> },
    { root: '/journal', entry: '/journal', label: '일지', icon: <AutoStoriesIcon /> },
] as const

export function AppNavigation({ pathname, onNavigate }: Props) {
    return (
        <Box
            component="nav"
            aria-label="주요 기능"
            sx={{
                position: 'fixed',
                zIndex: 10,
                left: '50%',
                bottom: 0,
                transform: 'translateX(-50%)',
                display: 'grid',
                gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
                width: 'min(100%, 1280px)',
                bgcolor: 'background.paper',
                border: '2px solid',
                borderBottom: 0,
                borderColor: 'text.primary',
                pb: 'env(safe-area-inset-bottom)',
            }}
        >
            {TABS.map((tab, index) => {
                const selected = pathname.startsWith(tab.root)

                return (
                    <ButtonBase
                        key={tab.root}
                        type="button"
                        aria-current={selected ? 'page' : undefined}
                        onClick={() => onNavigate(tab.entry)}
                        sx={{
                            minWidth: 0,
                            minHeight: 64,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 0.5,
                            color: 'text.primary',
                            bgcolor: selected ? 'var(--feature-accent)' : 'background.paper',
                            borderLeft: index === 0 ? 0 : '2px solid',
                            borderColor: 'text.primary',
                            '&:focus-visible': {
                                outline: '3px solid',
                                outlineColor: 'secondary.main',
                                outlineOffset: '-5px',
                            },
                        }}
                    >
                        {tab.icon}
                        <Typography component="span" variant="caption" fontWeight={700}>
                            {tab.label}
                        </Typography>
                    </ButtonBase>
                )
            })}
        </Box>
    )
}
