export interface ApiResponse<T = any> {
    data: T
    message: string
    success: boolean
    errors?: string[]
}

export interface PaginatedResponse<T = any> {
    data: T[]
    pagination: {
        page: number
        limit: number
        total: number
        totalPages: number
        hasNext: boolean
        hasPrev: boolean
    }
}

export interface PaginationParams {
    page?: number
    limit?: number
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
}

export interface SelectOption {
    value: string
    label: string
    disabled?: boolean
}

export interface Coordinates {
    lat: number
    lng: number
}

export interface Address {
    street: string
    city: string
    state: string
    country: string
    postalCode: string
    coordinates?: Coordinates
}

export interface FileUpload {
    file: File
    progress: number
    status: 'pending' | 'uploading' | 'completed' | 'error'
    url?: string
    error?: string
}

export interface Notification {
    id: string
    type: 'info' | 'success' | 'warning' | 'error'
    title: string
    message: string
    read: boolean
    createdAt: string
    actionUrl?: string
}

export interface Breadcrumb {
    label: string
    href?: string
    current?: boolean
}

export interface TableColumn<T = any> {
    key: keyof T | string
    label: string
    sortable?: boolean
    render?: (value: any, item: T) => React.ReactNode
    width?: string | number
    align?: 'left' | 'center' | 'right'
}

export interface TableAction<T = any> {
    label: string
    icon?: React.ReactNode
    onClick: (item: T) => void
    variant?: 'primary' | 'secondary' | 'danger'
    disabled?: (item: T) => boolean
}

export interface ChartData {
    labels: string[]
    datasets: {
        label: string
        data: number[]
        backgroundColor?: string | string[]
        borderColor?: string | string[]
        borderWidth?: number
    }[]
}

export interface DateRange {
    from: Date
    to: Date
}

export interface FilterOption {
    value: string
    label: string
    count?: number
    disabled?: boolean
}

export interface SortOption {
    value: string
    label: string
    direction: 'asc' | 'desc'
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ErrorState {
    message: string
    code?: string
    details?: any
}
