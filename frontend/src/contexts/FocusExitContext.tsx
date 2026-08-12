// src/contexts/FocusExitContext.tsx
import { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'

type ExitHandler = () => void

interface FocusExitValue {
    register: (handler: ExitHandler) => () => void
    request: () => boolean
}

const FocusExitContext = createContext<FocusExitValue | null>(null)

export function FocusExitProvider({ children }: { children: ReactNode }) {
    const handlerRef = useRef<ExitHandler | null>(null)

    const register = useCallback((handler: ExitHandler) => {
        handlerRef.current = handler
        return () => {
            if (handlerRef.current === handler) handlerRef.current = null
        }
    }, [])

    const request = useCallback(() => {
        if (!handlerRef.current) return false
        handlerRef.current()
        return true
    }, [])

    return (
        <FocusExitContext.Provider value={{ register, request }}>
            {children}
        </FocusExitContext.Provider>
    )
}

function useFocusExitContext() {
    const value = useContext(FocusExitContext)
    if (!value) throw new Error('FocusExitProvider가 필요합니다')
    return value
}

export function useRegisterFocusExit(handler: ExitHandler | null) {
    const { register } = useFocusExitContext()
    useEffect(() => {
        if (!handler) return
        return register(handler)
    }, [handler, register])
}

export function useRequestFocusExit() {
    return useFocusExitContext().request
}