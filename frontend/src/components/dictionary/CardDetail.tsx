// src/components/dictionary/CardDetail.tsx
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import type { Card as CardType } from '../../types/card.ts'

interface Props {
    card: CardType
    onClose: () => void
}

export function CardDetail({ card, onClose }: Props) {
    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
                <IconButton onClick={onClose} aria-label="닫기" sx={{ alignSelf: 'flex-end' }}>
                    <CloseIcon />
                </IconButton>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <Box
                        component="img"
                        src={import.meta.env.BASE_URL + card.image.slice(1)}
                        alt={card.nameKo}
                        sx={{ width: { xs: 80, sm: 120 }, aspectRatio: '2/3', objectFit: 'contain', borderRadius: 0, flexShrink: 0 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 0.5 }}>
                        <Typography variant="h6">{card.nameKo}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {card.keywordsKo.join(', ')}
                        </Typography>
                    </Box>
                </Box>
                <Divider sx={{ borderColor: 'text.primary' }} />
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 3 }}>
                    <Box
                        component="section"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 2,
                            bgcolor: 'background.default',
                            border: '2px solid',
                            borderColor: 'text.primary',
                        }}
                    >
                        <Typography variant="body2" fontWeight={600}>정방향</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{card.meaningUpKo}</Typography>
                    </Box>
                    <Box
                        component="section"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 2,
                            bgcolor: 'background.default',
                            border: '2px solid',
                            borderColor: 'text.primary',
                        }}
                    >
                        <Typography variant="body2" fontWeight={600}>역방향</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{card.meaningRevKo}</Typography>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
