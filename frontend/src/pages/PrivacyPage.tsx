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
                시행일: 2026년 8월 23일
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
                타로그 무료 버전은 Google AdMob을 통해 배너 광고와 전면 광고를
                제공합니다. Pro(유료) 버전에는 광고가 없습니다. AdMob은 광고 제공을
                위해 광고 식별자(Advertising ID) 등의 정보를 수집할 수 있으며,
                기기의 광고 설정에서 광고 개인화를 제한할 수 있습니다.
            </Section>

            <Section title='4. 제3자 제공'>
                타로그는 자체적으로 개인정보를 수집하지 않지만, 무료 버전에 포함된
                Google AdMob이 광고 제공을 위해 광고 식별자 등의 정보를 Google에
                제공할 수 있습니다. 자세한 내용은 Google의 개인정보처리방침을
                참고해 주세요.
            </Section>

            <Section title='5. 문의'>
                {'개인정보 처리방침에 관한 문의는 아래 이메일로 연락해 주세요.\nthduschdl@gmail.com'}
            </Section>

            <Divider sx={{ my: 4 }} />

            <Typography variant='h5' fontWeight='bold' gutterBottom>
                Privacy Policy
            </Typography>
            <Typography variant='body2' color='text.secondary' gutterBottom>
                Effective Date: August 23, 2026
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Section title='1. Information We Collect'>
                Tarolog does not collect any personal information.
            </Section>

            <Section title='2. On-Device Storage'>
                Study progress is stored only in your device&apos;s local storage (localStorage) and is never transmitted to external servers.
            </Section>

            <Section title='3. Advertisements'>
                {'The free version of Tarolog displays banner and interstitial ads via Google AdMob. The Pro (paid) version contains no ads. AdMob may collect information such as the advertising identifier to serve ads, and you can limit ad personalization in your device’s ad settings.'}
            </Section>

            <Section title='4. Third-Party Sharing'>
                {'Tarolog itself does not collect personal information, but Google AdMob, included in the free version, may share information such as the advertising identifier with Google to serve ads. Please refer to Google’s Privacy Policy for details.'}
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