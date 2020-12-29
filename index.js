const { App } = require('@slack/bolt');
require('dotenv').config()

const app = new App({
  signingSecret: process.env.SIGNING_SECRET,
  token: process.env.TOKEN
});

// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Hey there <@${message.user}>!`
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Click Me"
            },
            "action_id": "button_click"
          }
        }
      ],
      text: `Hey there <@${message.user}>!`
    });
  });
  
  app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
  });

// Listens to incoming messages that contain "goodbye"
app.message('goodbye', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`See ya later, <@${message.user}> :wave:`);
  });

(async () => {
  // Start the app
  try {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
  }catch(err){
      console.log(err)
  }
})();

