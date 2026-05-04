'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { BasketItem } from '@/types'

interface QuoteBasketContextValue {
  items: BasketItem[]
  totalItems: number
  addItem: (item: Omit<BasketItem, 'quantity'>) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearBasket: () => void
  isInBasket: (productId: string) => boolean
}

const QuoteBasketContext = createContext<QuoteBasketContextValue | null>(null)

const STORAGE_KEY = 'btg-quote-basket'

export function QuoteBasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setItems(JSON.parse(stored))
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items, hydrated])

  const addItem = useCallback((item: Omit<BasketItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === item.productId)
      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }, [])

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    )
  }, [])

  const clearBasket = useCallback(() => {
    setItems([])
  }, [])

  const isInBasket = useCallback(
    (productId: string) => items.some((i) => i.productId === productId),
    [items]
  )

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <QuoteBasketContext.Provider
      value={{ items, totalItems, addItem, removeItem, updateQuantity, clearBasket, isInBasket }}
    >
      {children}
    </QuoteBasketContext.Provider>
  )
}

export function useQuoteBasket(): QuoteBasketContextValue {
  const ctx = useContext(QuoteBasketContext)
  if (!ctx) throw new Error('useQuoteBasket must be used within QuoteBasketProvider')
  return ctx
}
