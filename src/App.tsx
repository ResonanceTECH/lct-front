import React from 'react'
import { useAuth } from '@/hooks'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Landing from '@/pages/Landing'
import LoginForm from '@/components/features/auth/LoginForm'
import { SidebarItem } from '@/components/layout/Sidebar'
import './styles/variables.css'

function App() {
  const { isAuthenticated, user, login, logout } = useAuth()

  // Sidebar navigation items
  const sidebarItems: SidebarItem[] = [
    {
      id: 'dashboard',
      label: 'Дашборд',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      href: '/dashboard',
      isActive: true,
    },
    {
      id: 'objects',
      label: 'Объекты',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9,22 9,12 15,12 15,22" />
        </svg>
      ),
      href: '/objects',
    },
    {
      id: 'materials',
      label: 'Материалы',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      href: '/materials',
    },
    {
      id: 'violations',
      label: 'Нарушения',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      href: '/violations',
      badge: 3,
    },
    {
      id: 'reports',
      label: 'Отчеты',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
      ),
      href: '/reports',
    },
  ]

  const handleLogin = async (credentials: any) => {
    try {
      await login(credentials)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '2rem'
      }}>
        <LoginForm onSubmit={handleLogin} />
      </div>
    )
  }

  return (
    <DashboardLayout
      user={user}
      sidebarItems={sidebarItems}
      onLogout={handleLogout}
      onProfileClick={() => console.log('Profile clicked')}
      onNotificationsClick={() => console.log('Notifications clicked')}
      notificationCount={5}
    >
      <div style={{ padding: '2rem' }}>
        <h1 style={{ marginBottom: '2rem', color: '#111827' }}>
          Добро пожаловать в LCT Build!
        </h1>
        <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
          Система управления строительными объектами готова к работе.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Объекты</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
              Управляйте строительными объектами и отслеживайте прогресс
            </p>
            <button style={{
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              Перейти к объектам
            </button>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Материалы</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
              Контролируйте поставки и расход материалов
            </p>
            <button style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              Управление материалами
            </button>
          </div>

          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#111827' }}>Отчеты</h3>
            <p style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
              Получайте детальную аналитику по проектам
            </p>
            <button style={{
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              cursor: 'pointer'
            }}>
              Создать отчет
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default App
