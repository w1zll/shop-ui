# Shop UI

`@w1zll/shop-ui` — общий приватный UI-пакет для интернет-магазина.

Пакет содержит:

- shadcn-compatible React-компоненты;
- CSS variables и design tokens;
- утилиту `cn`;
- контракты браузерных событий;
- CSS entrypoint `@w1zll/shop-ui/styles.css`.

## Установка

Пакет публикуется вручную в GitHub Packages. Для установки в consumer-проектах
нужно настроить `.npmrc`:

```ini
@w1zll:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NPM_TOKEN}
```

`NPM_TOKEN` хранится в локальном окружении или в секретах CI.

После публикации конкретной версии consumer фиксирует её явно:

```json
{
  "dependencies": {
    "@w1zll/shop-ui": "0.2.2"
  }
}
```

## Импорты

```ts
import { Button, Price, RemoteErrorFallback, cn } from "@w1zll/shop-ui";
import {
  dispatchShopEvent,
  SHOP_BROADCAST_CHANNELS,
  SHOP_EVENTS,
  subscribeShopEvent,
} from "@w1zll/shop-ui/contracts";
import "@w1zll/shop-ui/styles.css";
```

## Contracts

`@w1zll/shop-ui/contracts` содержит стабильные имена браузерных событий,
payload-типы, имена `BroadcastChannel` и маленькие type-safe helpers:

```ts
import {
  dispatchShopEvent,
  SHOP_EVENTS,
  subscribeShopEvent,
} from "@w1zll/shop-ui/contracts";

const unsubscribe = subscribeShopEvent(SHOP_EVENTS.cartChanged, (event) => {
  console.log(event.detail.itemCount);
});

dispatchShopEvent(SHOP_EVENTS.cartChanged, {
  itemCount: 2,
  totalCents: 159_800,
});

unsubscribe();
```

События используются только как транспорт между микрофронтендами. Источником
истины для корзины, пользователя, избранного и заказов остаётся API.

## Tailwind CSS 4

Consumer-приложение подключает стили пакета и разрешает Tailwind сканировать
собранные классы:

```css
@import "tailwindcss";
@import "@w1zll/shop-ui/styles.css";
@source "../node_modules/@w1zll/shop-ui/dist";
```

Конкретный относительный путь для `@source` проверяется отдельно в каждом
consumer-репозитории.

## Локальная разработка

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm pack:dry-run
```

## Публикация

Публикацию выполняет разработчик вручную:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm pack --dry-run
pnpm publish
```

## Компоненты

UI primitives:

```text
Avatar
Badge
Button
Card
Checkbox
Dialog
DropdownMenu
Input
Label
Select
Separator
Sheet
Skeleton
Sonner
```

Shared components:

```text
Logo
Container
Price
EmptyState
ErrorState
LoadingState
RemoteErrorFallback
```

## Versioning

Пакет использует SemVer:

- `patch` — исправление без изменения публичного API;
- `minor` — новый компонент или новый обратно совместимый prop;
- `major` — несовместимое изменение API.

Consumer-приложения не должны использовать `latest` в production build.
