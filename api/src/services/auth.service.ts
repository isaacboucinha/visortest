// import Debug from "debug";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { User } from "../models/user.model";
import type { IUser } from "../types/user.type";
import type { IAuth } from "../types/auth.type";

import { getUserByEmail } from "../services/user.service";

// const debug = Debug("app:services:user");

export const accessTokenSecret =
  process.env.ACCESS_TOKEN_SECRET ?? crypto.randomBytes(64).toString("hex");
export const refreshTokenSecret =
  process.env.REFRESH_TOKEN_SECRET ?? crypto.randomBytes(64).toString("hex");

const generateAccessToken = (userEmail: string): string => {
  return jwt.sign(
    {
      user: {
        email: userEmail
      }
    },
    accessTokenSecret,
    { expiresIn: "30m" }
  );
};

const generateRefreshToken = (userEmail: string): string => {
  return jwt.sign(
    {
      user: {
        email: userEmail
      }
    },
    refreshTokenSecret,
    { expiresIn: "30d" }
  );
};

export async function loginUser(user: IUser): Promise<IAuth | null> {
  if (user.password === undefined || user.email === undefined) return null;

  const existingUser = await getUserByEmail(user.email);

  if (existingUser?.active === true && existingUser?.password !== undefined) {
    const passwordsMatch = await bcrypt.compare(
      user.password,
      existingUser.password
    );

    if (passwordsMatch) {
      return {
        accessToken: generateAccessToken(user.email),
        refreshToken: generateRefreshToken(user.email)
      };
    }
  }

  return null;
}

export async function refreshToken(
  refreshToken: string
): Promise<IAuth | null> {
  // TODO verify method can be called asynchronously by specifying a callback function
  const payload = jwt.verify(refreshToken, refreshTokenSecret);

  if (typeof payload !== "string" && payload?.email !== undefined) {
    const existingUser = await User.findOne({ email: payload.email });
    if (existingUser === null) return null;
    return {
      accessToken: generateAccessToken(existingUser.email)
    };
  } else {
    return null;
  }
}

export async function createUser(user: IUser): Promise<IUser> {
  const newUser = new User(user);
  newUser.password = await bcrypt.hash(newUser.password, 12);
  return await newUser.save();
}
