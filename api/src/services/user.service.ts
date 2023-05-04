// import Debug from "debug";
import bcrypt from "bcrypt";

import { User } from "../models/user.model";
import type { IUser } from "../types/user.type";

// const debug = Debug("app:services:user");

export async function getAllUsers(): Promise<IUser[]> {
  return await User.find().select("-password");
}

export async function getUser(userId: string): Promise<IUser | null> {
  return await User.findById(userId).select("-password");
}

export async function getUserByEmail(
  userEmail: string,
  includePassword = false
): Promise<IUser | null> {
  if (includePassword) {
    return await User.findOne({ email: userEmail });
  }

  return await User.findOne({ email: userEmail }).select("-password");
}

export async function createUser(user: IUser): Promise<IUser> {
  const newUser = new User(user);
  newUser.password = await bcrypt.hash(newUser.password, 12);
  return await newUser.save();
}
