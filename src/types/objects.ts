export interface ConstructionObject {
  id: string
  name: string
  description?: string
  address: string
  coordinates: {
    lat: number
    lng: number
  }
  status: ObjectStatus
  type: ObjectType
  startDate: string
  endDate?: string
  budget: number
  currency: string
  client: {
    id: string
    name: string
    contact: string
  }
  manager: {
    id: string
    name: string
    email: string
  }
  supervisor?: {
    id: string
    name: string
    email: string
  }
  workers: Worker[]
  materials: Material[]
  violations: Violation[]
  remarks: Remark[]
  photos: Photo[]
  documents: Document[]
  progress: number
  createdAt: string
  updatedAt: string
}

export type ObjectStatus = 
  | 'planning'
  | 'in_progress'
  | 'on_hold'
  | 'completed'
  | 'cancelled'

export type ObjectType = 
  | 'residential'
  | 'commercial'
  | 'industrial'
  | 'infrastructure'
  | 'renovation'

export interface Worker {
  id: string
  name: string
  email: string
  phone: string
  role: string
  specialization: string[]
  isActive: boolean
  startDate: string
  endDate?: string
}

export interface Photo {
  id: string
  url: string
  thumbnailUrl: string
  caption?: string
  takenAt: string
  takenBy: string
  location?: {
    lat: number
    lng: number
  }
}

export interface Document {
  id: string
  name: string
  type: DocumentType
  url: string
  size: number
  uploadedAt: string
  uploadedBy: string
  description?: string
}

export type DocumentType = 
  | 'contract'
  | 'permit'
  | 'blueprint'
  | 'report'
  | 'invoice'
  | 'other'

export interface ObjectFilters {
  status?: ObjectStatus[]
  type?: ObjectType[]
  manager?: string[]
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface ObjectStats {
  total: number
  byStatus: Record<ObjectStatus, number>
  byType: Record<ObjectType, number>
  totalBudget: number
  averageProgress: number
}
