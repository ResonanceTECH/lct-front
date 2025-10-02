export interface Material {
    id: string
    name: string
    description?: string
    category: MaterialCategory
    unit: MaterialUnit
    quantity: number
    unitPrice: number
    totalPrice: number
    currency: string
    supplier: Supplier
    objectId: string
    objectName: string
    status: MaterialStatus
    deliveryDate?: string
    installationDate?: string
    location?: string
    specifications: MaterialSpecification[]
    photos: string[]
    documents: string[]
    createdAt: string
    updatedAt: string
}

export type MaterialCategory =
    | 'concrete'
    | 'steel'
    | 'wood'
    | 'brick'
    | 'tile'
    | 'paint'
    | 'electrical'
    | 'plumbing'
    | 'insulation'
    | 'roofing'
    | 'flooring'
    | 'windows'
    | 'doors'
    | 'hardware'
    | 'other'

export type MaterialUnit =
    | 'piece'
    | 'kg'
    | 'ton'
    | 'm'
    | 'm2'
    | 'm3'
    | 'liter'
    | 'box'
    | 'roll'
    | 'sheet'

export type MaterialStatus =
    | 'ordered'
    | 'in_transit'
    | 'delivered'
    | 'installed'
    | 'returned'
    | 'damaged'

export interface Supplier {
    id: string
    name: string
    contact: string
    email: string
    phone: string
    address: string
    rating: number
    isActive: boolean
}

export interface MaterialSpecification {
    name: string
    value: string
    unit?: string
}

export interface TTNFormData {
    materialId: string
    supplierId: string
    quantity: number
    unitPrice: number
    deliveryDate: string
    driverName: string
    vehicleNumber: string
    notes?: string
    photos: File[]
}

export interface MaterialFilters {
    category?: MaterialCategory[]
    status?: MaterialStatus[]
    supplier?: string[]
    objectId?: string
    dateFrom?: string
    dateTo?: string
    search?: string
}

export interface MaterialStats {
    total: number
    byCategory: Record<MaterialCategory, number>
    byStatus: Record<MaterialStatus, number>
    totalValue: number
    averagePrice: number
}
