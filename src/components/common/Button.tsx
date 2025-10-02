import React from 'react'
import './Button.css'

export interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    onClick?: () => void
    type?: 'button' | 'submit' | 'reset'
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    onClick,
    type = 'button',
    className = '',
}) => {
    const baseClasses = 'btn'
    const variantClass = `btn--${variant}`
    const sizeClass = `btn--${size}`
    const disabledClass = disabled ? 'btn--disabled' : ''

    const classes = [baseClasses, variantClass, sizeClass, disabledClass, className]
        .filter(Boolean)
        .join(' ')

    return (
        <button
            type={type}
            className={classes}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
