import * as React from "react";

import { cn } from "../../lib/cn";

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  markOnly?: boolean;
}

export function Logo({ className, markOnly = false, ...props }: LogoProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-[var(--shop-foreground)]",
        className,
      )}
      {...props}
    >
      <span className="flex size-8 items-center justify-center rounded-md bg-[var(--shop-primary)] text-sm font-bold text-[var(--shop-primary-foreground)]">
        S
      </span>
      {!markOnly && <span className="text-base">Shop MFS</span>}
    </div>
  );
}
