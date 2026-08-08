// src/lib/androidBackButton.ts
export function resolveBackButtonAction(canGoBack: boolean): 'goBack' | 'exit' {
    return canGoBack ? 'goBack' : 'exit'
}