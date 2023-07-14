/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */

const io = require('socket.io-client');
const socket = io('http://localhost:3000');

const addListener = (name, socket) => {
  socket.on(name, (data) => console.log({ name, data }));
};
addListener('name', socket);
addListener('test', socket);
addListener('dynamic', socket);
addListener('question', socket);

socket.on('closed', () => socket.disconnect());