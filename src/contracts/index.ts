export const SHOP_EVENTS = {
  cartChanged: "shop:cart-changed",
  accountChanged: "shop:account-changed",
  favoritesChanged: "shop:favorites-changed",
  authChanged: "shop:auth-changed",
} as const;

export type ShopEventName = (typeof SHOP_EVENTS)[keyof typeof SHOP_EVENTS];

export interface CartChangedDetail {
  itemCount: number;
  totalCents: number;
}

export interface AccountChangedDetail {
  userId: string | null;
}

export interface FavoritesChangedDetail {
  productId: string;
  isFavorite: boolean;
}

export interface AuthChangedDetail {
  isAuthenticated: boolean;
}
