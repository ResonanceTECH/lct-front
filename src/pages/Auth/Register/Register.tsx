import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import styles from './Register.module.css'

interface RegisterProps {
    onBackToLogin?: () => void
}

const Register: React.FC<RegisterProps> = ({ onBackToLogin }) => {
    const { register, isLoading, error, clearError } = useAuth()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 0 as number, // 0 = CUSTOMER
        company: '',
        inn: '',
        ceo: '',
        address: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        clearError()

        // Validate firstName (2-24 chars)
        if (formData.firstName.length < 2 || formData.firstName.length > 24) {
            alert('Имя должно содержать от 2 до 24 символов')
            return
        }

        // Validate lastName (2-24 chars)
        if (formData.lastName.length < 2 || formData.lastName.length > 24) {
            alert('Фамилия должна содержать от 2 до 24 символов')
            return
        }

        // Validate phone format (+79XXXXXXXXX)
        const phoneRegex = /^\+79\d{9}$/
        if (!phoneRegex.test(formData.phone)) {
            alert('Телефон должен быть в формате +79XXXXXXXXX')
            return
        }

        // Validate password (6-24 chars, includes uppercase, lowercase, digit, special char)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={};:'",.<>/?\\|~]).{6,24}$/
        if (!passwordRegex.test(formData.password)) {
            alert('Пароль должен содержать 6-24 символа, включая заглавную букву, строчную букву, цифру и специальный символ')
            return
        }

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            alert('Пароли не совпадают')
            return
        }

        try {
            // Prepare data for API (only required fields)
            const registerData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                password: formData.password,
                role: formData.role,
            }
            await register(registerData)
            console.log('Registration successful')
        } catch (error) {
            console.error('Registration failed:', error)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === 'role' ? parseInt(value) : value,
        }))
    }

    const handleBackToLogin = () => {
        if (onBackToLogin) {
            onBackToLogin()
        }
    }

    return (
        <div className={styles.registerPage}>
            <div className={styles.registerContainer}>
                <h1 className={styles.title}>
                    Регистрация
                </h1>

                <form className={styles.registerForm} onSubmit={handleSubmit}>
                    {/* Error Message */}
                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    {/* First Name */}
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="firstName"
                            className={styles.inputField}
                            placeholder="Имя"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            minLength={2}
                            maxLength={24}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {/* Last Name */}
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="lastName"
                            className={styles.inputField}
                            placeholder="Фамилия"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            minLength={2}
                            maxLength={24}
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {/* Phone */}
                    <div className={styles.inputGroup}>
                        <input
                            type="tel"
                            name="phone"
                            className={styles.inputPhone}
                            placeholder="+7 (___) ___-__-__"
                            value={formData.phone}
                            onChange={handleInputChange}
                            pattern="^\+79\d{9}$"
                            title="Формат: +79XXXXXXXXX"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    {/* Password */}
                    <div className={styles.inputGroup}>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                className={styles.inputPassword}
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleInputChange}
                                minLength={6}
                                maxLength={24}
                                title="6-24 символа: заглавная буква, строчная буква, цифра, спецсимвол"
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

                    {/* Confirm Password */}
                    <div className={styles.inputGroup}>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                className={styles.inputPassword}
                                placeholder="Повторить пароль"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                aria-label={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
                            >
                                {showConfirmPassword ? (
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

                    {/* Role Select */}
                    <div className={styles.inputGroup}>
                        <select
                            name="role"
                            className={styles.roleSelect}
                            value={formData.role}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        >
                            <option value={0}>Заказчик</option>
                            <option value={1}>Прораб</option>
                            <option value={2}>Инспектор контрольного органа</option>
                        </select>
                    </div>

                    {/* Company Name */}
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="company"
                            className={styles.inputField}
                            placeholder="Ваша компания"
                            value={formData.company}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    {/* INN */}
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="inn"
                            className={styles.inputField}
                            placeholder="ИНН"
                            value={formData.inn}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    {/* CEO */}
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="ceo"
                            className={styles.inputField}
                            placeholder="Руководитель"
                            value={formData.ceo}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Address */}
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="address"
                            className={styles.inputField}
                            placeholder="Адрес"
                            value={formData.address}
                            onChange={handleInputChange}
                            disabled={isLoading}
                        />
                    </div>

                    {/* Register Button */}
                    <button type="submit" className={styles.registerButton} disabled={isLoading}>
                        {isLoading ? 'Регистрация...' : 'Создать учетную запись'}
                    </button>

                    {/* Back to Login */}
                    <div className={styles.backWrapper}>
                        <span className={styles.backText}>Уже есть аккаунт?</span>
                        <button
                            type="button"
                            className={styles.backButton}
                            onClick={handleBackToLogin}
                        >
                            Войти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
