import mongoose, { Schema } from "mongoose";
import type { Model, Document } from "mongoose";

import type { IUser } from "../types/user.type";

// declare conversation document type
interface IConversationDocument extends Document {
  user: IUser;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
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
  { timestamps: true }
);

/**
 * Conversation model type
 *
 * @const Conversation
 */
export const Conversation = mongoose.model<
  IConversationDocument,
  ConversationModel
>("Conversation", conversationSchema);
