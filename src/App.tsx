import { useState } from 'react'
import { useAuth } from '@/hooks'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import Projects from '@/pages/Projects'
import './styles/variables.css'

function App() {
  const { isAuthenticated } = useAuth()
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login')

  if (!isAuthenticated) {
    if (currentPage === 'register') {
      return <Register onBackToLogin={() => setCurrentPage('login')} />
    }
    return <Login onNavigateToRegister={() => setCurrentPage('register')} />
  }

  return <Projects />
}

export default App
