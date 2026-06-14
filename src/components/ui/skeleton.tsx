import * as React from "react";

import { cn } from "../../lib/cn";

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-md bg-[var(--shop-muted)]", className)} {...props} />
  );
}
