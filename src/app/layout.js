// components
import Navbar from '@/components/PageComponents/navbar/Navbar'
import Footer from '@/components/PageComponents/footer/Footer'
import { ThemeProvider } from '../context/ThemeContext';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import Scroll from '@/components/UIComponents/PageScroll/Scroll';

// styles
import './globals.css'

// Static metadata
export const metadata = {
  title: 'Jović Miroslav',
  description: 'Jović Miroslav - Frontend Developer. I build fast, stable and responsive web applications and websites. This is my Portfolio WebApp made with NextJS, React, MongoDB, Mongoose and SWR',
  keywords: 'HTML, CSS, SCSS, JavaScript, programming, ReactJS, NextJS, Next, React, MongoDB, Mongoose, SWR, Miroslav Jović, Frontend Developer, Web Development, Portfolio, Blog, Dashboard',
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
  creator: 'Jović Miroslav',
  category: 'technology',
  publisher: 'Jović Miroslav',
  applicationName: 'Jović Miroslav',
  authors: [{ name: 'Jović Miroslav' }],
  twitter: {
    title: 'Jović Miroslav',
    description: 'Jović Miroslav - Frontend Developer. I build fast, stable and responsive web applications and websites. This is my Portfolio WebApp made with NextJS, React, MongoDB, Mongoose and SWR',
    creator: 'Jović Miroslav',
  },
  openGraph: {
    images: '/logoMJ.png',
    title: 'Jović Miroslav',
    description: 'Jović Miroslav - Frontend Developer. I build fast, stable and responsive web applications and websites. This is my Portfolio WebApp made with NextJS, React, MongoDB, Mongoose and SWR',
    siteName: 'Jović Miroslav',
    type: 'website',
    authors: ['Jović Miroslav'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Scroll />
      <body>
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
