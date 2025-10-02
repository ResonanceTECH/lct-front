export interface Violation {
    id: string
    objectId: string
    objectName: string
    type: ViolationType
    severity: ViolationSeverity
    description: string
    location: string
    coordinates?: {
        lat: number
        lng: number
    }
    reportedBy: {
        id: string
        name: string
        role: string
    }
    assignedTo?: {
        id: string
        name: string
        role: string
    }
    status: ViolationStatus
    priority: ViolationPriority
    photos: string[]
    documents: string[]
    dueDate?: string
    resolvedAt?: string
    resolution?: string
    resolutionPhotos?: string[]
    createdAt: string
    updatedAt: string
}

export type ViolationType =
    | 'safety'
    | 'quality'
    | 'environmental'
    | 'regulatory'
    | 'schedule'
    | 'budget'
    | 'other'

export type ViolationSeverity =
    | 'low'
    | 'medium'
    | 'high'
    | 'critical'

export type ViolationStatus =
    | 'reported'
    | 'assigned'
    | 'in_progress'
    | 'resolved'
    | 'closed'
    | 'rejected'

export type ViolationPriority =
    | 'low'
    | 'medium'
    | 'high'
    | 'urgent'

export interface ViolationFormData {
    objectId: string
    type: ViolationType
    severity: ViolationSeverity
    description: string
    location: string
    coordinates?: {
        lat: number
        lng: number
    }
    assignedTo?: string
    priority: ViolationPriority
    dueDate?: string
    photos: File[]
    documents: File[]
}

export interface ViolationFilters {
    type?: ViolationType[]
    severity?: ViolationSeverity[]
    status?: ViolationStatus[]
    priority?: ViolationPriority[]
    objectId?: string
    reportedBy?: string
    assignedTo?: string
    dateFrom?: string
    dateTo?: string
    search?: string
}

export interface ViolationStats {
    total: number
    byType: Record<ViolationType, number>
    bySeverity: Record<ViolationSeverity, number>
    byStatus: Record<ViolationStatus, number>
    byPriority: Record<ViolationPriority, number>
    averageResolutionTime: number
    resolutionRate: number
}
