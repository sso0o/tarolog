// src/App.tsx
import { useState } from 'react'
import { DictionaryPage } from './pages/DictionaryPage'
import { FlashcardPage } from './pages/FlashcardPage'

type View = 'dictionary' | 'flashcard'

export function App() {
  const [view, setView] = useState<View>('dictionary')

  return (
      <div className="app">
        <nav>
          <button type="button" aria-pressed={view === 'dictionary'} onClick={() => setView('dictionary')}>
            사전
          </button>
          <button type="button" aria-pressed={view === 'flashcard'} onClick={() => setView('flashcard')}>
            학습
          </button>
        </nav>
        {view === 'dictionary' ? <DictionaryPage /> : <FlashcardPage />}
      </div>
  )
}

export default App