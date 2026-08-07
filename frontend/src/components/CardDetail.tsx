// src/components/CardDetail.tsx
import type { Card } from '../types/card'

interface Props {
  card: Card
  onClose: () => void
}

export function CardDetail({ card, onClose }: Props) {
  return (
    <div
      className="bg-canvas rounded-hero shadow-[rgba(36,36,36,0.08)_0px_12px_16px_-4px] p-xxl flex flex-col items-center gap-md mb-md"
      role="dialog"
      aria-label={`${card.nameKo} 상세`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="닫기"
        className="w-9 h-9 border border-hairline rounded-full flex items-center justify-center self-end text-ink text-body-sm cursor-pointer bg-canvas"
      >
        ✕
      </button>
      <img
        src={import.meta.env.BASE_URL + card.image.slice(1)}
        alt={card.nameKo}
        className="rounded-xl max-w-[240px] w-full h-auto"
      />
      <h2 className="text-heading-sm text-ink m-0">{card.nameKo}</h2>
      <p className="text-body-sm text-slate m-0">{card.keywordsKo.join(', ')}</p>
      <section className="w-full flex flex-col gap-xs">
        <h3 className="text-body-sm-medium text-ink m-0">정방향</h3>
        <p className="text-body-md text-charcoal m-0">{card.meaningUpKo}</p>
      </section>
      <section className="w-full flex flex-col gap-xs">
        <h3 className="text-body-sm-medium text-ink m-0">역방향</h3>
        <p className="text-body-md text-charcoal m-0">{card.meaningRevKo}</p>
      </section>
    </div>
  )
}