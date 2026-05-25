import { createClient, OAuthStrategy } from '@wix/sdk';

const wixClient = createClient({
  modules: {},
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || 'test' })
});

console.log(Object.keys(wixClient.auth));
