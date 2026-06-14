import { render, screen } from "@testing-library/react";

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
});
