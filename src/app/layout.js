// components
import Navbar from '@/components/PageComponents/navbar/Navbar'
import Footer from '@/components/PageComponents/footer/Footer'
import { ThemeProvider } from '../context/ThemeContext';
import AuthProvider from '@/components/AuthProvider/AuthProvider';

// styles
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] });

// Static metadata
export const metadata = {
  title: 'Jovic-dev',
  description: 'Jovic Miroslav Portfolio WebApp made with NextJS, MongoDB, Mongoose and SWR',
  keywords: 'HTML, CSS, SCSS, JavaScript, programming, ReactJS, NextJS, Next, React, MongoDB, Mongoose, SWR, Miroslav Jovic',
  icons: {
    icon: [{ url: '/logoMJ.png' }],
    shortcut: '/logoMJ.png',
    apple: '/logoMJ.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logoMJ.png',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  creator: 'Jovic Miroslav',
  category: 'technology',
  publisher: 'Jovic Miroslav',
  applicationName: 'Jovic-dev',
  authors: [{ name: 'Jovic Miroslav' }],
  // twitter: {
  //   title: 'Jovic-dev',
  //   description: 'Jovic Miroslav Portfolio WebApp made with NextJS, MongoDB, Mongoose and SWR',
  //   creator: 'Jovic Miroslav',
  // },
  // openGraph: {
  //   images: '/logoMJ.png',
  //   title: 'Jovic-dev',
  //   description: 'Jovic Miroslav Portfolio WebApp made with NextJS, MongoDB, Mongoose and SWR',
  //   siteName: 'Jovic-dev',
  //   type: 'website',
  //   authors: ['Jovic Miroslav'],
  // },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            <div className="container">
              <Navbar />
              {children}
              <Footer />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
