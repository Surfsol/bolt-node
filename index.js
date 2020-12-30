const { WebClient } = require('@slack/web-api');
const { createEventAdapter } = require('@slack/events-api');
require('dotenv').config()

const slackSigningSecret = process.env.SIGNING_SECRET;
const slackToken = process.env.TOKEN;
const port = process.env.PORT || 3001;

const slackEvents = createEventAdapter(slackSigningSecret);
const slackClient = new WebClient(slackToken);

slackEvents.on('app_mention', (event) => {
  console.log(`Got message from user ${event.user}: ${event.text}`);
  (async () => {
    try {
      await slackClient.chat.postMessage({ channel: event.channel, text: `Hello <@${event.user}>! :tada:` })
    } catch (error) {
      console.log(error.data)
    }
  })();
});

slackEvents.on('error', console.error);

slackEvents.start(port).then(() => {
  console.log(`Server started on port ${port}`)
});