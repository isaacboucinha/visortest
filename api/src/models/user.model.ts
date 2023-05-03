import mongoose, { Schema } from "mongoose";
import type { Model, Document } from "mongoose";

import type { IUser } from "../types/user.type";

// define user document
interface IUserDocument extends Document, IUser {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface IUserDocumentMethods {
  fullName: () => string;
}

type UserModel = Model<IUserDocument, unknown, IUserDocumentMethods>;

// define user schema
const userSchema: Schema = new Schema<
  IUserDocument,
  UserModel,
  IUserDocumentMethods
>(
  {
    firstName: {
      type: String,
      lowercase: true,
      required: [true, "Can't be blank"]
    },
    lastName: {
      type: String,
      lowercase: true,
      required: [true, "Can't be blank"]
    },
    password: {
      type: String,
      required: true,
      minlength: [8, "Please use minimum of 8 characters"]
    },
    email: {
      type: String,
      lowercase: true,
      required: [true, "Can't be blank"],
      match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please use a valid address"],
      unique: true,
      index: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

// define schema instance methods
userSchema.method("fullName", function fullName(this: IUserDocument) {
  return `${this.firstName} ${this.lastName}`;
});

/**
 * User model type
 *
 * @const User
 */
export const User = mongoose.model<IUserDocument, UserModel>(
  "User",
  userSchema
);
