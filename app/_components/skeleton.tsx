import { HTMLAttributes } from 'react';
import { cn } from '../lib/utils';

export function Skeleton({
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'h-full w-full animate-pulse rounded-lg bg-gray-300',
        className
      )}
      {...restProps}
    />
  );
}
