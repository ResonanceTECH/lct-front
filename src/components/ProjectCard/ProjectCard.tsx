import React from 'react'
import styles from './ProjectCard.module.css'
import ArrowIcon from '@/assets/icons/line-md_arrow-up.png'

export interface ProjectCardProps {
  id: string
  title: string
  dateStart: string
  dateEnd: string
  category: string
  ownerName: string
  image?: string
  tags?: string[]
  onClick?: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  dateStart,
  dateEnd,
  category,
  ownerName,
  image,
  tags = [],
  onClick,
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
      {/* Project Image */}
      <div className={styles.imageWrapper}>
        {image ? (
          <img src={image} alt={title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>

      {/* Card Content */}
      <div className={styles.content}>
        {/* Title */}
        <h3 className={styles.title}>{title}</h3>

        {/* Dates */}
        <div className={styles.dates}>
          <span>{dateStart}</span>
          <span>-</span>
          <span>{dateEnd}</span>
        </div>

        {/* Category */}
        <p className={styles.category}>{category}</p>

        {/* Owner Name */}
        <p className={styles.ownerName}>{ownerName}</p>

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Arrow Icon */}
        <div className={styles.arrow}>
          <img src={ArrowIcon} alt="Открыть" />
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

