import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/cn";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--shop-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--shop-primary)] text-[var(--shop-primary-foreground)] hover:bg-[var(--shop-primary-hover)]",
        secondary:
          "bg-[var(--shop-secondary)] text-[var(--shop-secondary-foreground)] hover:bg-[var(--shop-secondary-hover)]",
        destructive:
          "bg-[var(--shop-destructive)] text-[var(--shop-destructive-foreground)] hover:bg-[var(--shop-destructive-hover)]",
        outline:
          "border border-[var(--shop-border)] bg-[var(--shop-background)] hover:bg-[var(--shop-muted)] hover:text-[var(--shop-foreground)]",
        ghost: "hover:bg-[var(--shop-muted)] hover:text-[var(--shop-foreground)]",
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = "button", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : type}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
