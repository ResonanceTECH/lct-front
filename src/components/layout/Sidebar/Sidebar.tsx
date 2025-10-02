import React from 'react'
import styles from './Sidebar.module.css'

export interface SidebarItem {
  id: string
  label: string
  icon: React.ReactNode
  href?: string
  onClick?: () => void
  badge?: string | number
  children?: SidebarItem[]
  isActive?: boolean
  disabled?: boolean
}

export interface SidebarProps {
  items: SidebarItem[]
  isCollapsed?: boolean
  onToggle?: () => void
  onItemClick?: (item: SidebarItem) => void
  className?: string
  user?: {
    name: string
    role: string
    avatar?: string
  }
}

const Sidebar: React.FC<SidebarProps> = ({
  items,
  isCollapsed = false,
  onToggle,
  onItemClick,
  className = '',
  user,
}) => {
  const handleItemClick = (item: SidebarItem) => {
    if (item.disabled) return
    
    if (item.onClick) {
      item.onClick()
    } else if (onItemClick) {
      onItemClick(item)
    }
  }

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const isActive = item.isActive || false

    return (
      <div key={item.id} className={styles.sidebarItemContainer}>
        <button
          className={[
            styles.sidebarItem,
            styles[`sidebarItem--level-${level}`],
            isActive ? styles.sidebarItemActive : '',
            item.disabled ? styles.sidebarItemDisabled : '',
            hasChildren ? styles.sidebarItemWithChildren : ''
          ].filter(Boolean).join(' ')}
          onClick={() => handleItemClick(item)}
          disabled={item.disabled}
        >
          <div className={styles.sidebarItemContent}>
            <div className={styles.sidebarItemIcon}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <>
                <span className={styles.sidebarItemLabel}>
                  {item.label}
                </span>
                {item.badge && (
                  <span className={styles.sidebarItemBadge}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </div>
          {hasChildren && !isCollapsed && (
            <svg
              className={styles.chevronIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
        </button>
        
        {hasChildren && !isCollapsed && (
          <div className={styles.sidebarSubItems}>
            {item.children!.map((child) => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.sidebarCollapsed : ''} ${className}`}>
      {/* Header */}
      <div className={styles.sidebarHeader}>
        {!isCollapsed && (
          <div className={styles.sidebarLogo}>
            <h2 className={styles.logoText}>LCT Build</h2>
          </div>
        )}
        {onToggle && (
          <button
            className={styles.sidebarToggle}
            onClick={onToggle}
            aria-label={isCollapsed ? 'Развернуть меню' : 'Свернуть меню'}
          >
            <svg
              className={styles.toggleIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        )}
      </div>

      {/* User Info */}
      {user && !isCollapsed && (
        <div className={styles.sidebarUser}>
          <div className={styles.userAvatar}>
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} />
            ) : (
              <span>{user.name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{user.name}</div>
            <div className={styles.userRole}>{user.role}</div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <nav className={styles.sidebarNav}>
        {items.map((item) => renderSidebarItem(item))}
      </nav>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        {!isCollapsed && (
          <div className={styles.sidebarFooterContent}>
            <div className={styles.footerText}>
              Версия 1.0.0
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
