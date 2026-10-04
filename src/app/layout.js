import StoreProvider from './StoreProvider'
import './globals.css'

export const metadata = {
  title: 'Redux Calculator',
  description: 'A calculator that remembers, built with Next.js and Redux Toolkit',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
