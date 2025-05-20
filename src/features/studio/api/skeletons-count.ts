'use client';

import { useQuery } from '@tanstack/react-query';

export function useSkeletonsCount() {
  return useQuery<number>({
    queryKey: ['skeletonsCount'],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return Math.floor(Math.random() * (2000 - 10 + 1)) + 10;
    },
  });
}
