import { Toaster as Sonner, type ToasterProps } from "sonner";

export type { ToasterProps };

export function Toaster(props: ToasterProps) {
  return (
    <Sonner
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "border-[var(--shop-border)] bg-[var(--shop-background)] text-[var(--shop-foreground)]",
          description: "text-[var(--shop-muted-foreground)]",
          actionButton: "bg-[var(--shop-primary)] text-[var(--shop-primary-foreground)]",
          cancelButton: "bg-[var(--shop-muted)] text-[var(--shop-foreground)]",
        },
      }}
      {...props}
    />
  );
}
