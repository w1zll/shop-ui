"use client";

import * as React from "react";
import { AlertTriangleIcon } from "lucide-react";

import { Button } from "../ui/button";
import { cn } from "../../lib/cn";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title,
  description,
  retryLabel = "Повторить",
  onRetry,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-lg border border-[var(--shop-border)] p-8 text-center",
        className,
      )}
      {...props}
    >
      <AlertTriangleIcon className="size-8 text-[var(--shop-destructive)]" aria-hidden="true" />
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-[var(--shop-foreground)]">{title}</h3>
        {description && (
          <p className="text-sm text-[var(--shop-muted-foreground)]">{description}</p>
        )}
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          {retryLabel}
        </Button>
      )}
    </div>
  );
}
