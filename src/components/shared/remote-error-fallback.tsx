import * as React from "react";

import { ErrorState } from "./error-state";

export interface RemoteErrorFallbackProps extends React.HTMLAttributes<HTMLDivElement> {
  remoteName: string;
  onRetry?: () => void;
}

export function RemoteErrorFallback({ remoteName, onRetry, ...props }: RemoteErrorFallbackProps) {
  return (
    <ErrorState
      title="Микрофронтенд временно недоступен"
      description={`Не удалось загрузить ${remoteName}. Основная страница продолжает работать.`}
      onRetry={onRetry}
      {...props}
    />
  );
}
