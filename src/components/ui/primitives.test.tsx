import { render, screen } from "@testing-library/react";

import { Badge } from "./badge";
import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Checkbox } from "./checkbox";
import { Input } from "./input";
import { Label } from "./label";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";

describe("ui primitives", () => {
  it("renders a button as a child element", () => {
    render(
      <Button asChild>
        <a href="/catalog">Каталог</a>
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Каталог" })).toHaveAttribute("href", "/catalog");
  });

  it("renders form primitives", () => {
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="name@example.com" />
        <Checkbox aria-label="Согласие" />
      </div>,
    );

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("name@example.com")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Согласие" })).toBeInTheDocument();
  });

  it("renders display primitives", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Заказ</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge>Оплачен</Badge>
          <Separator />
          <Skeleton aria-label="Загрузка" className="h-4 w-24" />
        </CardContent>
      </Card>,
    );

    expect(screen.getByText("Заказ")).toBeInTheDocument();
    expect(screen.getByText("Оплачен")).toBeInTheDocument();
    expect(screen.getByLabelText("Загрузка")).toBeInTheDocument();
  });
});
