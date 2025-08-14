"use client"

import { useEffect, useCallback } from "react"

interface PerformanceMetric {
  name: string
  value: number
  timestamp: number
  id?: string
}

interface WebVitals {
  CLS?: number // Cumulative Layout Shift
  FID?: number // First Input Delay
  FCP?: number // First Contentful Paint
  LCP?: number // Largest Contentful Paint
  TTFB?: number // Time to First Byte
}

export function usePerformance() {
  const reportMetric = useCallback((metric: PerformanceMetric) => {
    // In production, send to analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('Performance Metric:', metric)
    }
    
    // Send to analytics service (e.g., Google Analytics, Vercel Analytics)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'web_vitals', {
        custom_map: { metric_name: 'custom_metric_name' },
        metric_name: metric.name,
        value: Math.round(metric.value),
        event_category: 'Web Vitals',
      })
    }
  }, [])

  const measurePageLoad = useCallback(() => {
    if (typeof window === 'undefined') return

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      // DOM Content Loaded
      reportMetric({
        name: 'DOM_CONTENT_LOADED',
        value: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        timestamp: Date.now(),
      })

      // Load Complete
      reportMetric({
        name: 'LOAD_COMPLETE',
        value: navigation.loadEventEnd - navigation.navigationStart,
        timestamp: Date.now(),
      })

      // First Paint
      const paintEntries = performance.getEntriesByType('paint')
      paintEntries.forEach((entry) => {
        reportMetric({
          name: entry.name.toUpperCase().replace('-', '_'),
          value: entry.startTime,
          timestamp: Date.now(),
        })
      })
    }
  }, [reportMetric])

  const measureResource = useCallback((resourceName: string) => {
    if (typeof window === 'undefined') return

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    const resource = resources.find(r => r.name.includes(resourceName))
    
    if (resource) {
      reportMetric({
        name: `RESOURCE_${resourceName.toUpperCase()}`,
        value: resource.duration,
        timestamp: Date.now(),
      })
    }
  }, [reportMetric])

  const measureCustom = useCallback((name: string, startTime: number) => {
    const duration = performance.now() - startTime
    reportMetric({
      name: `CUSTOM_${name.toUpperCase()}`,
      value: duration,
      timestamp: Date.now(),
    })
  }, [reportMetric])

  useEffect(() => {
    measurePageLoad()
  }, [measurePageLoad])

  return {
    reportMetric,
    measurePageLoad,
    measureResource,
    measureCustom,
  }
}

// Web Vitals tracking
export function useWebVitals(onMetric?: (metric: PerformanceMetric) => void) {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reportVital = (metric: PerformanceMetric) => {
      onMetric?.(metric)
      
      // Log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric)
      }
    }

    // Largest Contentful Paint
    if ('PerformanceObserver' in window) {
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          reportVital({
            name: 'LCP',
            value: lastEntry.startTime,
            timestamp: Date.now(),
            id: 'lcp',
          })
        })
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries()
          entries.forEach((entry: any) => {
            reportVital({
              name: 'FID',
              value: entry.processingStart - entry.startTime,
              timestamp: Date.now(),
              id: 'fid',
            })
          })
        })
        fidObserver.observe({ entryTypes: ['first-input'] })

        // Cumulative Layout Shift
        let clsValue = 0
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries() as any[]) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value
              reportVital({
                name: 'CLS',
                value: clsValue,
                timestamp: Date.now(),
                id: 'cls',
              })
            }
          }
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })

        return () => {
          lcpObserver.disconnect()
          fidObserver.disconnect()
          clsObserver.disconnect()
        }
      } catch (error) {
        console.warn('Performance Observer not supported:', error)
      }
    }
  }, [onMetric])
}

// Hook for measuring component render performance
export function useRenderPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time:`, renderTime.toFixed(2), 'ms')
      }
    }
  })
}

// Hook for measuring async operations
export function useAsyncPerformance() {
  const measureAsync = useCallback(async <T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T> => {
    const startTime = performance.now()
    
    try {
      const result = await operation()
      const endTime = performance.now()
      const duration = endTime - startTime
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`${operationName} completed in:`, duration.toFixed(2), 'ms')
      }
      
      return result
    } catch (error) {
      const endTime = performance.now()
      const duration = endTime - startTime
      
      console.error(`${operationName} failed after:`, duration.toFixed(2), 'ms', error)
      throw error
    }
  }, [])

  return { measureAsync }
}