import type { IConversation } from "./conversation.type";

/**
 * Message model base type
 *
 * @interface IMessage
 */
export interface IMessage {
  // eslint-disable-next-line
  id?: any;
  conversation?: IConversation;
  role: "system" | "user" | "assistant";
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
