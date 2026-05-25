import { createClient, OAuthStrategy } from '@wix/sdk';
import { products } from '@wix/stores';
const wixClient = createClient({
  modules: { products },
  auth: OAuthStrategy({ clientId: '284f11f5-6396-425f-b97e-1cb86c3c50c8' })
});
async function get() {
  const res = await wixClient.products.queryProducts().limit(1).find();
  console.log(JSON.stringify(res.items[0], null, 2));
}
get();
