// scripts/fetch-images.mjs
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'

const MAJOR_NAMES = {
    0: 'Fool', 1: 'Magician', 2: 'High Priestess', 3: 'Empress', 4: 'Emperor',
    5: 'Hierophant', 6: 'Lovers', 7: 'Chariot', 8: 'Strength', 9: 'Hermit',
    10: 'Wheel of Fortune', 11: 'Justice', 12: 'Hanged Man', 13: 'Death',
    14: 'Temperance', 15: 'Devil', 16: 'Tower', 17: 'Star', 18: 'Moon',
    19: 'Sun', 20: 'Judgement', 21: 'World',
}

function commonsFileName(card) {
    const num = String(card.value_int).padStart(2, '0')
    if (card.type === 'major') {
        return `RWS1909 - ${num} ${MAJOR_NAMES[card.value_int]}.jpeg`
    }
    const suit = card.suit[0].toUpperCase() + card.suit.slice(1)
    return `RWS1909 - ${suit} ${num}.jpeg`
}

const cards = JSON.parse(await readFile('data/cards.raw.json', 'utf-8'))
await mkdir('public/cards', { recursive: true })

const failed = []
for (const card of cards) {
    const dest = `public/cards/${card.name_short}.jpg`
    if (existsSync(dest)) continue

    const fileName = commonsFileName(card)
    const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=600`
    const res = await fetch(url, {
        headers: { 'User-Agent': 'tarolog-image-fetch/1.0 (https://github.com/sso0o/tarolog)' },
    })
    if (!res.ok) {
        failed.push({ id: card.name_short, fileName, status: res.status })
        continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(dest, buf)

    await new Promise((r) => setTimeout(r, 300))
}

console.log(`downloaded ${cards.length - failed.length}/${cards.length} images`)
if (failed.length) console.log('failed:', JSON.stringify(failed, null, 2))