import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom') // Mensaje de suscripción para unirse a una sala
  handleJoinRoom(client: Socket, room: string): void {
    client.join(room);
    console.log(`Cliente ${client.id} se ha unido a la sala ${room}`);
  }

  @SubscribeMessage('leaveRoom') // Mensaje de suscripción para abandonar una sala
  handleLeaveRoom(client: Socket, room: string): void {
    client.leave(room);
    console.log(`Cliente ${client.id} ha abandonado la sala ${room}`);
  }

  @SubscribeMessage('Nueva oferta')
  handleMessage(client: Socket, payload: any): string {
    this.server.to('subasta').emit('event', payload);
    console.log(payload);
    return 'Hello world!';
  }
}
