import React from 'react'
import './Input.css'

export interface InputProps {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
    placeholder?: string
    value?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    disabled?: boolean
    required?: boolean
    error?: string
    label?: string
    className?: string
    id?: string
    name?: string
}

const Input: React.FC<InputProps> = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    onFocus,
    disabled = false,
    required = false,
    error,
    label,
    className = '',
    id,
    name,
}) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

    const inputClasses = [
        'input',
        error ? 'input--error' : '',
        disabled ? 'input--disabled' : '',
        className
    ].filter(Boolean).join(' ')

    return (
        <div className="input-wrapper">
            {label && (
                <label htmlFor={inputId} className="input-label">
                    {label}
                    {required && <span className="input-required">*</span>}
                </label>
            )}
            <input
                id={inputId}
                name={name}
                type={type}
                className={inputClasses}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onFocus={onFocus}
                disabled={disabled}
                required={required}
                aria-invalid={error ? 'true' : 'false'}
                aria-describedby={error ? `${inputId}-error` : undefined}
            />
            {error && (
                <div id={`${inputId}-error`} className="input-error">
                    {error}
                </div>
            )}
        </div>
    )
}

export default Input
