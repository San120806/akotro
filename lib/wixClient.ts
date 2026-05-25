import { createClient, OAuthStrategy } from '@wix/sdk';
import { products, collections } from '@wix/stores';
import { currentCart } from '@wix/ecom';
import { authentication } from '@wix/members';

const wixClientId = process.env.NEXT_PUBLIC_WIX_CLIENT_ID || '';

// Returns a fresh Wix client, reading cookies only in the browser.
// This avoids the "document is not defined" crash during SSR.
function getWixClient() {
  let tokens: any = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = document.cookie
        .split('; ')
        .find((row) => row.startsWith('session='))
        ?.split('=')[1];
      if (raw) tokens = JSON.parse(decodeURIComponent(raw));
    } catch (_) {}
  }

  return createClient({
    modules: {
      products,
      collections,
      currentCart,
      authentication,
    },
    auth: OAuthStrategy({
      clientId: wixClientId,
      // Only pass tokens when they contain a valid session (has refreshToken)
      // Passing an empty object causes loggedIn() to crash reading undefined.role
      tokens: (tokens as any)?.refreshToken ? tokens : undefined,
    }),
  });
}

// Lazy singleton — created once, only after the module is first used in the browser.
let _client: ReturnType<typeof getWixClient> | null = null;

export const myWixClient = new Proxy({} as ReturnType<typeof getWixClient>, {
  get(_target, prop) {
    if (!_client) {
      _client = getWixClient();
    }
    return (_client as any)[prop];
  },
});
