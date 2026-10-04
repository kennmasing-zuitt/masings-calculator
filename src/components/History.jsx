'use client'

import { useSelector } from 'react-redux'
import { selectHistory } from '@/lib/features/calculator/pbbBbkCalculatorSlice'

export default function History() {
  const history = useSelector(selectHistory)

  console.log(
    '%cHISTORY',
    'background:green; color:white; padding:5px; border-radius:5px;',
    history,
  );

  const allResult = history.map((h) => parseInt(h.result));
  console.log("ALL RESULT", allResult);
  const totalSum = allResult.reduce((accumulator, current) => accumulator + current, 0);
  console.log("ALL RESULT", totalSum);

  return (
    <aside className="history" aria-label="History">
      <h2 className="history__title">History</h2>
      {history.length === 0 ? (
        <p className="history__empty">No calculations yet.</p>
      ) : (
        <ol className="history__list">
          {/* .slice() first! .reverse() would mutate the Redux state */}
          {history.slice().reverse().map((entry) => (
            <li key={entry.id} className="history__item">
              <span className="history__expression">{entry.expression} =</span>
              <span className="history__result">{entry.result}</span>
            </li>
          ))}
        </ol>
      )}
    </aside>
  )
}
