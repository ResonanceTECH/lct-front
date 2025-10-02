import React, { useState } from 'react'
import styles from './DashboardLayout.module.css'
import Header from '../Header'
import Sidebar, { SidebarItem } from '../Sidebar'

export interface DashboardLayoutProps {
  children: React.ReactNode
  user?: {
    name: string
    email: string
    avatar?: string
    role: string
  }
  sidebarItems?: SidebarItem[]
  onLogout?: () => void
  onProfileClick?: () => void
  onNotificationsClick?: () => void
  notificationCount?: number
  className?: string
  showSidebar?: boolean
  showHeader?: boolean
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  user,
  sidebarItems = [],
  onLogout,
  onProfileClick,
  onNotificationsClick,
  notificationCount = 0,
  className = '',
  showSidebar = true,
  showHeader = true,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSidebarItemClick = (item: SidebarItem) => {
    // Handle navigation logic here
    if (item.href) {
      // Use router navigation
      console.log('Navigate to:', item.href)
    }
    
    // Close mobile menu on item click
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`${styles.dashboardLayout} ${className}`}>
      {/* Sidebar */}
      {showSidebar && (
        <>
          <Sidebar
            items={sidebarItems}
            isCollapsed={isSidebarCollapsed}
            onToggle={handleSidebarToggle}
            onItemClick={handleSidebarItemClick}
            user={user}
            className={isMobileMenuOpen ? styles.sidebarOpen : ''}
          />
          
          {/* Mobile overlay */}
          {isMobileMenuOpen && (
            <div
              className={styles.mobileOverlay}
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}
        </>
      )}

      {/* Main content area */}
      <div className={`${styles.mainContent} ${showSidebar ? styles.mainContentWithSidebar : ''}`}>
        {/* Header */}
        {showHeader && (
          <Header
            user={user}
            onLogout={onLogout}
            onProfileClick={onProfileClick}
            onNotificationsClick={onNotificationsClick}
            notificationCount={notificationCount}
          />
        )}

        {/* Page content */}
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>

      {/* Mobile menu button */}
      {showSidebar && (
        <button
          className={styles.mobileMenuButton}
          onClick={handleMobileMenuToggle}
          aria-label="Открыть меню"
        >
          <svg
            className={styles.mobileMenuIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default DashboardLayout
