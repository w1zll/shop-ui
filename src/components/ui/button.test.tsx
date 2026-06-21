import { render, screen } from "@testing-library/react";

import { Button, buttonVariants } from "./button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Добавить в корзину</Button>);

    expect(screen.getByRole("button", { name: "Добавить в корзину" })).toBeInTheDocument();
  });

  it("uses button type by default", () => {
    render(<Button>Сохранить</Button>);

    expect(screen.getByRole("button", { name: "Сохранить" })).toHaveAttribute("type", "button");
  });

  it("applies variant, size, and custom classes", () => {
    render(
      <Button variant="outline" size="sm" className="custom-action">
        Filter
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Filter" });

    expect(button).toHaveClass("custom-action");
    expect(button).toHaveClass("h-9");
    expect(button).toHaveClass("border");
  });

  it("uses pointer cursor by default and default cursor for disabled state", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole("button", { name: "Disabled" });

    expect(button).toHaveClass("cursor-pointer");
    expect(button).toHaveClass("disabled:pointer-events-none");
    expect(button).toHaveClass("disabled:cursor-default");
    expect(button).toHaveClass("disabled:opacity-50");
  });

  it("allows pointer cursor to be disabled explicitly", () => {
    render(<Button cursor="default">Static action</Button>);

    const button = screen.getByRole("button", { name: "Static action" });

    expect(button).toHaveClass("cursor-default");
    expect(button).not.toHaveClass("cursor-pointer");
  });

  it("does not pass button-only attributes to asChild links", () => {
    render(
      <Button asChild>
        <a href="/catalog">Catalog</a>
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Catalog" })).not.toHaveAttribute("type");
  });

  it("exports stable button variant class builders", () => {
    const className = buttonVariants({ size: "icon", variant: "ghost" });

    expect(className).toContain("size-10");
    expect(className).toContain("hover:bg-[var(--shop-muted)]");
  });
});
