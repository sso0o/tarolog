import { createHash } from 'node:crypto'
import { describe, expect, it } from 'vitest'
import cards from '../../../data/cards.ko.json'

const expectedMeanings: Record<string, Partial<{ meaningUpKo: string; meaningRevKo: string }>> = {
  ar02: { meaningRevKo: '직관이 막히거나 내면의 목소리를 무시해 중요한 진실을 놓치는 상태.' },
  ar03: { meaningRevKo: '창조성이 막히고 자신을 돌보지 못하거나, 돌봄이 과잉보호와 의존으로 흐르는 상태.' },
  ar04: { meaningRevKo: '권위가 독단과 경직으로 변하거나, 반대로 자신감과 규율이 부족해 통제력을 잃는 상태.' },
  ar05: { meaningRevKo: '관습에 의문을 품고 새로운 방식을 찾거나, 반대로 경직된 형식주의가 성장을 막는 상태.' },
  ar10: { meaningRevKo: '예상 밖의 악재와 정체 속에서 흐름을 통제하려 하거나 변화에 저항하는 상태.' },
  ar15: { meaningRevKo: '속박을 알아차리고 집착이나 나쁜 습관에서 벗어나 통제력을 되찾는 과정.' },
  ar17: { meaningRevKo: '희망과 자신감을 잃고 회복이 더디거나 자신의 가능성을 믿지 못하는 상태.' },
  wa03: { meaningRevKo: '진행이 지연되고 시야가 좁아져 확장에 장애를 겪는 상태.' },
  wa04: { meaningRevKo: '안정이 흔들리거나 축하가 미뤄지고 공동체 안의 조화가 깨지는 상태.' },
  wa05: { meaningRevKo: '갈등을 피하거나 억누르면서 긴장이 안으로 쌓이거나, 경쟁이 파괴적으로 흐르는 상태.' },
  wa06: { meaningRevKo: '성과를 인정받지 못하거나 자신감이 흔들려 승리가 지연되는 상태.' },
  wa08: { meaningRevKo: '진행이 지연되고 소통이 막히며 조급함 때문에 흐름이 흐트러지는 상태.' },
  waki: {
    meaningUpKo: '큰 그림을 보는 비전과 책임감으로 사람들을 이끄는 리더십.',
    meaningRevKo: '독단과 권위 남용, 충동적인 결정으로 주변을 몰아붙이는 태도.',
  },
  cu02: { meaningRevKo: '상호성이 깨지고 소통이 어긋나 관계의 균형과 신뢰가 흔들리는 상태.' },
  cu08: { meaningRevKo: '변화와 상실이 두려워 떠나지 못하거나, 이미 떠난 자리로 되돌아가는 상태.' },
  swac: { meaningRevKo: '생각이 혼란스럽거나 판단력이 막히고, 지적 힘이 날카롭고 파괴적으로 오용되는 상태.' },
  sw02: { meaningRevKo: '정보와 감정이 뒤엉켜 선택이 더 어려워지거나, 미뤄온 결정을 더는 피할 수 없는 상태.' },
  sw03: { meaningRevKo: '아픔을 받아들이고 용서와 회복을 통해 상처를 놓아주는 과정.' },
  sw04: { meaningRevKo: '충분히 쉬지 못해 불안과 번아웃이 쌓이거나, 휴식을 마치고 다시 움직이는 상태.' },
  sw06: { meaningRevKo: '과거의 짐과 해결되지 않은 문제 때문에 변화를 거부하고 전환이 지연되는 상태.' },
  sw07: { meaningRevKo: '숨겨온 행동이 드러나거나 잘못을 인정하고, 기존 전략을 다시 검토하는 상태.' },
  peac: { meaningRevKo: '현실적인 기회를 놓치거나 준비 부족과 잘못된 판단으로 기반이 흔들리는 상태.' },
  pe05: { meaningRevKo: '어려운 시기를 벗어나 도움을 받아들이며 생활과 재정이 회복되기 시작함.' },
}

describe('modern RWS card meanings', () => {
  it('matches the corrected Korean meanings', () => {
    const cardsById = new Map(cards.map((card) => [card.id, card]))

    for (const [id, expectedMeaning] of Object.entries(expectedMeanings)) {
      expect(cardsById.get(id)).toMatchObject(expectedMeaning)
    }
  })

  it('preserves every upright and reversed ox detail', () => {
    const oxFingerprint = createHash('sha256')
      .update(JSON.stringify(cards.map((card) => [card.id, card.detailUp.ox, card.detailRev.ox])))
      .digest('hex')

    expect(oxFingerprint).toBe('dba8938cc170e32c937fbd8cca72d0780e8c06cb8d4f43dfbe07fa0518f4b4a8')
  })
})
