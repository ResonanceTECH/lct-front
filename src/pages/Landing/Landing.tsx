import React from 'react'
import styles from './Landing.module.css'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

const Landing: React.FC = () => {
    return (
        <div className={styles.landing}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Управление строительными объектами
                        <span className={styles.heroHighlight}> стало проще</span>
                    </h1>
                    <p className={styles.heroDescription}>
                        LCT Build - современная система для контроля строительных проектов,
                        управления материалами и отслеживания нарушений в режиме реального времени.
                    </p>
                    <div className={styles.heroActions}>
                        <Button variant="primary" size="lg">
                            Начать работу
                        </Button>
                        <Button variant="outline" size="lg">
                            Узнать больше
                        </Button>
                    </div>
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.heroPlaceholder}>
                        <svg viewBox="0 0 400 300" fill="none" stroke="currentColor">
                            <rect x="50" y="50" width="300" height="200" rx="10" fill="#f3f4f6" />
                            <rect x="70" y="70" width="80" height="60" fill="#3b82f6" />
                            <rect x="170" y="70" width="80" height="60" fill="#10b981" />
                            <rect x="270" y="70" width="80" height="60" fill="#f59e0b" />
                            <rect x="70" y="150" width="120" height="80" fill="#ef4444" />
                            <rect x="210" y="150" width="120" height="80" fill="#8b5cf6" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className={styles.features}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>Возможности системы</h2>
                    <div className={styles.featuresGrid}>
                        <Card
                            title="Управление объектами"
                            description="Отслеживайте прогресс строительства, управляйте командой и контролируйте бюджет"
                            variant="elevated"
                        >
                            <div className={styles.featureIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9,22 9,12 15,12 15,22" />
                                </svg>
                            </div>
                        </Card>

                        <Card
                            title="Контроль материалов"
                            description="Ведите учет поставок, отслеживайте расходы и управляйте складскими остатками"
                            variant="elevated"
                        >
                            <div className={styles.featureIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </Card>

                        <Card
                            title="Отчеты и аналитика"
                            description="Получайте детальную аналитику по проектам, затратам и эффективности работы"
                            variant="elevated"
                        >
                            <div className={styles.featureIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M18 20V10M12 20V4M6 20v-6" />
                                </svg>
                            </div>
                        </Card>

                        <Card
                            title="Мобильное приложение"
                            description="Работайте с системой в любом месте через мобильное приложение"
                            variant="elevated"
                        >
                            <div className={styles.featureIcon}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                                    <line x1="12" y1="18" x2="12.01" y2="18" />
                                </svg>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <div className={styles.container}>
                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>Готовы начать?</h2>
                        <p className={styles.ctaDescription}>
                            Присоединяйтесь к сотням компаний, которые уже используют LCT Build
                        </p>
                        <div className={styles.ctaActions}>
                            <Button variant="primary" size="lg">
                                Создать аккаунт
                            </Button>
                            <Button variant="outline" size="lg">
                                Связаться с нами
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Landing
