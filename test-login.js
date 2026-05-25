import { createClient, OAuthStrategy } from '@wix/sdk';
import { authentication } from '@wix/members';

const wixClient = createClient({
  modules: { authentication },
  auth: OAuthStrategy({ clientId: '284f11f5-6396-425f-b97e-1cb86c3c50c8' })
});

async function run() {
  const visitorTokens = await wixClient.auth.generateVisitorTokens();
  wixClient.auth.setTokens(visitorTokens);
  try {
    const res = await wixClient.authentication.login('sania@gmail.com', 'sania1234');
    console.log(JSON.stringify(res, null, 2));
  } catch (e) {
    console.log("Error:", e.message);
  }
}
run();
