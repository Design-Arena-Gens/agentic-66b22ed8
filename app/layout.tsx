import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Professional Dashboard',
  description: 'A pixel-perfect, responsive frontend application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-bg-light text-text-primary antialiased">{children}</body>
    </html>
  )
}
