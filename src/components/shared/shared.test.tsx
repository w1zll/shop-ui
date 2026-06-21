import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "../ui/button";
import { Container } from "./container";
import { EmptyState } from "./empty-state";
import { ErrorState } from "./error-state";
import { LoadingState } from "./loading-state";
import { Logo } from "./logo";
import { Price } from "./price";
import { RemoteErrorFallback } from "./remote-error-fallback";

describe("shared components", () => {
  it("renders shop identity and price", () => {
    render(
      <Container>
        <Logo />
        <Price valueCents={129990} />
      </Container>,
    );

    expect(screen.getByText("Shop MFS")).toBeInTheDocument();
    expect(
      screen.getByText((content) => content.replace(/\s/g, " ").includes("1 299,90")),
    ).toBeInTheDocument();
  });

  it("formats prices with custom locale and currency", () => {
    render(<Price valueCents={1234} currency="USD" locale="en-US" />);

    expect(screen.getByText("$12.34")).toHaveClass("tabular-nums");
  });

  it("renders state components", () => {
    render(
      <div>
        <EmptyState title="Ничего не найдено" action={<Button>В каталог</Button>} />
        <ErrorState title="Ошибка" onRetry={() => undefined} />
        <LoadingState />
        <RemoteErrorFallback remoteName="cart remote" />
      </div>,
    );

    expect(screen.getByText("Ничего не найдено")).toBeInTheDocument();
    expect(screen.getByText("Ошибка")).toBeInTheDocument();
    expect(screen.getByLabelText("Загрузка")).toBeInTheDocument();
    expect(screen.getByText(/cart remote/)).toBeInTheDocument();
  });

  it("calls retry handlers from error fallbacks", () => {
    const onErrorRetry = vi.fn();
    const onRemoteRetry = vi.fn();

    render(
      <div>
        <ErrorState title="Recoverable error" retryLabel="Retry error" onRetry={onErrorRetry} />
        <RemoteErrorFallback
          remoteName="account remote"
          onRetry={onRemoteRetry}
          data-testid="account-remote-fallback"
        />
      </div>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Retry error" }));
    fireEvent.click(screen.getAllByRole("button")[1]);

    expect(screen.getByTestId("account-remote-fallback")).toHaveTextContent("account remote");
    expect(onErrorRetry).toHaveBeenCalledTimes(1);
    expect(onRemoteRetry).toHaveBeenCalledTimes(1);
  });
});
