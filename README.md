# Socket.IO_chat


### Intro

This a multi-room chat server using Node.JS and Socket.IO. This chat service contains the main lobby where users sign on with a nickname and can communicate with each other.
On the left bar, the user can create or join a public room once you enter the name, and you can create or join a private room with the password. The user, which is the room creator, may kick another user temporarily or permanently. The user can also send a private message to another user who is in the same room. There is also a User Activity part which will show the global activities of the whole chatroom server.
On the center, a user can send messages or local images to the current room.
On the right bar, the user can see the room currently in, all the user in the same room, and all the public rooms and private rooms.

### Project

Run the following codes to install the dependencies inside the chatroom server folder if needed.

```sh
$ npm install
```

Then do

```sh
$ node chat_server.js
```
to set the Node.js server online.

You could connect to the server on port:3456.

### Creative Portion

- 1 When user disconnected from a chatroom, a message will be showed on the chatlog.
- 2 Private messages will be highlighted in shallow red.
- 3 User can send local images to the chat.

### Note

If user click "cancel" when asked to enter a username, a random string will be assigned as a username.
When user trying to join a room that is not been created, the room will be created automatically at that point for user's convenience.
