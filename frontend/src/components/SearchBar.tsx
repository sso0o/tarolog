// src/components/SearchBar.tsx
interface Props {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="카드 이름 또는 키워드 검색"
      aria-label="카드 검색"
      className="w-full h-9 bg-surface border border-hairline rounded-md px-md text-body-sm text-ink placeholder:text-steel outline-none focus:border-2 focus:border-brand-blue-deep"
    />
  )
}