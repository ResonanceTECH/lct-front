import React from 'react'
import './Card.css'

export interface CardProps {
    children: React.ReactNode
    title?: string
    description?: string
    className?: string
    variant?: 'default' | 'outlined' | 'elevated'
    size?: 'sm' | 'md' | 'lg'
}

const Card: React.FC<CardProps> = ({
    children,
    title,
    description,
    className = '',
    variant = 'default',
    size = 'md',
}) => {
    const baseClasses = 'card'
    const variantClass = `card--${variant}`
    const sizeClass = `card--${size}`

    const classes = [baseClasses, variantClass, sizeClass, className]
        .filter(Boolean)
        .join(' ')

    return (
        <div className={classes}>
            {(title || description) && (
                <div className="card-header">
                    {title && <h3 className="card-title">{title}</h3>}
                    {description && <p className="card-description">{description}</p>}
                </div>
            )}
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}

export default Card
