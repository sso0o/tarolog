// scripts/optimize-images.mjs
// fetch-images.mjs가 받아온 원본은 825px 폭에 장당 ~280KB라 78장이면 22MB다.
// 앱에서 카드가 가장 크게 보이는 곳이 240 CSS px이라 600px면 2.5배 DPR까지 커버된다.
// ponytail: 확장자를 유지해 cards.ko.json의 image 경로를 건드리지 않는다.
// 더 줄여야 하면 webp 전환(같은 화질에 -30%)이 다음 단계.
import { readdir, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const DIR = 'public/cards'
const MAX_WIDTH = 600

const files = (await readdir(DIR)).filter((f) => f.endsWith('.jpg'))
let before = 0
let after = 0

for (const file of files) {
    const path = `${DIR}/${file}`
    const original = await readFile(path)
    const optimized = await sharp(original)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toBuffer()

    before += original.length
    after += optimized.length
    await writeFile(path, optimized)
}

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`${files.length} images: ${mb(before)}MB -> ${mb(after)}MB`)
