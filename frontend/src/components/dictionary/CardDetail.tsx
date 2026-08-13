// src/components/dictionary/CardDetail.tsx
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import Box from '@mui/material/Box'
import MuiCard from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import { colors } from '../../design/system.ts'
import { isPremium } from '../../lib/shared/tier.ts'
import type { Card as CardType, OrientationDetail, OXValue } from '../../types/card.ts'

interface Props {
    card: CardType
    onClose: () => void
}

const DETAIL_FIELDS: { key: 'love' | 'work' | 'relationship' | 'innerMind'; label: string }[] = [
    { key: 'love', label: '연애' },
    { key: 'work', label: '직장' },
    { key: 'relationship', label: '관계' },
    { key: 'innerMind', label: '내면심리' },
]

const OX_STYLE: Record<OXValue, { color: string }> = {
    '긍정': { color: colors.successInk },
    '부정': { color: colors.brick },
    '모호함': { color: colors.mutedInk },
}

function OxBadge({ value }: { value: OXValue }) {
    const style = OX_STYLE[value]
    return <Chip label={value} size="small" sx={{ color: style.color }} />
}

function PremiumDetailFields({ detail }: { detail: OrientationDetail }) {
    if (!isPremium()) {
        return (
            <Typography variant="caption" color="text.secondary">
                {DETAIL_FIELDS.map(f => f.label).join('·')}는 Pro 에서!
            </Typography>
        )
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {DETAIL_FIELDS.map(({ key, label }) => (
                <Box key={key}>
                    <Typography variant="caption" fontWeight={600}>{label}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {detail[key]}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}

export function CardDetail({ card, onClose }: Props) {
    return (
        <Dialog open onClose={onClose} fullWidth maxWidth="sm">
            <DialogContent onClick={onClose} sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: 3 }}>
                <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <Box
                        component="img"
                        src={import.meta.env.BASE_URL + card.image.slice(1)}
                        alt={card.nameKo}
                        sx={{ width: { xs: 80, sm: 120 }, aspectRatio: '2/3', objectFit: 'contain', borderRadius: 0, flexShrink: 0 }}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 0.5 }}>
                        <Typography variant="h6">{card.nameKo}</Typography>
                    </Box>
                </Box>
                <Divider sx={{ borderColor: 'text.primary' }} />
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }, gap: 3 }}>
                    <MuiCard component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight={600}>정방향</Typography>
                            {card.detailUp && <OxBadge value={card.detailUp.ox} />}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            {card.keywordsUpKo.join(', ')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{card.meaningUpKo}</Typography>
                        {card.detailUp && (
                            <>
                                <Divider />
                                <PremiumDetailFields detail={card.detailUp} />
                            </>
                        )}
                    </MuiCard>
                    <MuiCard component="section" sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight={600}>역방향</Typography>
                            {card.detailRev && <OxBadge value={card.detailRev.ox} />}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                            {card.keywordsRevKo.join(', ')}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>{card.meaningRevKo}</Typography>
                        {card.detailRev && (
                            <>
                                <Divider />
                                <PremiumDetailFields detail={card.detailRev} />
                            </>
                        )}
                    </MuiCard>
                </Box>
            </DialogContent>
        </Dialog>
    )
}