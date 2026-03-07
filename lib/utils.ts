import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: 'USD' | 'EUR' | 'GBP' | 'TND'
    notation?: Intl.NumberFormatOptions['notation']
  } = {}
) {
  const { currency = 'TND', notation = 'standard' } = options

  const numericPrice = typeof price === 'string' ? parseFloat(price) : price

  const formatted = new Intl.NumberFormat('fr-TN', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 3,
  }).format(numericPrice)

  // Always replace TND with DT visually in the UI
  if (currency === 'TND') {
    return formatted.replace('TND', 'DT')
  }

  return formatted
}

