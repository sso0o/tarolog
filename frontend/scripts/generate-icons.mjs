// scripts/generate-icons.mjs
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import sharp from 'sharp'

const BG = '#F3EAD4'
const svg = await readFile('public/favicon.svg')

async function makeIcon(dest, size, logoSize) {
    const logo = await sharp(svg).resize(logoSize, Math.round(logoSize * 46 / 48)).png().toBuffer()
    const offset = Math.round((size - logoSize) / 2)
    const buf = await sharp({
        create: { width: size, height: size, channels: 4, background: BG },
    })
        .composite([{ input: logo, left: offset, top: Math.round((size - logoSize * 46 / 48) / 2) }])
        .png()
        .toBuffer()
    await writeFile(dest, buf)
}

await mkdir('public/icons', { recursive: true })
await makeIcon('public/icons/icon-192.png', 192, 140)
await makeIcon('public/icons/icon-512.png', 512, 370)
await makeIcon('public/icons/icon-maskable-512.png', 512, 300)

console.log('icons generated in public/icons/')
