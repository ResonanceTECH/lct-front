import React from 'react'
import styles from './Header.module.css'
import Button from '@/components/ui/Button'

export interface HeaderProps {
  user?: {
    name: string
    email: string
    avatar?: string
    role: string
  }
  onLogout?: () => void
  onProfileClick?: () => void
  onNotificationsClick?: () => void
  notificationCount?: number
  className?: string
}

const Header: React.FC<HeaderProps> = ({
  user,
  onLogout,
  onProfileClick,
  onNotificationsClick,
  notificationCount = 0,
  className = '',
}) => {
  return (
    <header className={`${styles.header} ${className}`}>
      <div className={styles.headerContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <h1 className={styles.logoText}>LCT Build</h1>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <a href="/dashboard" className={styles.navLink}>
            Дашборд
          </a>
          <a href="/objects" className={styles.navLink}>
            Объекты
          </a>
          <a href="/materials" className={styles.navLink}>
            Материалы
          </a>
          <a href="/reports" className={styles.navLink}>
            Отчеты
          </a>
        </nav>

        {/* User Actions */}
        <div className={styles.userActions}>
          {/* Notifications */}
          <button
            className={styles.notificationButton}
            onClick={onNotificationsClick}
            aria-label="Уведомления"
          >
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {notificationCount > 0 && (
              <span className={styles.notificationBadge}>
                {notificationCount > 99 ? '99+' : notificationCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          {user ? (
            <div className={styles.userMenu}>
              <button
                className={styles.userButton}
                onClick={onProfileClick}
                aria-label="Профиль пользователя"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className={styles.userAvatar}
                  />
                ) : (
                  <div className={styles.userAvatarPlaceholder}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className={styles.userInfo}>
                  <span className={styles.userName}>{user.name}</span>
                  <span className={styles.userRole}>{user.role}</span>
                </div>
                <svg className={styles.chevronIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              
              {/* Dropdown Menu */}
              <div className={styles.dropdown}>
                <button
                  className={styles.dropdownItem}
                  onClick={onProfileClick}
                >
                  Профиль
                </button>
                <button
                  className={styles.dropdownItem}
                  onClick={onLogout}
                >
                  Выйти
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.authButtons}>
              <Button variant="outline" size="sm">
                Войти
              </Button>
              <Button variant="primary" size="sm">
                Регистрация
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
