"use client";

import { useState } from "react";

interface MediaGridProps {
  title: string;
  initialItems: any[];
  loadMore: (page: number) => Promise<any>;
}

export default function MediaGrid({
  title,
  initialItems,
  loadMore,
}: MediaGridProps) {
  const [items, setItems] = useState(initialItems);
  const [page, setPage] = useState(1);
  // ... rest of your component code
}
