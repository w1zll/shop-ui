import * as React from "react";
import { SearchXIcon } from "lucide-react";

import { cn } from "../../lib/cn";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action, className, ...props }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-[var(--shop-border)] p-8 text-center",
        className,
      )}
      {...props}
    >
      <SearchXIcon className="size-8 text-[var(--shop-muted-foreground)]" aria-hidden="true" />
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-[var(--shop-foreground)]">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--shop-muted-foreground)]">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
