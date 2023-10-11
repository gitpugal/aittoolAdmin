import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'
import { NextAuthProvider } from './providers'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AIToolsNextAdmin',
  description: 'Admin Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
},
) {
  return (
    <html lang="en">
       <NextAuthProvider>
        <body>
        {children}
        <Toaster />
        </body>
       </NextAuthProvider>
    </html>
  )
}


