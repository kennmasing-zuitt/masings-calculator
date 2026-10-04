'use client'

import { useDispatch } from 'react-redux'
import {
  digitPressed,
  operatorPressed,
  equalsPressed,
  clearPressed,
} from '@/lib/features/calculator/calculatorSlice'

export default function Keypad() {
  const dispatch = useDispatch()

  const digit = (d) => (
    <button key={d} className={d === '0' ? 'key key--zero' : 'key'} onClick={() => dispatch(digitPressed(d))}>
      {d}
    </button>
  )
  const op = (o) => (
    <button key={o} className="key key--operator" onClick={() => dispatch(operatorPressed(o))}>
      {o}
    </button>
  )

  return (
    <div className="keypad">
      <button className="key key--clear" onClick={() => dispatch(clearPressed())}>
        Clear
      </button>
      {op('÷')}
      {digit('7')}{digit('8')}{digit('9')}{op('×')}
      {digit('4')}{digit('5')}{digit('6')}{op('−')}
      {digit('1')}{digit('2')}{digit('3')}{op('+')}
      {digit('0')}{digit('.')}
      <button className="key key--equals" onClick={() => dispatch(equalsPressed())}>
        =
      </button>
    </div>
  )
}
