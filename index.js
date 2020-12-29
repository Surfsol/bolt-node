const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
  signingSecret: process.env.SIGNING_SECRET,
  token: process.env.TOKEN
});

/* Add functionality here */

(async () => {
  // Start the app
  await app.start(process.env.PORT || 3000);
 
  console.log('⚡️ Bolt app is running!');
})();