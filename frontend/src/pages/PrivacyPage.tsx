// src/pages/PrivacyPage.tsx
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'

export function PrivacyPage() {
    return (
        <Box sx={{ px: 4, py: 6, maxWidth: 680, mx: 'auto' }}>
            <Typography variant='h5' fontWeight='bold' gutterBottom>
                개인정보 처리방침
            </Typography>
            <Typography variant='body2' color='text.secondary' gutterBottom>
                시행일: 2026년 8월 9일
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Section title='1. 수집하는 개인정보'>
                타로그는 현재 개인정보를 수집하지 않습니다.
            </Section>

            <Section title='2. 기기 내 저장'>
                학습 진도는 사용자의 기기 로컬 저장소(localStorage)에만 저장되며,
                외부 서버로 전송되지 않습니다.
            </Section>

            <Section title='3. 광고'>
                현재 앱 내 광고가 없습니다. 향후 광고가 추가될 경우 제3자 광고
                SDK가 광고 식별자 등의 정보를 수집할 수 있으며, 변경 사항 발생 시
                본 처리방침을 업데이트할 예정입니다.
            </Section>

            <Section title='4. 제3자 제공'>
                수집된 개인정보가 없으므로 제3자에게 제공하지 않습니다.
            </Section>

            <Section title='5. 문의'>
                {'개인정보 처리방침에 관한 문의는 아래 이메일로 연락해 주세요.\nthduschdl@gmail.com'}
            </Section>

            <Divider sx={{ my: 4 }} />

            <Typography variant='h5' fontWeight='bold' gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant='body2' color='text.secondary' gutterBottom>
                Effective Date: August 9, 2026
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Section title='1. Information We Collect'>
                Tarolog does not collect any personal information.
            </Section>

            <Section title='2. On-Device Storage'>
                Study progress is stored only in your device&apos;s local storage (localStorage) and is never transmitted to external servers.
            </Section>

            <Section title='3. Advertisements'>
                {'There are currently no advertisements in the app. If advertisements are added in the future, third-party ad SDKs may collect information such as advertising identifiers, and this policy will be updated accordingly.'}
            </Section>

            <Section title='4. Third-Party Sharing'>
                Since no personal information is collected, we do not share any data with third parties.
            </Section>

            <Section title='5. Contact'>
                {'For inquiries regarding this privacy policy, please contact us at:\nthduschdl@gmail.com'}
            </Section>
        </Box>
    )
}

interface Props {
    title: string
    children: string
}

function Section({ title, children }: Props) {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography variant='subtitle1' fontWeight='bold' gutterBottom>
                {title}
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'pre-line' }}>
                {children}
            </Typography>
        </Box>
    )
}