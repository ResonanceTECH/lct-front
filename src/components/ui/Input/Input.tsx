import React, { forwardRef } from 'react'
import styles from './Input.module.css'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  error?: string
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'filled' | 'outlined'
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  required?: boolean
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  size = 'md',
  variant = 'default',
  startIcon,
  endIcon,
  required = false,
  fullWidth = false,
  className = '',
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`
  
  const inputClasses = [
    styles.input,
    styles[`input--${size}`],
    styles[`input--${variant}`],
    error ? styles.inputError : '',
    startIcon ? styles.inputWithStartIcon : '',
    endIcon ? styles.inputWithEndIcon : '',
    fullWidth ? styles.inputFullWidth : '',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={`${styles.inputWrapper} ${fullWidth ? styles.inputWrapperFullWidth : ''}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <div className={styles.inputContainer}>
        {startIcon && (
          <div className={styles.startIcon}>
            {startIcon}
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          {...props}
        />
        {endIcon && (
          <div className={styles.endIcon}>
            {endIcon}
          </div>
        )}
      </div>
      {error && (
        <div id={`${inputId}-error`} className={styles.error}>
          {error}
        </div>
      )}
      {helperText && !error && (
        <div id={`${inputId}-helper`} className={styles.helperText}>
          {helperText}
        </div>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
