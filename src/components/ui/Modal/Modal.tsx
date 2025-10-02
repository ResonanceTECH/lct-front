import React, { useEffect, useRef } from 'react'
import styles from './Modal.module.css'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  className?: string
  overlayClassName?: string
  header?: React.ReactNode
  footer?: React.ReactNode
  loading?: boolean
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  header,
  footer,
  loading = false,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElement = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      
      // Focus the modal
      if (modalRef.current) {
        modalRef.current.focus()
      }
    } else {
      document.body.style.overflow = 'unset'
      
      // Return focus to previous element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus()
      }
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeOnEscape, onClose])

  if (!isOpen) return null

  const baseClasses = styles.modal
  const sizeClass = styles[`modal--${size}`]
  
  const modalClasses = [baseClasses, sizeClass, className]
    .filter(Boolean)
    .join(' ')

  const overlayClasses = [styles.modalOverlay, overlayClassName]
    .filter(Boolean)
    .join(' ')

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose()
    }
  }

  return (
    <div className={overlayClasses} onClick={handleOverlayClick}>
      <div 
        ref={modalRef}
        className={modalClasses} 
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {(header || title || showCloseButton) && (
          <div className={styles.modalHeader}>
            {header || (
              <>
                {title && (
                  <h2 id="modal-title" className={styles.modalTitle}>
                    {title}
                  </h2>
                )}
                {showCloseButton && (
                  <button
                    className={styles.modalClose}
                    onClick={onClose}
                    aria-label="Close modal"
                    disabled={loading}
                  >
                    ×
                  </button>
                )}
              </>
            )}
          </div>
        )}
        
        <div className={styles.modalBody}>
          {loading && (
            <div className={styles.modalLoading}>
              <div className={styles.spinner} />
            </div>
          )}
          {children}
        </div>
        
        {footer && (
          <div className={styles.modalFooter}>
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export default Modal
