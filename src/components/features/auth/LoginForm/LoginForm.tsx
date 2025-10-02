import React, { useState } from 'react'
import styles from './LoginForm.module.css'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export interface LoginFormData {
  email: string
  password: string
  rememberMe: boolean
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void
  loading?: boolean
  error?: string
  className?: string
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  loading = false,
  error,
  className = '',
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [errors, setErrors] = useState<Partial<LoginFormData>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {}

    if (!formData.email) {
      newErrors.email = 'Email обязателен'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Некорректный email'
    }

    if (!formData.password) {
      newErrors.password = 'Пароль обязателен'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleInputChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <form className={`${styles.loginForm} ${className}`} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h2 className={styles.title}>Вход в систему</h2>
        <p className={styles.subtitle}>
          Введите свои данные для входа в LCT Build
        </p>
      </div>

      {error && (
        <div className={styles.errorAlert}>
          <svg className={styles.errorIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          {error}
        </div>
      )}

      <div className={styles.formFields}>
        <Input
          label="Email"
          type="email"
          placeholder="Введите ваш email"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={errors.email}
          required
          fullWidth
          startIcon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          }
        />

        <Input
          label="Пароль"
          type="password"
          placeholder="Введите ваш пароль"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={errors.password}
          required
          fullWidth
          startIcon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <circle cx="12" cy="16" r="1" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          }
        />

        <div className={styles.rememberMe}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleInputChange('rememberMe')}
              className={styles.checkbox}
            />
            <span className={styles.checkboxText}>Запомнить меня</span>
          </label>
        </div>
      </div>

      <div className={styles.formActions}>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          fullWidth
        >
          Войти
        </Button>
      </div>

      <div className={styles.formFooter}>
        <a href="/forgot-password" className={styles.forgotLink}>
          Забыли пароль?
        </a>
        <div className={styles.signupLink}>
          Нет аккаунта?{' '}
          <a href="/register" className={styles.signupLinkText}>
            Зарегистрироваться
          </a>
        </div>
      </div>
    </form>
  )
}

export default LoginForm
