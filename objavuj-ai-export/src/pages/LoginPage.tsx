import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useAuthStore } from '@/stores/authStore'
import { useTranslation } from '@/hooks/useTranslation'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const { t } = useTranslation()
  
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    setError('')
    
    // Use mock login for demo
    const success = await login('demo@objavuj.ai', 'demo123')
    setIsLoading(false)
    
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Login failed. Please try again.')
    }
  }

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    const success = await login(email, password)
    setIsLoading(false)
    
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background flex flex-col transition-colors duration-300">
      {/* Back Link */}
      <div className="p-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">{t('player.backToCourse').replace('kurz', 'home')}</span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-community rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-text-primary dark:text-dark-text-primary">
                OBJAVUJ<span className="text-primary">-AI</span>
              </span>
            </Link>
          </div>

          {/* Login Card */}
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-text-primary dark:text-dark-text-primary mb-2">
                Welcome Back
              </h1>
              <p className="text-text-secondary dark:text-dark-text-secondary">
                Sign in to your account to continue learning
              </p>
            </div>

            {/* Google Sign In */}
            <Button
              variant="outline"
              className="w-full mb-6 gap-3 py-3"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border dark:border-dark-border" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white dark:bg-dark-card text-sm text-text-secondary dark:text-dark-text-secondary">
                  or
                </span>
              </div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1.5"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-dark-text-secondary" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-muted dark:bg-dark-muted rounded-xl text-text-primary dark:text-dark-text-primary
                             placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text-primary dark:text-dark-text-primary mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary dark:text-dark-text-secondary" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    className="w-full pl-10 pr-12 py-2.5 bg-muted dark:bg-dark-muted rounded-xl text-text-primary dark:text-dark-text-primary
                             placeholder:text-text-secondary dark:placeholder:text-dark-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-border dark:border-dark-border text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-primary hover:text-primary-hover"
                >
                  Forgot password?
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
              >
                {t('nav.login')}
              </Button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-text-secondary dark:text-dark-text-secondary mt-6">
              Don't have an account?{' '}
              <a href="#" className="text-primary hover:text-primary-hover font-medium">
                Sign up
              </a>
            </p>
          </Card>

          {/* Footer Note */}
          <p className="text-center text-xs text-text-secondary dark:text-dark-text-secondary mt-6">
            By signing in, you agree to our{' '}
            <a href="#" className="text-primary hover:underline">
              {t('footer.terms')}
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary hover:underline">
              {t('footer.privacy')}
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
