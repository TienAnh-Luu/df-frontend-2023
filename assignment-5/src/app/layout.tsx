import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MyLayout from './_components/Layout'
import StyledComponentsRegistry from '../lib/AntdRegistry'
import { ThemeProvider } from './_context/ThemeContext'

export const metadata: Metadata = {
  title: 'Bookstore',
  description: 'Bookstore app for FE course',
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ minHeight: '100vh' }}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <MyLayout>{children}</MyLayout>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
