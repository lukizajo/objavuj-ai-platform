import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface MainLayoutProps {
  children: React.ReactNode
  showFooter?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-dark-background transition-colors duration-300">
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  )
}

export default MainLayout
