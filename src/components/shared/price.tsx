import * as React from "react";

import { cn } from "../../lib/cn";

export interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  valueCents: number;
  currency?: string;
  locale?: string;
}

export function Price({
  valueCents,
  currency = "RUB",
  locale = "ru-RU",
  className,
  ...props
}: PriceProps) {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  });

  return (
    <span className={cn("tabular-nums", className)} {...props}>
      {formatter.format(valueCents / 100)}
    </span>
  );
}
