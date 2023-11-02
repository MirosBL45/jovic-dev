// components
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'

// styles
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Jovic-dev',
  description: 'Jovic Miroslav Portfolio WebApp in NextJS',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
