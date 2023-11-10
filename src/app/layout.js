// components
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { ThemeProvider } from '../context/ThemeContext';
import Meta from '@/components/meta/Meta';

// styles
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Jovic-dev',
//   description: 'Jovic Miroslav Portfolio WebApp made with NextJS, MongoDB, Mongoose and SWR',
//   keywords: 'HTML, CSS,, SCSS, JavaScript, programming, ReactJS, NextJS, Next, React, MongoDB, Mongoose, SWR, Miroslav Jovic',
//   robots: 'index, follow',
// }

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Meta />
      <body className={inter.className}>
        <ThemeProvider>
          <div className="container">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
