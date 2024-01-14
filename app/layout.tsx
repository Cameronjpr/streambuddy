import type { Metadata } from 'next'
import { Atkinson_Hyperlegible } from 'next/font/google'
import './globals.css'
import { ReactNode } from 'react'

const atkinson = Atkinson_Hyperlegible({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'Streambuddy',
  description: 'Live threads, but later',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={atkinson.className}>
        <header className="p-2 text-center">
          <h1 className="text-cyan-500">Streambuddy</h1>
          <span className="text-cyan-700">Live threads, but later</span>
        </header>
        {children}
      </body>
    </html>
  )
}
