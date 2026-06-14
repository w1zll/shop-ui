import { render, screen } from "@testing-library/react";

import { Button } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Добавить в корзину</Button>);

    expect(screen.getByRole("button", { name: "Добавить в корзину" })).toBeInTheDocument();
  });

  it("uses button type by default", () => {
    render(<Button>Сохранить</Button>);

    expect(screen.getByRole("button", { name: "Сохранить" })).toHaveAttribute("type", "button");
  });
});
