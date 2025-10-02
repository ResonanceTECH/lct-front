import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import styles from './Login.module.css'
import GosulugiIcon from '@/assets/icons/gosuslugi.svg'

const Login: React.FC = () => {
    const { login, isLoading, error, clearError } = useAuth()
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [gosuslugiText, setGosuslugiText] = useState('Войти через Госуслуги')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        clearError()

        try {
            await login({ phone, password })
            console.log('Login successful')
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    const handleGosuslugiLogin = () => {
        setGosuslugiText('Функционал в разработке')
        setTimeout(() => {
            setGosuslugiText('Войти через Госуслуги')
        }, 2000)
    }

    const handleGosuslugiHover = () => {
        setGosuslugiText('Функционал в разработке')
    }

    const handleGosuslugiLeave = () => {
        setGosuslugiText('Войти через Госуслуги')
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.leftPanel}>
                <div className={styles.screensaver}>
                    {/* Background image will be set via CSS */}
                </div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.loginContainer}>
                    <h1 className={styles.title}>
                        Добро пожаловать в систему строительного контроля
                    </h1>

                    <form className={styles.loginForm} onSubmit={handleLogin}>
                        {/* Error Message */}
                        {error && (
                            <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                                {error}
                            </div>
                        )}

                        {/* Phone Input */}
                        <div className={styles.inputGroup}>
                            <input
                                type="tel"
                                className={styles.inputPhone}
                                placeholder="+7 (___) ___-__-__"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                disabled={isLoading}
                            />
                        </div>

                        {/* Password Input */}
                        <div className={styles.inputGroup}>
                            <div className={styles.passwordWrapper}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={styles.inputPassword}
                                    placeholder="Введите пароль"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                            <path d="M1 10s3-6 9-6 9 6 9 6-3 6-9 6-9-6-9-6z" />
                                            <circle cx="10" cy="10" r="3" />
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                                            <path d="M14.12 14.12A9.5 9.5 0 0 1 10 16c-6 0-9-6-9-6a14.5 14.5 0 0 1 3.88-4.12m6.24-.88A9.5 9.5 0 0 1 10 4c6 0 9 6 9 6a14.5 14.5 0 0 1-1.12 1.88M1 1l18 18" />
                                            <circle cx="10" cy="10" r="3" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className={styles.forgotPasswordWrapper}>
                            <button
                                type="button"
                                className={styles.forgotPassword}
                                onClick={() => console.log('Navigate to forgot password')}
                            >
                                Забыли пароль?
                            </button>
                        </div>

                        {/* Login Button */}
                        <button type="submit" className={styles.loginButton} disabled={isLoading}>
                            {isLoading ? 'Вход...' : 'Войти'}
                        </button>

                        {/* Gosuslugi Button */}
                        <button
                            type="button"
                            className={styles.gosulugiButton}
                            onClick={handleGosuslugiLogin}
                            onMouseEnter={handleGosuslugiHover}
                            onMouseLeave={handleGosuslugiLeave}
                        >
                            <img src={GosulugiIcon} alt="Госуслуги" className={styles.gosulugiIcon} />
                            {gosuslugiText}
                        </button>

                        {/* Register Link */}
                        <div className={styles.registerWrapper}>
                            <span className={styles.registerText}>Новый пользователь?</span>{' '}
                            <button
                                type="button"
                                className={styles.registerLink}
                                onClick={() => console.log('Navigate to register')}
                            >
                                Создать учетную запись
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
