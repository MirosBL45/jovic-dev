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
  description: 'Jović Miroslav - Frontend Developer. I build fast, stable and responsive web applications and websites. My role is to leverage sophisticated Frontend development skills to help digital visions become a reality. Focusing on React & Next.js, I use state-of-the-art technologies to breathe life into web projects. This is my Portfolio WebApp made with Next.js, React, MongoDB, Mongoose and SWR',
  keywords: 'HTML, CSS, SCSS, Sass, JavaScript, programming, ReactJS, NextJS, Next.js, React, Vue.js, MongoDB, Mongoose, SWR, Miroslav Jovic, Frontend Developer, Web Development, Portfolio, Blog, Dashboard',
  icons: {
    icon: [{ url: '/small logo Miroslav Jovic Frontend Developer.png' }],
    shortcut: '/small logo Miroslav Jovic Frontend Developer.png',
    apple: '/small logo Miroslav Jovic Frontend Developer.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/small logo Miroslav Jovic Frontend Developer.png',
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
    description: 'Jović Miroslav - Frontend Developer. I build fast, stable and responsive web applications and websites. My role is to leverage sophisticated Frontend development skills to help digital visions become a reality. Focusing on React & Next.js, I use state-of-the-art technologies to breathe life into web projects. This is my Portfolio WebApp made with Next.js, React, MongoDB, Mongoose and SWR',
    creator: 'Jović Miroslav',
  },
  openGraph: {
    images: '/small logo Miroslav Jovic Frontend Developer.png',
    title: 'Jović Miroslav',
    description: 'Jović Miroslav - Frontend Developer. I build fast, stable and responsive web applications and websites. My role is to leverage sophisticated Frontend development skills to help digital visions become a reality. Focusing on React & Next.js, I use state-of-the-art technologies to breathe life into web projects. This is my Portfolio WebApp made with Next.js, React, MongoDB, Mongoose and SWR',
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
