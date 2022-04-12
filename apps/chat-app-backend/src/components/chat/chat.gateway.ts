import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway(5000, {
  namespace: 'chat',
  cors: { origin: '*', allowedHeaders: '*' },
})
export class ChatGateway {}
