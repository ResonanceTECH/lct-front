import React from 'react'
import styles from './Card.module.css'

export interface CardProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  description?: string
  className?: string
  variant?: 'default' | 'outlined' | 'elevated' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
  clickable?: boolean
  onClick?: () => void
  header?: React.ReactNode
  footer?: React.ReactNode
  actions?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  description,
  className = '',
  variant = 'default',
  size = 'md',
  padding = 'md',
  hover = false,
  clickable = false,
  onClick,
  header,
  footer,
  actions,
}) => {
  const baseClasses = styles.card
  const variantClass = styles[`card--${variant}`]
  const sizeClass = styles[`card--${size}`]
  const paddingClass = styles[`card--padding-${padding}`]
  const hoverClass = hover ? styles.cardHover : ''
  const clickableClass = clickable ? styles.cardClickable : ''
  
  const classes = [
    baseClasses,
    variantClass,
    sizeClass,
    paddingClass,
    hoverClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} onClick={onClick}>
      {(header || title || subtitle || description) && (
        <div className={styles.cardHeader}>
          {header || (
            <>
              {title && <h3 className={styles.cardTitle}>{title}</h3>}
              {subtitle && <h4 className={styles.cardSubtitle}>{subtitle}</h4>}
              {description && <p className={styles.cardDescription}>{description}</p>}
            </>
          )}
        </div>
      )}
      
      <div className={styles.cardBody}>
        {children}
      </div>
      
      {(footer || actions) && (
        <div className={styles.cardFooter}>
          {footer}
          {actions && <div className={styles.cardActions}>{actions}</div>}
        </div>
      )}
    </div>
  )
}

export default Card
