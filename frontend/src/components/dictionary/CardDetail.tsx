// src/components/dictionary/CardDetail.tsx
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { Card as CardType } from '../../types/card.ts'

interface Props {
    card: CardType
    onClose: () => void
}

export function CardDetail({ card, onClose }: Props) {
    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent onClick={onClose} sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3, cursor: 'pointer' }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <Box
                        component="img"
                        src={import.meta.env.BASE_URL + card.image.slice(1)}
                        alt={card.nameKo}
                        sx={{ width: 80, aspectRatio: '2/3', objectFit: 'contain', borderRadius: '8px', flexShrink: 0 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 0.5 }}>
                        <Typography variant="h6">{card.nameKo}</Typography>
                        <Typography variant="caption" color="text.secondary">
                            {card.keywordsKo.join(', ')}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box
                        component="section"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 2,
                            borderRadius: '12px',
                            bgcolor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Typography variant="body2" fontWeight={600}>정방향</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{card.meaningUpKo}</Typography>
                    </Box>
                    <Box
                        component="section"
                        sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                            p: 2,
                            borderRadius: '12px',
                            bgcolor: 'grey.50',
                            border: '1px solid',
                            borderColor: 'divider',
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