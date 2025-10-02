import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import styles from './Register.module.css'

const Register: React.FC = () => {
    const { register, isLoading, error, clearError } = useAuth()
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        role: 0 as number, // 0 = CUSTOMER
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        clearError()

        try {
            await register(formData)
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

    return (
        <div className={styles.registerPage}>
            <div className={styles.container}>
                <h1 className={styles.title}>Регистрация</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    {/* Error Message */}
                    {error && (
                        <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    {/* First Name */}
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Имя"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                    />

                    {/* Last Name */}
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Фамилия"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                    />

                    {/* Phone */}
                    <input
                        type="tel"
                        name="phone"
                        placeholder="+7 (___) ___-__-__"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                    />

                    {/* Password */}
                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                    />

                    {/* Role */}
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        disabled={isLoading}
                    >
                        <option value={0}>Заказчик</option>
                        <option value={1}>Прораб</option>
                        <option value={2}>Инспектор</option>
                        <option value={3}>Администратор</option>
                    </select>

                    <button type="submit" className={styles.submitButton} disabled={isLoading}>
                        {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
                    </button>
                    <button
                        type="button"
                        className={styles.backButton}
                        onClick={() => console.log('Navigate to login')}
                    >
                        Уже есть аккаунт? Войти
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register
