import { render, screen } from "@testing-library/react";

import { Avatar, AvatarFallback } from "./avatar";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "./sheet";

describe("overlay primitives", () => {
  it("renders avatar fallback", () => {
    render(
      <Avatar>
        <AvatarFallback>WL</AvatarFallback>
      </Avatar>,
    );

    expect(screen.getByText("WL")).toBeInTheDocument();
  });

  it("renders dialog and sheet when open", () => {
    render(
      <div>
        <Dialog open>
          <DialogContent>
            <DialogTitle>Корзина</DialogTitle>
            <DialogDescription>Товары в корзине</DialogDescription>
          </DialogContent>
        </Dialog>
        <Sheet open>
          <SheetContent>
            <SheetTitle>Фильтры</SheetTitle>
            <SheetDescription>Настройки каталога</SheetDescription>
          </SheetContent>
        </Sheet>
      </div>,
    );

    expect(screen.getByText("Корзина")).toBeInTheDocument();
    expect(screen.getByText("Фильтры")).toBeInTheDocument();
  });

  it("renders menu and select triggers", () => {
    render(
      <div>
        <DropdownMenu open>
          <DropdownMenuTrigger>Меню</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Профиль</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Select>
          <SelectTrigger aria-label="Сортировка">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Сначала дешевле</SelectItem>
          </SelectContent>
        </Select>
      </div>,
    );

    expect(screen.getByText("Меню")).toBeInTheDocument();
    expect(screen.getByText("Профиль")).toBeInTheDocument();
    expect(screen.getByLabelText("Сортировка")).toBeInTheDocument();
  });
});
