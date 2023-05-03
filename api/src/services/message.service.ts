// import Debug from "debug";

import { Message } from "../models/message.model";
import type { IMessage } from "../types/message.type";

// const debug = Debug("app:services:message");

export async function getAllMessages(): Promise<IMessage[]> {
  return await Message.find();
}

export async function getMessage(messageId: string): Promise<IMessage | null> {
  return await Message.findById(messageId);
}

export async function getConversationMessages(
  conversationId: string
): Promise<IMessage[]> {
  return await Message.find({ conversation: conversationId });
}

export async function createMessage(message: IMessage): Promise<IMessage> {
  const createdMessage = new Message(message);
  return await createdMessage.save();
}
