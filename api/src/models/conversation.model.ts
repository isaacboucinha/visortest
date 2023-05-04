import mongoose, { Schema } from "mongoose";
import type { Model, Document } from "mongoose";

import type { IUser } from "../types/user.type";
import type { IMessage } from "../types/message.type";

// declare conversation document type
interface IConversationDocument extends Document {
  user: IUser;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  messages: IMessage[];
}

type ConversationModel = Model<IConversationDocument, unknown, unknown>;

// define conversation schema
const conversationSchema: Schema = new Schema<
  IConversationDocument,
  ConversationModel
>(
  {
    user: {
      ref: "User",
      type: Schema.Types.ObjectId
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { toJSON: { virtuals: true }, timestamps: true }
);

conversationSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "conversation"
});

/**
 * Conversation model type
 *
 * @const Conversation
 */
export const Conversation = mongoose.model<
  IConversationDocument,
  ConversationModel
>("Conversation", conversationSchema);
