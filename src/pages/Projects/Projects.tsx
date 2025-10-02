import React, { useState } from 'react'
import styles from './Projects.module.css'
import ProjectCard from '@/components/ProjectCard'
import Logo from '@/assets/icons/logo.svg'
import NotificationIcon from '@/assets/icons/Property 1=off.png'
import ExitIcon from '@/assets/icons/iconamoon_exit.png'
import SearchIcon from '@/assets/icons/iconamoon_search-light.svg'
import AvatarIcon from '@/assets/icons/Avatar.svg'

const Projects: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('')

    // Mock data
    const projects = [
        {
            id: '1',
            title: 'Санаторий "Резонанс"',
            dateStart: '01.11.2020',
            dateEnd: '01.11.2024',
            category: 'Строительство',
            ownerName: 'Олейник Екатерина',
            tags: ['Медицина', 'Москва'],
            image: '/src/assets/icons/garden_project.png',
        },
        {
            id: '2',
            title: 'Санаторий "Резонанс"',
            dateStart: '01.11.2020',
            dateEnd: '01.11.2024',
            category: 'Строительство',
            ownerName: 'Олейник Екатерина',
            tags: ['Медицина', 'Москва'],
            image: '/src/assets/icons/garden_project.png',
        },
        {
            id: '3',
            title: 'Санаторий "Резонанс"',
            dateStart: '01.11.2020',
            dateEnd: '01.11.2024',
            category: 'Строительство',
            ownerName: 'Олейник Екатерина',
            tags: ['Медицина', 'Москва'],
            image: '/src/assets/icons/garden_project.png',
        },
        {
            id: '4',
            title: 'Санаторий "Резонанс"',
            dateStart: '01.11.2020',
            dateEnd: '01.11.2024',
            category: 'Строительство',
            ownerName: 'Олейник Екатерина',
            tags: ['Медицина', 'Москва'],
            image: '/src/assets/icons/garden_project.png',
        },
    ]

    const handleProjectClick = (id: string) => {
        console.log('Project clicked:', id)
    }

    const handleNewProject = () => {
        console.log('New project')
    }

    const handleLogout = () => {
        console.log('Logout')
    }

    return (
        <div className={styles.projectsPage}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <img src={Logo} alt="Logo" className={styles.logo} />
                </div>

                <nav className={styles.headerNav}>
                    <a href="#" className={styles.navLink}>Проекты</a>
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
            </header>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Title and New Project Button */}
                <div className={styles.titleSection}>
                    <h1 className={styles.pageTitle}>Проекты</h1>
                    <button className={styles.newProjectButton} onClick={handleNewProject}>
                        <span className={styles.buttonIcon}>+</span>
                        Новый проект
                    </button>
                </div>

                {/* Search Bar */}
                <div className={styles.searchSection}>
                    <div className={styles.searchBar}>
                        <img src={SearchIcon} alt="Поиск" className={styles.searchIcon} />
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Что будем искать?"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                <div className={styles.projectsGrid}>
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            {...project}
                            onClick={() => handleProjectClick(project.id)}
                        />
                    ))}
                </div>
            </main>
        </div>
    )
}

export default Projects

