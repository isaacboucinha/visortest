import Axios from 'axios';

import type User from '@/types/user.type';
import type Conversation from '@/types/conversation.type';

// this class defines the base axios client for the API

const userEndpoint = 'users';
const authEndpoint = 'auth';
const conversationEndpoint = 'conversations';
const promptEndpoint = 'prompt';

const urls = {
  test: 'http://localhost:8000/',
  development: 'http://localhost:8000/',
  production: process.env.API_URL
};
const client = Axios.create({
  baseURL: urls[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

// will return user if user is logged in
export async function getCurrentUser(): Promise<User | null> {
  let response;
  try {
    response = await client.get(`${userEndpoint}/me`, {
      withCredentials: true
    });
  } catch (error) {
    response = undefined;
  }

  if (
    response !== undefined &&
    response.status === 200 &&
    response.data !== undefined
  ) {
    const user: User = response.data;
    return user;
  }

  return null;
}

// TODO next 2 funcs both need a rewrite
// logs in user
export async function loginUser(
  email: string,
  password: string
): Promise<User | null> {
  const response = await client.post(
    authEndpoint,
    JSON.stringify({ email, password }),
    { withCredentials: true }
  );

  if (response?.status === 200) {
    return await getCurrentUser();
  }

  return null;
}

// creates a new user
export async function signupUser(user: User): Promise<User | null> {
  const response = await client.post(userEndpoint, JSON.stringify(user), {
    withCredentials: true
  });

  if (response?.status === 201) {
    return await loginUser(user.email ?? '', user.password ?? '');
  }

  return null;
}

// logs out current user
export async function logoutUser(): Promise<boolean> {
  let response;
  try {
    response = await client.get(`${authEndpoint}/logout`, {
      withCredentials: true
    });
  } catch (error) {
    response = undefined;
    return false;
  }
  // TODO better response handling
  return response?.status === 200;
}

// gets user conversations
export async function getConversations(): Promise<Conversation[]> {
  let response;
  try {
    response = await client.get(`${conversationEndpoint}`, {
      withCredentials: true
    });
  } catch (error) {
    response = undefined;
    return [];
  }

  // TODO better response handling
  if (response?.status === 200) {
    return response.data;
  }
  return [];
}

// sends a message to the API
export async function sendMessage(
  content: string,
  conversation: Conversation | null
): Promise<{ content: string; conversationId: string } | null> {
  if (content === '') return null;

  let requestBody;
  if (conversation === null) {
    requestBody = { content };
  } else {
    requestBody = { content, conversationId: conversation.id };
  }

  let response;
  try {
    response = await client.post(`${promptEndpoint}`, requestBody, {
      withCredentials: true
    });
  } catch (error) {
    return null;
  }

  if (response?.status === 200) {
    return response.data;
  }

  // TODO better response handling
  return null;
}
