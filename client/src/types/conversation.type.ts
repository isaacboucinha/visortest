import type Message from './message.type';

export default interface Conversation {
  id?: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}
