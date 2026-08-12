// src/components/shared/ExitConfirmDialog.tsx
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

interface Props {
    open: boolean
    title: string
    description: string
    confirmLabel?: string
    onCancel: () => void
    onConfirm: () => void
}

export function ExitConfirmDialog({
    open,
    title,
    description,
    confirmLabel = '종료',
    onCancel,
    onConfirm,
}: Props) {
    return (
        <Dialog open={open} onClose={onCancel} aria-describedby="exit-confirm-description">
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="exit-confirm-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onCancel}>취소</Button>
                <Button color="error" variant="contained" onClick={onConfirm}>
                    {confirmLabel}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
