import * as React from "react";

import { Skeleton } from "../ui/skeleton";
import { cn } from "../../lib/cn";

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export function LoadingState({ label = "Загрузка", className, ...props }: LoadingStateProps) {
  return (
    <div className={cn("space-y-3", className)} aria-label={label} {...props}>
      <Skeleton className="h-5 w-1/3" />
      <Skeleton className="h-24 w-full" />
      <Skeleton className="h-5 w-2/3" />
    </div>
  );
}
