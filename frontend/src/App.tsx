import { useState } from 'react'
import { DictionaryPage } from './pages/DictionaryPage'
import { FlashcardPage } from './pages/FlashcardPage'

type View = 'dictionary' | 'flashcard'

const navBtnClass =
  'text-button-md rounded-full px-md py-xs border border-hairline text-steel bg-canvas cursor-pointer ' +
  'aria-pressed:bg-primary aria-pressed:text-on-primary aria-pressed:border-primary'

export function App() {
  const [view, setView] = useState<View>('dictionary')

  return (
    <div className="flex flex-col min-h-svh">
      <nav className="flex items-center justify-center gap-xs px-xxl h-16 border-b border-hairline bg-canvas sticky top-0 z-10">
        <button
          type="button"
          aria-pressed={view === 'dictionary'}
          onClick={() => setView('dictionary')}
          className={navBtnClass}
        >
          사전
        </button>
        <button
          type="button"
          aria-pressed={view === 'flashcard'}
          onClick={() => setView('flashcard')}
          className={navBtnClass}
        >
          학습
        </button>
      </nav>
      {view === 'dictionary' ? <DictionaryPage /> : <FlashcardPage />}
    </div>
  )
}

export default App