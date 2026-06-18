import {
  dispatchShopEvent,
  SHOP_BROADCAST_CHANNELS,
  SHOP_EVENTS,
  subscribeShopEvent,
  type CartChangedDetail,
  type ShopBroadcastChannelName,
  type ShopEventName,
} from "./index";

describe("shop contracts", () => {
  it("keeps stable event names", () => {
    expect(SHOP_EVENTS).toEqual({
      cartChanged: "shop:cart-changed",
      accountChanged: "shop:account-changed",
      favoritesChanged: "shop:favorites-changed",
      authChanged: "shop:auth-changed",
    });
  });

  it("keeps stable broadcast channel names", () => {
    expect(SHOP_BROADCAST_CHANNELS).toEqual({
      cart: "shop:cart",
      account: "shop:account",
      favorites: "shop:favorites",
      auth: "shop:auth",
    });
  });

  it("dispatches and subscribes to typed custom events", () => {
    const target = new EventTarget();
    const events: CartChangedDetail[] = [];

    const unsubscribe = subscribeShopEvent(
      SHOP_EVENTS.cartChanged,
      (event) => {
        events.push(event.detail);
      },
      { target },
    );

    const dispatched = dispatchShopEvent(
      SHOP_EVENTS.cartChanged,
      {
        itemCount: 2,
        totalCents: 159_800,
      },
      target,
    );

    unsubscribe();
    dispatchShopEvent(SHOP_EVENTS.cartChanged, { itemCount: 3 }, target);

    expect(dispatched).toBe(true);
    expect(events).toEqual([{ itemCount: 2, totalCents: 159_800 }]);
  });

  it("exports reusable event and channel union types", () => {
    const eventName: ShopEventName = SHOP_EVENTS.authChanged;
    const channelName: ShopBroadcastChannelName = SHOP_BROADCAST_CHANNELS.auth;

    expect(eventName).toBe("shop:auth-changed");
    expect(channelName).toBe("shop:auth");
  });
});
