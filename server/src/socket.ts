import { Server, Socket } from 'socket.io';
import { saveMessage } from "./models/message";
import { updateLastRead } from './models/channelUser';

export function setupSocket(io: Server) {
  io.on('connection', (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('joinChannel', ({ channelId, userId }) => {
      const room = `channel_${channelId}`;
      socket.join(room);
      updateLastRead(userId, channelId);
      console.log(`User ${userId} joined ${room}`);
    });

    socket.on('sendMessage', async ({ channelId, userId, content }) => {
      const message = await saveMessage(channelId, userId, content);
      io.to(`channel_${channelId}`).emit('newMessage', message);
    });

    socket.on('markRead', ({ channelId, userId }) => {
      updateLastRead(userId, channelId);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
