// @ts-nocheck
import { createClient, OAuthStrategy } from '@wix/sdk';
import { members } from '@wix/members';

console.log("Keys in members:", Object.keys(members));

const wixClient = createClient({
  modules: { members },
  auth: OAuthStrategy({ clientId: '284f11f5-6396-425f-b97e-1cb86c3c50c8' })
});

console.log("Keys in wixClient.auth:", Object.keys(wixClient.auth));
console.log("Keys in wixClient.members:", Object.keys(wixClient.modules.members));

