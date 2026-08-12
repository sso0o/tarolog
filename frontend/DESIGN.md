# Tarolog Design System

## 1. Design Direction

Tarolog is a mobile-first tarot dictionary, study tool, quiz, matching game, and reading journal. Its visual language combines a vintage tarot reference book with medium-strength neo-brutalism.

The interface should feel mysterious at first glance and practical during use. Brand surfaces may be editorial and expressive, while search, filters, forms, study controls, and long-form meanings remain direct and readable.

### Keywords

- Occult editorial
- Printed reference book
- Tactile learning tool
- Clear, not ornamental
- Mobile first

### Principles

1. Use mystery for identity and clarity for interaction.
2. Let tarot imagery remain the primary visual content.
3. Prefer hard borders and offset shadows to soft elevation.
4. Keep controls rectangular and legible instead of pill-shaped.
5. Share one system across all five primary features.
6. Use feature colors as accents, not full-screen themes.
7. Support a light theme only.

## 2. Color System

### Core Palette

| Token | Value | Purpose |
|---|---:|---|
| `canvas` | `#F3EAD4` | Parchment page background |
| `paper` | `#FFF9EA` | Cards, inputs, dialogs, readable surfaces |
| `ink` | `#171515` | Primary text, borders, hard shadows |
| `brick` | `#DA493D` | Quiz, destructive actions, warnings |
| `lavender` | `#C8A5FF` | Dictionary, focus, occult accent |
| `gold` | `#EFC84B` | Study, achievement, progress |
| `muted-ink` | `#5B554F` | Secondary text and metadata |
| `disabled-surface` | `#DED4BF` | Disabled controls and quiet separators |
| `success-surface` | `#D7E5C1` | Correct and saved state background |
| `success-ink` | `#213B21` | Correct and saved state text |

The modal backdrop uses `rgba(23, 21, 21, 0.45)`. Semantic colors retain the same border and shape language as the core palette.

### Feature Accents

| Feature | Primary accent | Secondary treatment |
|---|---|---|
| Dictionary | Lavender | Ink |
| Flashcards | Gold | Ink |
| Quiz | Brick | Paper |
| Matching | Lavender | Brick |
| Journal | Ink | Light parchment |

Color never communicates state alone. Labels, icons, border patterns, or check marks must reinforce selected, correct, incorrect, memorized, and disabled states.

## 3. Typography

| Role | Family | Treatment |
|---|---|---|
| Display and card names | `Noto Serif KR`, Korean serif fallback | Editorial, tight leading |
| Body and controls | `Noto Sans KR`, system sans-serif | Clear and neutral |
| Chapter labels and card indexes | `Roboto Mono`, system monospace | Small uppercase metadata |

- Use large editorial display type primarily on the dictionary landing area and splash screen.
- Use compact page headings on setup, play, result, and editing screens.
- Body copy uses generous line height for upright and reversed meanings and journal interpretation.
- Do not rely on weight below `400` or above `700`.
- Long Korean card names and labels must wrap without overlapping adjacent controls.

## 4. Shape, Border, and Depth

### Borders

- Standard component border: `2px solid ink`
- Dialog and emphasized container border: `3px solid ink`
- Quiet dividers: `1px solid` derived from ink
- Focus: lavender outer ring plus a visible ink boundary

### Radius

- Default: `0`
- Small functional softening: `4px`
- Tarot artwork may retain the shape of the source image.
- Pills and large rounded cards are not part of the system.

### Shadows and Pressed State

- Default hard shadow: `4px 4px 0 ink`
- Large poster/dialog shadow: `8px 8px 0 ink`
- Pressing a control moves it toward its shadow and reduces the offset.
- Soft blur shadows are reserved for the modal backdrop only.

## 5. Layout and App Shell

### General Layout

- Keep the current `1280px` maximum app width.
- Use `16px` page gutters below `600px`, `24px` from `600px`, and `32px` from `900px`.
- Keep reading and form content centered at a maximum width of `720px`; card collections may use the full app width.
- Use a `4px` spacing base with `8`, `12`, `16`, `24`, `32`, and `48px` as the primary rhythm.
- Respect Android status-bar, navigation-bar, and display-cutout safe areas.

### Page Header

Each primary feature begins with a chapter label and Korean page title, for example:

```text
CHAPTER 01 · DICTIONARY
카드 사전
```

The dictionary receives the largest editorial header. Setup, play, result, detail, and editing routes use a compact variant.

### Bottom Navigation

- Preserve the five destinations: Dictionary, Flashcards, Quiz, Matching, Journal.
- Use five rectangular cells divided by ink lines.
- Show icon and label together.
- Fill the active cell with the corresponding feature accent.
- Keep the navigation aligned to the centered app container on desktop.
- Include bottom safe-area padding on Android.

### Focus Mode

Hide the global bottom navigation during:

- Flashcard play
- Quiz play
- Matching play
- New journal entry

Focus mode provides its own progress, back or exit action, and primary controls. Setup, result, browsing, and journal detail screens keep the bottom navigation.

### Splash Screen

The splash screen resembles a printed tarot poster:

- Full ink background
- Cream `TAROLOG` wordmark
- Lavender star or celestial mark
- Small gold chapter/index detail
- Existing fade timing remains; reduced-motion users receive an immediate transition

## 6. Common Components

### Buttons

