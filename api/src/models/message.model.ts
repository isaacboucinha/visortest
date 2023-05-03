import mongoose, { Schema } from "mongoose";
import type { Model, Document } from "mongoose";

import type { IMessage } from "../types/message.type";
import type { IConversation } from "../types/conversation.type";

// declare message document type
interface IMessageDocument extends Document, IMessage {
  conversation: IConversation;
  role: "user" | "system" | "assistant";
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type MessageModel = Model<IMessageDocument, unknown, unknown>;

// define message schema
const messageSchema: Schema = new Schema<IMessageDocument, MessageModel>(
  {
    conversation: {
      ref: "Conversation",
      type: Schema.Types.ObjectId,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

/**
 * Message model type
 *
 * @const Message
 */
export const Message = mongoose.model<IMessageDocument, MessageModel>(
  "Message",
  messageSchema
);
