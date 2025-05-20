'use client';

import { useQuery } from '@tanstack/react-query';

export function useSkeletonsCount() {
  return useQuery<number>({
    queryKey: ['skeletonsCount'],
    queryFn: async () => {
      const res = await fetch('/api/skeletons-count');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      return data.count;
    },
  });
}
