import { useState } from 'react'
import { useAuth } from '@/hooks'
import Login from '@/pages/Auth/Login'
import Register from '@/pages/Auth/Register'
import Projects from '@/pages/Projects'
import ProjectDetail from '@/pages/ProjectDetail'
import './styles/variables.css'

function App() {
  const { isAuthenticated } = useAuth()
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login')
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  if (!isAuthenticated) {
    if (currentPage === 'register') {
      return <Register onBackToLogin={() => setCurrentPage('login')} />
    }
    return <Login onNavigateToRegister={() => setCurrentPage('register')} />
  }

  if (selectedProjectId) {
    return (
      <ProjectDetail 
        projectId={selectedProjectId} 
        onBack={() => setSelectedProjectId(null)} 
      />
    )
  }

  return <Projects onProjectClick={(id) => setSelectedProjectId(id)} />
}

export default App
