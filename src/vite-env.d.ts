/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    // Добавьте другие env переменные здесь
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}