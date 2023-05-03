import type { IUser } from "./user.type";

/**
 * Conversation model base type
 *
 * @interface IConversation
 */
export interface IConversation {
  // eslint-disable-next-line
  id?: any;
  user: IUser;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