- Primary: feature accent fill, `2px` ink border, hard shadow, minimum `48px` height
- Secondary: paper fill, ink border, smaller hard shadow
- Tertiary: text action with a visible rectangular touch boundary when needed
- Destructive: brick label or fill, used only for explicit destructive actions
- Disabled: readable ink-derived text plus a pattern or label; do not communicate disability through low opacity alone

### Inputs

- Paper surface, `2px` ink border, square or `4px` corners
- Persistent label when the value or purpose could become unclear
- Lavender focus ring
- Error message remains visible near the field and uses brick plus an icon or label

### Filters and Toggles

- Use compact rectangular labels rather than pills.
- Selected filters use a feature-color fill and an ink border.
- Multi-row filter groups must wrap without horizontal page scrolling.

### Cards

- Add a bordered surface only when content forms one actionable unit.
- Tarot thumbnails keep visual priority over decorative chrome.
- Journal cards resemble stamped record slips.
- Setup sections use numbered editorial blocks rather than unrelated floating cards.

### Dialogs and Bottom Sheets

- Dialogs resemble printed posters with a `3px` border and large hard shadow.
- Provide an explicit close control; clicking dialog content must not close it.
- Backdrop click and Escape or Android back may close non-destructive dialogs.
- Bottom sheets resemble an index drawer and include a visible top boundary and heading.
- Destructive confirmations state the consequence and provide distinct cancel and confirm actions.

### Motion

- Use motion only for pressing, card flipping, dialog or sheet entry, and splash transition.
- Avoid looping decorative animation.
- Honor `prefers-reduced-motion` with immediate state changes.

## 7. Feature Specifications

### Dictionary

- Order: editorial header, search, arcana and suit filters, result count and view control, results.
- Preserve grid and list modes and the stored view preference.
- Grid columns: 3 below `390px`, 4 from `390px`, 6 from `600px`, and 8 from `900px`.
- List rows show thumbnail, Korean name, and up to three keywords.
- Empty results use an editorial notice with a clear filter-reset path.
- Card detail remains a modal dialog.
- Upright and reversed meanings stack below `600px` and use two columns from `600px`.
- The dialog includes an explicit close button and does not close when its content is tapped.

### Flashcards

- Setup uses numbered sections: meaning direction, card range, memorization scope, and count.
- Playing uses focus mode with progress at the top and one large card at the center.
- Front shows the tarot image; back shows the name and relevant meanings.
- Previous and next actions remain reachable near the bottom.
- Memorized state uses a stamp-like toggle labeled `외웠어요`.
- Ending a session requires confirmation.

### Quiz

- Setup reuses the numbered-section pattern.
- Playing uses focus mode.
- Show progress, one prompt, and large `A/B/C/D` rectangular answers.
- Correct and incorrect states use labels and border treatment in addition to color.
- Results resemble a marked test sheet with score, missed cards, restart, and setup actions.

### Matching

- Setup reuses the numbered-section pattern.
- Playing uses focus mode.
- Image and meaning cards have distinct labels and structure.
- Selected pairs, correct pairs, and incorrect pairs use different border patterns and text states.
- Results present elapsed time and attempts as a compact record sheet.

### Journal

- The journal list uses dated record cards and preserves the new-entry and spread-management actions.
- New entry uses numbered sections: question, spread, card placement, interpretation.
- New entry uses focus mode and a persistent save action above the safe area.
- Spread and card pickers remain bottom sheets.
- Detail resembles a single reading record with date, question, spread, card positions, and interpretation.
- Delete remains a distinct destructive action with confirmation.

## 8. States and Error Handling

- Static tarot data does not need a loading skeleton.
- Empty states explain what is empty and provide the most relevant next action.
- Local-storage failures keep the current unsaved input visible whenever possible.
- Save failures show a persistent, actionable message rather than relying only on a transient snackbar.
- Missing journal records continue to redirect safely to the journal list.
- Session exit and destructive actions require confirmation when progress or data would be lost.

## 9. Accessibility

- Minimum touch target: `44px`; primary mobile actions: at least `48px` high.
- Preserve semantic buttons, labels, dialogs, headings, and list structures supplied by MUI.
- Maintain a visible keyboard focus state on every interactive element.
- Provide accessible names for icon-only controls.
- Avoid text inside low-contrast feature-color combinations.
- Ensure the UI remains understandable without animation or color.
- Android back behavior must match close, previous, exit-confirmation, and navigation expectations.

## 10. Responsive and Quality Verification

Verify at minimum:

- `360px` narrow phone
- `390px` common phone
- `768px` tablet
- `1280px` desktop container

Use long Korean card names, long keywords, long meanings, and long journal text during layout checks. Verify these critical flows:

1. Search, filter, switch views, and open or close card detail.
2. Configure, run, memorize, navigate, and exit flashcards.
3. Configure, complete, and restart a quiz.
4. Configure and complete a matching session.
5. Create, save, view, and delete a journal entry.
6. Open and close card and spread bottom sheets.
7. Navigate and exit with Android back.

Run the existing unit tests, lint, and production build after implementation. The redesign must not change card data, quiz generation, progress storage, matching logic, journal storage formats, or route meanings.

## 11. Out of Scope

- Dark mode or a manual theme switcher
- New learning modes or journal features
- Changes to tarot card data or source images
- Server-side storage, accounts, or synchronization
- Replacing MUI or React Router
- Unrelated business-logic refactoring
