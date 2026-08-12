// src/components/SearchBar.tsx
import TextField from '@mui/material/TextField'

interface Props {
    value: string
    onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
    return (
        <TextField
            fullWidth
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="카드 이름 또는 키워드 검색"
            slotProps={{ htmlInput: { 'aria-label': '카드 검색' } }}
            size="small"
            sx={{ '& .MuiInputBase-root': { minHeight: 48 } }}
        />
    )
}
