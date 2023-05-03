// import Debug from "debug";

import { Conversation } from "../models/conversation.model";
import type { IConversation } from "../types/conversation.type";

// const debug = Debug("app:services:conversation");

export async function getConversation(
  conversationId: string
): Promise<IConversation | null> {
  return await Conversation.findById(conversationId);
}

export async function createConversation(
  conversation: IConversation
): Promise<IConversation> {
  const createdConversation = new Conversation(conversation);

  return await createdConversation.save();
}

export async function createConversationForUser(
  userId: string
): Promise<IConversation> {
  const createdConversation = new Conversation({ user: userId });
  return await createdConversation.save();
}
