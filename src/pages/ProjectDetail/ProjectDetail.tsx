import React, { useState } from 'react'
import styles from './ProjectDetail.module.css'
import Logo from '@/assets/icons/logo.svg'
import NotificationIcon from '@/assets/icons/Property 1=off.png'
import ExitIcon from '@/assets/icons/iconamoon_exit.png'
import AvatarIcon from '@/assets/icons/Avatar.svg'
import MenuIcon from '@/assets/icons/material-symbols_menu-rounded.png'
import PdfIcon from '@/assets/icons/proicons_pdf.png'
import Map from '@/components/Map'

interface ProjectDetailProps {
    projectId: string
    onBack: () => void
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId, onBack }) => {
    const [activeTab, setActiveTab] = useState<string>('passport')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [mapCoordinates, setMapCoordinates] = useState<{ longitude: number; latitude: number }>({
        longitude: 37.743,
        latitude: 55.778
    })

    // Mock project data
    const project = {
        id: projectId,
        title: 'Санаторий "Резонанс"',
        category: 'Строительство',
        dateStart: '01.11.2020',
        dateEnd: '01.11.2024',
        status: 'Строительство',
        progress: 86,
        completed: '16.00.30.09.2024',
        address: 'Москва, Вольная улица, 641',
        description: 'Санаторий "Резонанс"',
        documents: [
            { id: 1, name: 'Разрешение на строительство', date: '21.02.2021' },
            { id: 2, name: 'Правоустанавливающий документ', date: '21.02.2021' },
        ],
        participants: [
            { role: 'Заказчик', name: 'Министерство здравоохранения РФ' },
            { role: 'Авторский надзор', name: 'АНО «Центр развития здоровья»' },
            { role: 'Подрядчик', name: 'ООО "РИТШ"' },
        ],
        techSpecs: [
            { label: 'Общая площадь', value: '145' },
            { label: 'Количество этажей', value: '145' },
            { label: 'Объем', value: '150' },
            { label: 'Верхняя отметка', value: '50' },
        ],
        stages: [
            { name: 'Новая работа', status: 'pending', progress: 0, remaining: 137 },
            { name: 'Озеленение', status: 'error', progress: 0, remaining: 137 },
            { name: 'Установка бордюров', status: 'completed', progress: 0, remaining: 137 },
        ],
    }


    const handleLogout = () => {
        console.log('Logout clicked')
    }

    const handleMapMarkerChange = (coords: { longitude: number; latitude: number }) => {
        setMapCoordinates(coords)
        console.log('Новые координаты маркера:', coords)

        // Отправка координат на бэкенд
        sendCoordinatesToBackend(coords)
    }

    const sendCoordinatesToBackend = async (coords: { longitude: number; latitude: number }) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://lct-back.kixylab.ru'}/projects/${projectId}/location`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({
                    longitude: coords.longitude,
                    latitude: coords.latitude
                })
            })

            if (response.ok) {
                console.log('Координаты успешно сохранены на бэкенде')
            } else {
                console.error('Ошибка сохранения координат:', await response.text())
            }
        } catch (error) {
            console.error('Ошибка отправки координат на бэкенд:', error)
        }
    }

    return (
        <div className={styles.projectDetailPage}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <img src={Logo} alt="Logo" className={styles.logo} />
                </div>

                <nav className={styles.headerNav}>
                    <button onClick={onBack} className={styles.navLink}>Проекты</button>
                    <a href="#" className={styles.navLink}>Задачи</a>
                    <a href="#" className={styles.navLink}>Настройки</a>
                </nav>

                <div className={styles.headerRight}>
                    <img src={AvatarIcon} alt="Аватар" className={styles.userAvatar} />
                    <span className={styles.userName}>Морозова Н.А.</span>
                    <button className={styles.iconButton}>
                        <img src={NotificationIcon} alt="Уведомления" />
                    </button>
                    <button className={styles.iconButton} onClick={handleLogout}>
                        <img src={ExitIcon} alt="Выход" />
                    </button>
                </div>

                {/* Mobile Burger Menu Button */}
                <button
                    className={styles.burgerButton}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Меню"
                >
                    <img src={MenuIcon} alt="Меню" />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className={styles.mobileMenuOverlay} onClick={() => setIsMobileMenuOpen(false)}>
                    <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.mobileMenuHeader}>
                            <img src={Logo} alt="Logo" className={styles.logo} />
                            <button
                                className={styles.closeButton}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className={styles.mobileMenuUser}>
                            <img src={AvatarIcon} alt="Аватар" className={styles.userAvatar} />
                            <span className={styles.userName}>Морозова Н.А.</span>
                        </div>

                        <nav className={styles.mobileMenuNav}>
                            <button
                                onClick={() => {
                                    onBack()
                                    setIsMobileMenuOpen(false)
                                }}
                                className={styles.mobileNavLink}
                            >
                                Проекты
                            </button>
                            <a
                                href="#"
                                className={styles.mobileNavLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Задачи
                            </a>
                            <a
                                href="#"
                                className={styles.mobileNavLink}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Настройки
                            </a>
                        </nav>

                        <div className={styles.mobileMenuActions}>
                            <button className={styles.mobileActionButton}>
                                <img src={NotificationIcon} alt="Уведомления" />
                                <span>Уведомления</span>
                            </button>
                            <button
                                className={styles.mobileActionButton}
                                onClick={() => {
                                    handleLogout()
                                    setIsMobileMenuOpen(false)
                                }}
                            >
                                <img src={ExitIcon} alt="Выход" />
                                <span>Выход</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
                <button onClick={onBack} className={styles.breadcrumbLink}>Проекты</button>
                <span className={styles.breadcrumbSeparator}>{'>'}</span>
                <span className={styles.breadcrumbCurrent}>{project.title}</span>
            </div>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Project Header */}
                <div className={styles.projectHeader}>
                    <h1 className={styles.projectTitle}>{project.title}</h1>
                    <div className={styles.statusBadge}>{project.status}</div>
                </div>

                <div className={styles.progressSection}>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: `${project.progress}%` }}></div>
                    </div>
                    <div className={styles.progressInfo}>
                        <span className={styles.progressLabel}>Процент готовности</span>
                        <span className={styles.progressValue}>{project.progress}%</span>
                        <span className={styles.progressLabel}>Обновлено:</span>
                        <span className={styles.progressValue}>{project.completed}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === 'passport' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('passport')}
                    >
                        Паспорт проекта
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'participants' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('participants')}
                    >
                        Участники
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'docs' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('docs')}
                    >
                        Проектная документация
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'itd' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('itd')}
                    >
                        ИТД
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'stages' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('stages')}
                    >
                        Этапы проекта
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === 'permits' ? styles.tabActive : ''}`}
                        onClick={() => setActiveTab('permits')}
                    >
                        Разрешительные документы
                    </button>
                </div>

                {/* Content Grid */}
                <div className={styles.contentGrid}>
                    {/* Left Column - Description */}
                    <div className={styles.descriptionSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Описание</h2>
                            <img src={MenuIcon} alt="Меню" className={styles.menuIcon} />
                        </div>
                        <div className={styles.projectImage}>
                            <img src="/src/assets/icons/garden_project.png" alt={project.title} />
                        </div>
                        <div className={styles.projectInfo}>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Наименование объекта</span>
                                <span className={styles.infoValue}>{project.description}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Сроки</span>
                                <span className={styles.infoValue}>
                                    {project.dateStart} → {project.dateEnd}
                                </span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Город</span>
                                <span className={styles.infoValue}>Москва</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Назначение</span>
                                <span className={styles.infoValue}>Медицина</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Статус</span>
                                <span className={styles.infoValue}>{project.status}</span>
                            </div>
                            <div className={styles.infoRow}>
                                <span className={styles.infoLabel}>Руководитель</span>
                                <span className={styles.infoValue}>Смирнов Анатолий</span>
                            </div>
                        </div>
                    </div>

                    {/* Middle Column - Tech Specs */}
                    <div className={styles.techSpecsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Технико-экономические показатели</h2>
                            <img src={MenuIcon} alt="Меню" className={styles.menuIcon} />
                        </div>
                        <div className={styles.specsGrid}>
                            {project.techSpecs.map((spec, index) => (
                                <div key={index} className={styles.specCard}>
                                    <div className={styles.specLabel}>{spec.label}</div>
                                    <div className={styles.specValue}>{spec.value}</div>
                                </div>
                            ))}
                        </div>
                        <button className={styles.showAllButton}>Показать всё</button>
                    </div>

                    {/* Right Column - Participants */}
                    <div className={styles.participantsSection}>
                        <div className={styles.sectionHeader}>
                            <h2 className={styles.sectionTitle}>Участники</h2>
                            <img src={MenuIcon} alt="Меню" className={styles.menuIcon} />
                        </div>
                        {project.participants.map((participant, index) => (
                            <div key={index} className={styles.participantCard}>
                                <div className={styles.participantAvatar}></div>
                                <div className={styles.participantInfo}>
                                    <div className={styles.participantRole}>{participant.role}</div>
                                    <div className={styles.participantName}>{participant.name}</div>
                                </div>
                            </div>
                        ))}
                        <button className={styles.showAllButton}>Показать всех</button>
                    </div>
                </div>

                {/* Documents Section */}
                <div className={styles.documentsSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Разрешительная документация</h2>
                        <img src={MenuIcon} alt="Меню" className={styles.menuIcon} />
                    </div>
                    <div className={styles.documentsGrid}>
                        {project.documents.map((doc) => (
                            <div key={doc.id} className={styles.documentCard}>
                                <img src={PdfIcon} alt="PDF" className={styles.pdfIcon} />
                                <div className={styles.documentInfo}>
                                    <div className={styles.documentName}>{doc.name}</div>
                                    <div className={styles.documentDate}>
                                        Из документа "Разрешение на строительство" от {doc.date}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className={styles.showAllButton}>Показать все</button>
                </div>

                {/* Stages Section */}
                <div className={styles.stagesSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Этапы реализации проекта</h2>
                        <img src={MenuIcon} alt="Меню" className={styles.menuIcon} />
                    </div>
                    <div className={styles.stagesList}>
                        {project.stages.map((stage, index) => (
                            <div key={index} className={styles.stageItem}>
                                <div className={`${styles.stageStatus} ${styles[`stageStatus${stage.status.charAt(0).toUpperCase() + stage.status.slice(1)}`]}`}>
                                    {stage.status === 'completed' && '✓'}
                                    {stage.status === 'error' && '✕'}
                                </div>
                                <div className={styles.stageInfo}>
                                    <div className={styles.stageName}>{stage.name}</div>
                                    <div className={styles.stageDetails}>
                                        Завершено {stage.progress}%, осталось - {stage.remaining} дн.
                                    </div>
                                    <div className={styles.stageDates}>
                                        01.11.2020 - 01.11.2024
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className={styles.showAllButton}>Все этапы</button>
                </div>

                {/* Map Section */}
                <div className={styles.mapSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Расположение объекта</h2>
                        <img src={MenuIcon} alt="Меню" className={styles.menuIcon} />
                    </div>
                    <div className={styles.mapContainer}>
                        <Map
                            center={[mapCoordinates.longitude, mapCoordinates.latitude]}
                            markerPosition={[mapCoordinates.longitude, mapCoordinates.latitude]}
                            zoom={15}
                            editable={false}
                            onMarkerChange={handleMapMarkerChange}
                        />
                    </div>
                    <div className={styles.mapInfo}>
                        <div className={styles.mapTitle}>{project.title}</div>
                        <div className={styles.mapAddress}>{project.address}</div>
                        <div className={styles.mapCoordinates}>
                            <span>Широта: {mapCoordinates.latitude.toFixed(6)}</span>
                            <span>Долгота: {mapCoordinates.longitude.toFixed(6)}</span>
                        </div>
                    </div>
                    <button className={styles.expandMapButton}>Развернуть</button>
                </div>
            </main>
        </div>
    )
}

export default ProjectDetail

