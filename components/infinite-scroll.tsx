"use client"

import { useEffect, useRef } from "react"
import { useInView } from "react-intersection-observer"

interface InfiniteScrollProps {
  loadMore: () => void
  hasMore: boolean
  children: React.ReactNode
}

export function InfiniteScroll({ loadMore, hasMore, children }: InfiniteScrollProps) {
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [inView, loadMore, hasMore])

  return (
    <>
      {children}
      {hasMore && <div ref={ref} className="h-10" />}
    </>
  )
}

