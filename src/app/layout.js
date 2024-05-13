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
  title: 'Miroslav Jović | Frontend Developer',
  description: 'Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
  keywords: 'HTML, CSS, SCSS, Sass, JavaScript, programming, ReactJS, NextJS, Next.js, React, Vue.js, MongoDB, Mongoose, SWR, Miroslav Jovic, Miroslav Jović, Frontend Developer, Web Development, Portfolio, Blog, Dashboard, Frontend Design, User Interface (UI), User Experience (UX), Responsive Design, Web Applications, Single Page Applications (SPA), Component-Based Development, Version Control (Git), API Integration, Progressive Web Apps (PWA), Performance Optimization, Frontend Frameworks, Frontend Libraries, Frontend Tools, Web Development Tools, Cross-Browser Compatibility, Mobile-First Development, Accessibility (A11y), SEO Optimization, Performance Monitoring, Debugging Techniques, Code Refactoring, Agile Development, Scrum Methodology, Git, GitHub, TailwindCSS, ViteJS, ThreeJS, Framer Motion, React Icons, ReactStrap, MaterialUI, Styled-components, Bootstrap, TypeScript, Firebase, Hygraph (GraphQL), Bcryptjs, Postman, Strapi, NextAuth, Figma, Photoshop, Premiere pro, Modern JavaScript Frameworks, UI/UX Design Principles, CSS Frameworks, CSS Preprocessors, Frontend Build Tools, Frontend Testing, Browser Developer Tools, Responsive Web Design, Animation Effects, Code Optimization Techniques, Web Performance Metrics, Continuous Integration (CI), Deployment Strategies, Frontend Architecture, State Management,  Functional Programming in JavaScript, Asynchronous JavaScript (Promises, Async/Await), Frontend Security Best Practices, Web Accessibility Standards, Browser Compatibility Testing, Frontend Performance Optimization Techniques, Code Versioning, WebSockets, Server-Side Rendering (SSR), Static Site Generation (SSG), Progressive Enhancement, Internationalization (i18n) and Localization',
  icons: {
    icon: [{ url: '/small logo Miroslav Jovic Frontend Developer 48.png', type: 'image/png' }],
    shortcut: {
      url: '/small logo Miroslav Jovic Frontend Developer 48.png',
      type: "image/png"
    },
    apple: {
      url: '/small logo Miroslav Jovic Frontend Developer 48.png',
      type: "image/png"
    },
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/small logo Miroslav Jovic Frontend Developer 48.png',
      type: "image/png"
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
  creator: 'Miroslav Jović',
  category: 'technology',
  publisher: 'Miroslav Jović',
  applicationName: 'Miroslav Jović',
  authors: [{ name: 'Miroslav Jović' }],
  twitter: {
    title: 'Miroslav Jović | Frontend Developer',
    description: 'Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
    creator: 'Miroslav Jović',
  },
  openGraph: {
    images: '/small logo Miroslav Jovic Frontend Developer 48.png',
    title: 'Miroslav Jović | Frontend Developer',
    description: 'Explore my portfolio showcasing quick, stable, and responsive online applications and websites crafted with Next.js, React, MongoDB, Mongoose, and SWR. As a frontend developer, I bring digital dreams to life with cutting-edge technologies, ensuring seamless user experiences. Dive into my work and discover the power of innovative frontend development',
    siteName: 'Miroslav Jović',
    type: 'website',
    authors: ['Miroslav Jović'],
  },
  verification: { google: "dU9xoqyY9hyBJGtActa9QThi1QrPIPBvmvtgrzyP8l4" },
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
