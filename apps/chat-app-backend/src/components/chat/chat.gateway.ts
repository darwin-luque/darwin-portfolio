import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  namespace: 'chat',
  cors: { origin: '*', allowedHeaders: '*' },
})
export class ChatGateway {
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    console.log(payload);
  }
}
