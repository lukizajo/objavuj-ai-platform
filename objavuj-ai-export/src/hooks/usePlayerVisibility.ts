import { useState, useEffect, useRef } from 'react'

interface UsePlayerVisibilityProps {
  threshold?: number
  rootMargin?: string
}

/**
 * Hook to detect when an element is visible in the viewport
 * @param options - IntersectionObserver options
 * @returns [isVisible, ref] - current visibility state and ref to attach to element
 */
export const usePlayerVisibility = ({
  threshold = 0,
  rootMargin = '0px'
}: UsePlayerVisibilityProps = {}) => {
  const [isVisible, setIsVisible] = useState(true)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [threshold, rootMargin])

  return [isVisible, ref] as const
}

export default usePlayerVisibility