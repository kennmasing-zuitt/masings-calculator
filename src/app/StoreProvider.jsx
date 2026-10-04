'use client'

import { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store'
import { loadState, saveState } from '@/lib/localStorage'
import { stateRestored } from '@/lib/features/calculator/pbbBbkCalculatorSlice'

export default function StoreProvider({ children }) {
  // Create the store only once per browser tab, not on every render.
  // Passing the function (no parentheses!) tells React to call it just once.
  const [store] = useState(makeStore)

  // console.log(
  //   '%cSTATE',
  //   'background:orange; color:white; padding:5px; border-radius:5px;',
  //   store.getState(),
  // );
  // console.log(
  //   '%cSTATE XXX',
  //   'background:orange; color:white; padding:5px; border-radius:5px;',
  //   store,
  // );

  // useEffect only runs in the browser, after the page has loaded,
  // so it is safe to touch localStorage here
  useEffect(() => {
    // 1. Load what we saved last time (if anything)
    const saved = loadState()
    if (saved?.calculator) {
      store.dispatch(stateRestored(saved.calculator))
    }

    // 2. From now on, save after every change
    const unsubscribe = store.subscribe(() => {
      saveState({ calculator: store.getState().pbbBbkCalculator })
    })
    return unsubscribe
  }, [store])

  return <Provider store={store}>{children}</Provider>
}
