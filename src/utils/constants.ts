// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
}

// App Configuration
export const APP_CONFIG = {
  NAME: 'LCT Build',
  VERSION: '1.0.0',
  DESCRIPTION: 'Система управления строительными объектами',
  SUPPORT_EMAIL: 'support@lctbuild.com',
  SUPPORT_PHONE: '+7 (800) 123-45-67',
}

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  SUPERVISOR: 'supervisor',
  WORKER: 'worker',
  CLIENT: 'client',
} as const

// Object Statuses
export const OBJECT_STATUSES = {
  PLANNING: 'planning',
  IN_PROGRESS: 'in_progress',
  ON_HOLD: 'on_hold',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

// Object Types
export const OBJECT_TYPES = {
  RESIDENTIAL: 'residential',
  COMMERCIAL: 'commercial',
  INDUSTRIAL: 'industrial',
  INFRASTRUCTURE: 'infrastructure',
  RENOVATION: 'renovation',
} as const

// Material Categories
export const MATERIAL_CATEGORIES = {
  CONCRETE: 'concrete',
  STEEL: 'steel',
  WOOD: 'wood',
  BRICK: 'brick',
  TILE: 'tile',
  PAINT: 'paint',
  ELECTRICAL: 'electrical',
  PLUMBING: 'plumbing',
  INSULATION: 'insulation',
  ROOFING: 'roofing',
  FLOORING: 'flooring',
  WINDOWS: 'windows',
  DOORS: 'doors',
  HARDWARE: 'hardware',
  OTHER: 'other',
} as const

// Violation Types
export const VIOLATION_TYPES = {
  SAFETY: 'safety',
  QUALITY: 'quality',
  ENVIRONMENTAL: 'environmental',
  REGULATORY: 'regulatory',
  SCHEDULE: 'schedule',
  BUDGET: 'budget',
  OTHER: 'other',
} as const

// Violation Severities
export const VIOLATION_SEVERITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical',
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const

// Map Configuration
export const MAP_CONFIG = {
  DEFAULT_CENTER: {
    lat: 55.7558,
    lng: 37.6176,
  },
  DEFAULT_ZOOM: 10,
  MIN_ZOOM: 3,
  MAX_ZOOM: 18,
} as const

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'DD.MM.YYYY',
  DISPLAY_WITH_TIME: 'DD.MM.YYYY HH:mm',
  API: 'YYYY-MM-DD',
  API_WITH_TIME: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'lct_token',
  REFRESH_TOKEN: 'lct_refresh_token',
  USER: 'lct_user',
  THEME: 'lct_theme',
  LANGUAGE: 'lct_language',
  OFFLINE_DATA: 'lct_offline_data',
} as const

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  OBJECTS: '/objects',
  OBJECT_DETAIL: '/objects/:id',
  MATERIALS: '/materials',
  VIOLATIONS: '/violations',
  REMARKS: '/remarks',
  REPORTS: '/reports',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
    PROFILE: '/auth/profile',
  },
  OBJECTS: {
    LIST: '/objects',
    DETAIL: '/objects/:id',
    CREATE: '/objects',
    UPDATE: '/objects/:id',
    DELETE: '/objects/:id',
    STATS: '/objects/stats',
  },
  MATERIALS: {
    LIST: '/materials',
    DETAIL: '/materials/:id',
    CREATE: '/materials',
    UPDATE: '/materials/:id',
    DELETE: '/materials/:id',
    STATS: '/materials/stats',
  },
  VIOLATIONS: {
    LIST: '/violations',
    DETAIL: '/violations/:id',
    CREATE: '/violations',
    UPDATE: '/violations/:id',
    DELETE: '/violations/:id',
    STATS: '/violations/stats',
  },
} as const

// Theme Colors
export const THEME_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#6b7280',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4',
} as const

// Breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
} as const
