import Display from '@/components/PbbBbkDisplay'
import Keypad from '@/components/Keypad'
import History from '@/components/PbbBbkHistory'
import PbbBbkKeypad from '@/components/PbbBbkKeypad'

export default function Home() {
  return (
    <main className="app">
      <section className="calculator" aria-label="Calculator">
        <Display />
        {/* <Keypad /> */}
        <br/>
        <PbbBbkKeypad />
      </section>
      <History />
    </main>
  )
}
