# Shop UI

`@w1zll/shop-ui` — общий приватный UI-пакет для демонстрационного магазина на
микрофронтендах.

Пакет содержит:

- общие React-компоненты;
- CSS variables и базовые design tokens;
- утилиту `cn`;
- контракты браузерных событий;
- общий CSS entrypoint `@w1zll/shop-ui/styles.css`.
- shadcn-compatible структуру и `components.json`.

## Установка

Пакет будет публиковаться в GitHub Packages вручную. Настройка `.npmrc` и
инструкция публикации будут добавлены на следующих этапах.

## Локальная разработка

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

## Exports

```ts
import { Button, cn } from "@w1zll/shop-ui";
import { SHOP_EVENTS } from "@w1zll/shop-ui/contracts";
import "@w1zll/shop-ui/styles.css";
```

## Текущий статус

Сейчас пакет содержит bootstrap-настройку TypeScript, ESLint, Prettier, Vitest,
React Testing Library, Tailwind CSS 4 и базовые UI primitives: `Button`,
`Input`, `Label`, `Card`, `Badge`, `Skeleton`, `Separator`, `Checkbox`.
