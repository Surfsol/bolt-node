const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
  signingSecret: process.env.SIGNING_SECRET,
  token: process.env.TOKEN
});

/* Add functionality here */

(async () => {
  // Start the app
  try {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
  }catch(err){
      console.log(err)
  }
})();

// Listens to incoming messages that contain "goodbye"
app.message('goodbye', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`See ya later, <@${message.user}> :wave:`);
  });