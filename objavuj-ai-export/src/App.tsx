import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useThemeStore } from './stores/themeStore'
import { useAuthStore } from './stores/authStore'
import { ProtectedRoute } from './components/auth/ProtectedRoute'

// Pages
import LandingPage from './pages/LandingPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import CoursePlayerPage from './pages/CoursePlayerPage'
import PodcastPage from './pages/PodcastPage'
import CommunityPage from './pages/CommunityPage'
import PricingPage from './pages/PricingPage'
import PurchasePage from './pages/PurchasePage'
import AboutPage from './pages/AboutPage'
import RewardsPage from './pages/RewardsPage'

function App() {
  const { theme } = useThemeStore()
  const { checkAuth } = useAuthStore()
  
  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
  }, [theme])
  
  // Check authentication on mount (for Supabase mode)
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:slug" element={<CourseDetailPage />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/community" element={<CommunityPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/about" element={<AboutPage />} />
        
        {/* Auth Routes (redirect if already logged in) */}
        <Route 
          path="/login" 
          element={
            <ProtectedRoute requireAuth={false} redirectTo="/dashboard">
              <LoginPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Course Player - Protected */}
        <Route 
          path="/course/:slug/player/:moduleId/:lessonId" 
          element={
            <ProtectedRoute>
              <CoursePlayerPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Auth Callback (for Supabase email confirmation) */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Fallback */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  )
}

// Auth callback component for Supabase email verification
function AuthCallback() {
  const { checkAuth } = useAuthStore()
  
  useEffect(() => {
    // Handle the auth callback
    const handleCallback = async () => {
      await checkAuth()
      // Redirect to dashboard after successful auth
      window.location.href = '/dashboard'
    }
    handleCallback()
  }, [checkAuth])
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-dark-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-text-secondary dark:text-dark-text-secondary">
          Verifying your account...
        </p>
      </div>
    </div>
  )
}

export default App
