// scripts/fetch-cards.mjs
import { writeFile } from 'node:fs/promises'

const res = await fetch('https://tarotapi.dev/api/v1/cards')
if (!res.ok) throw new Error(`tarotapi.dev request failed: ${res.status}`)

const { cards } = await res.json()
if (cards.length !== 78) throw new Error(`expected 78 cards, got ${cards.length}`)

await writeFile('data/cards.raw.json', JSON.stringify(cards, null, 2))
console.log(`saved ${cards.length} cards to data/cards.raw.json`)