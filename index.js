const { WebClient, LogLevel } = require("@slack/web-api");
const { createEventAdapter } = require("@slack/events-api");
require("dotenv").config();

const slackSigningSecret = process.env.SIGNING_SECRET;
const slackToken = process.env.TOKEN;
const port = process.env.PORT || 4390;

const slackEvents = createEventAdapter("053fab21a7e356d09a1d928887934da9");
const slackClient = new WebClient(slackToken);

const url = "https://github.com";

const blockData = [
  {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `Fork this url ${url}.`,
    },
  
    type: "input",
    block_id: "input123",
    label: {
      type: "plain_text",
      "text": "Label of input"
    },
    element: {
      type: "plain_text_input",
      "action_id": "plain_input",
      "placeholder": {
        type: "plain_text",
        "text": "Enter some plain text"
      }
    }
}
];

slackEvents.on("app_mention", (event) => {
  console.log(event);
  console.log(`Got message from user ${event}: ${event.text}`);
  let messageText = event.text.split(" ")[0];
  if (messageText === "data") {
    // const channelId = "C12345";

    // try {
    //   // Call the chat.postMessage method using the WebClient
    //   const result = await client.chat.postMessage({
    //     channel: channelId,
    //     text: "Hello world"
    //   });

    //   console.log(result);
    // }
    // catch (error) {
    //   console.error(error);
    // }
    (async () => {
      try {
        await slackClient.chat.postMessage({
          channel: event.channel,
          text: `Hello <@${event.user}>! :tada:`,
        });
      } catch (error) {
        console.log(error.data);
      }
    })();
  } else {
    (async () => {
      try {
        await slackClient.chat.postMessage({
          channel: event.channel,
          text: `Hello <@${event.user}>! :tada:`,
        });
      } catch (error) {
        console.log(error.data);
      }
    })();
  }
});

slackEvents.on("error", console.error);

slackEvents.start(port).then(() => {
  console.log(`Server started on port ${port}`);
});
