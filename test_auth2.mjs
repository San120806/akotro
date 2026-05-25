import { createClient, OAuthStrategy } from '@wix/sdk';
import { authentication } from '@wix/members';

const wixClient = createClient({
  modules: { authentication },
  auth: OAuthStrategy({ clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID || 'test' })
});

console.log(wixClient.auth.getMemberTokens.toString());
