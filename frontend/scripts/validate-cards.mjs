// scripts/validate-cards.mjs
import { readFile } from 'node:fs/promises'

const REQUIRED = ['id', 'nameEn', 'nameKo', 'arcana', 'suit', 'number', 'meaningUpKo', 'meaningRevKo', 'keywordsKo', 'image']
const cards = JSON.parse(await readFile('data/cards.ko.json', 'utf-8'))
const errors = []

if (cards.length !== 78) errors.push(`expected 78 cards, got ${cards.length}`)

const ids = new Set()
for (const card of cards) {
    for (const key of REQUIRED) {
        if (!(key in card)) errors.push(`${card.id ?? '?'}: missing field ${key}`)
    }
    if (card.id) {
        if (ids.has(card.id)) errors.push(`duplicate id ${card.id}`)
        ids.add(card.id)
    }
    if (!card.nameKo?.trim()) errors.push(`${card.id}: empty nameKo`)
    if (!card.meaningUpKo?.trim()) errors.push(`${card.id}: empty meaningUpKo`)
    if (!card.meaningRevKo?.trim()) errors.push(`${card.id}: empty meaningRevKo`)
    if (!Array.isArray(card.keywordsKo) || card.keywordsKo.length === 0) errors.push(`${card.id}: keywordsKo empty`)
}

const majors = cards.filter((c) => c.arcana === 'major').length
const minors = cards.filter((c) => c.arcana === 'minor').length
if (majors !== 22) errors.push(`expected 22 major cards, got ${majors}`)
if (minors !== 56) errors.push(`expected 56 minor cards, got ${minors}`)

if (errors.length) {
    console.error(errors.join('\n'))
    process.exit(1)
}
console.log('cards.ko.json valid: 78 cards, all fields present')