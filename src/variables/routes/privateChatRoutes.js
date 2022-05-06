const { routeGenerator } = require("@/functions/utilities/generators");
const {
  versionCalculator,
  extractVersions,
  extractFromInfo,
} = require("@/functions/utilities/utilsNoDeps");

const privateChatRouteBaseUrl = routeGenerator(
  true,
  "/chat/privateChat",
  true,
  "1.0.0",
  ""
);

const getAllChatsRoute = routeGenerator(
  "get",
  "/getAllPrivateChats",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const chatsLastMessageRoute = routeGenerator(
  "post",
  "/privateChatsLastMessages",
  200,
  "1.0.0",
  "Use for Get chats last message"
);

const getMessagesRoute = routeGenerator(
  "post",
  "/getPrivateMessages",
  200,
  "1.0.0",
  "Use for get all messages"
);

const startChatRoute = routeGenerator(
  "post",
  "/startNewPrivateChat",
  200,
  "1.0.0",
  "Use for Start new chat"
);

const sendMessageRoute = routeGenerator(
  "post",
  "/sendPrivateMessage",
  200,
  "1.0.0",
  "Use for send private messages"
);

const routes = {
  privateChatRouteBaseUrl,
  chatsLastMessageRoute,
  getAllChatsRoute,
  getMessagesRoute,
  sendMessageRoute,
  startChatRoute,
};

const privateChatRoutes = {
  info: {
    version: versionCalculator(extractVersions(extractFromInfo(routes))),
  },

  properties: routes,
};

module.exports = {
  privateChatRoutes,
};
