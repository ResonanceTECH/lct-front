import { useEffect, useRef } from 'react'
import { load } from '@2gis/mapgl'

interface MapProps {
    className?: string
    center?: [number, number]
    zoom?: number
    markerPosition?: [number, number] // координаты маркера [lon, lat]
    onMarkerChange?: (coordinates: { longitude: number; latitude: number }) => void
    editable?: boolean // можно ли перемещать маркер
}

export const Map = ({
    className = '',
    center = [37.6176, 55.7558], // Москва
    zoom = 15,
    markerPosition,
    onMarkerChange,
    editable = false
}: MapProps) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const mapRef = useRef<any>(null)
    const markerRef = useRef<any>(null)

    useEffect(() => {
        if (!containerRef.current) return

        load().then((mapgl) => {
            // Очищаем предыдущую карту если она существует
            if (mapRef.current) {
                mapRef.current.destroy()
            }

            mapRef.current = new mapgl.Map(containerRef.current!, {
                center,
                zoom,
                key: 'c2374e6f-99e6-43a9-9e29-6a173202b988',
                style: 'e05ac437-fcc2-4845-ad74-b1de9ce07555',
            })

            // Создаем маркер
            const initialPos = markerPosition || center
            markerRef.current = new mapgl.Marker(mapRef.current, {
                coordinates: initialPos,
            })

            // Обработчик клика по карте (если редактируемая)
            if (editable) {
                mapRef.current.on('click', (event: any) => {
                    const coords: [number, number] = [event.lngLat[0], event.lngLat[1]]

                    // Перемещаем маркер
                    if (markerRef.current) {
                        markerRef.current.setCoordinates(coords)
                    }

                    // Отправляем координаты наружу
                    if (onMarkerChange) {
                        onMarkerChange({
                            longitude: coords[0],
                            latitude: coords[1]
                        })
                    }
                })
            }
        }).catch((error) => {
            console.error('Map loading error:', error)
        })

        return () => {
            if (markerRef.current) {
                markerRef.current.destroy()
                markerRef.current = null
            }
            if (mapRef.current) {
                mapRef.current.destroy()
                mapRef.current = null
            }
        }
    }, [center, zoom, editable])

    // Обновляем позицию маркера при изменении props
    useEffect(() => {
        if (markerRef.current && markerPosition) {
            markerRef.current.setCoordinates(markerPosition)
        }
    }, [markerPosition])

    return (
        <div
            ref={containerRef}
            className={className}
            style={{ width: '100%', height: '100%' }}
        />
    )
}

export default Map

