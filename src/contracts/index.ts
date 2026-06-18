export const SHOP_EVENTS = {
  cartChanged: "shop:cart-changed",
  accountChanged: "shop:account-changed",
  favoritesChanged: "shop:favorites-changed",
  authChanged: "shop:auth-changed",
} as const;

export const SHOP_BROADCAST_CHANNELS = {
  cart: "shop:cart",
  account: "shop:account",
  favorites: "shop:favorites",
  auth: "shop:auth",
} as const;

export type ShopEventName = (typeof SHOP_EVENTS)[keyof typeof SHOP_EVENTS];
export type ShopBroadcastChannelName =
  (typeof SHOP_BROADCAST_CHANNELS)[keyof typeof SHOP_BROADCAST_CHANNELS];

export interface CartChangedDetail {
  itemCount?: number;
  totalCents?: number;
}

export interface AccountChangedDetail {
  userId: string | null;
  email?: string;
  name?: string | null;
}

export interface FavoritesChangedDetail {
  productId: string;
  isFavorite: boolean;
}

export interface AuthChangedDetail {
  isAuthenticated: boolean;
  userId?: string | null;
}

export interface ShopEventDetailMap {
  [SHOP_EVENTS.cartChanged]: CartChangedDetail;
  [SHOP_EVENTS.accountChanged]: AccountChangedDetail;
  [SHOP_EVENTS.favoritesChanged]: FavoritesChangedDetail;
  [SHOP_EVENTS.authChanged]: AuthChangedDetail;
}

export type ShopEventDetail<Name extends ShopEventName> = ShopEventDetailMap[Name];
export type ShopCustomEvent<Name extends ShopEventName> = CustomEvent<ShopEventDetail<Name>>;
export type ShopEventListener<Name extends ShopEventName> = (
  event: ShopCustomEvent<Name>,
) => void;

export interface ShopEventTargetOptions {
  target?: EventTarget;
  signal?: AbortSignal;
}

function resolveEventTarget(target?: EventTarget): EventTarget | null {
  if (target) {
    return target;
  }

  if (typeof window === "undefined") {
    return null;
  }

  return window;
}

export function dispatchShopEvent<Name extends ShopEventName>(
  name: Name,
  detail: ShopEventDetail<Name>,
  target?: EventTarget,
): boolean {
  const eventTarget = resolveEventTarget(target);

  if (!eventTarget) {
    return false;
  }

  return eventTarget.dispatchEvent(new CustomEvent(name, { detail }));
}

export function subscribeShopEvent<Name extends ShopEventName>(
  name: Name,
  listener: ShopEventListener<Name>,
  options: ShopEventTargetOptions = {},
): () => void {
  const eventTarget = resolveEventTarget(options.target);

  if (!eventTarget) {
    return () => {};
  }

  const eventListener: EventListener = (event) => {
    listener(event as ShopCustomEvent<Name>);
  };

  eventTarget.addEventListener(name, eventListener, { signal: options.signal });

  return () => {
    eventTarget.removeEventListener(name, eventListener);
  };
}
