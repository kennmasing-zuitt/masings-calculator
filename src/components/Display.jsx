'use client'

import { useSelector } from 'react-redux'
import { selectDisplay } from '@/lib/features/calculator/calculatorSlice'

export default function Display() {
  const { current, previous, operator } = useSelector(selectDisplay)

  return (
    <div className="display" aria-live="polite">
      <div className="display__previous">
        {previous !== null ? `${previous} ${operator ?? ''}` : ''}
      </div>
      <div className="display__current">{current}</div>
    </div>
  )
}
