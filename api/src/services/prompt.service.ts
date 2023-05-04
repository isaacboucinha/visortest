import {
  OpenAIApi,
  Configuration,
  ChatCompletionRequestMessageRoleEnum
} from "openai";
import Debug from "debug";

import type { IUser } from "../types/user.type";
import type { IMessage } from "../types/message.type";

import type { IPrompt } from "../types/prompt.type";

import * as MessageService from "../services/message.service";
import * as ConversationService from "../services/conversation.service";

const debug = Debug("app:services:openai");
const modelId = "gpt-3.5-turbo"; // ChatGPT-3 model id
const userRole = ChatCompletionRequestMessageRoleEnum.User;

debug(`Read OPENAI_API_KEY=${process.env.OPENAI_API_KEY ?? "error"}`);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

// OpenAI API client initialization
debug("Will initialize OpenAI client");
const openai = new OpenAIApi(configuration);

export async function getResponseForPrompt(
  user: IUser,
  prompt: IPrompt
): Promise<IPrompt> {
  let conversation;

  // fetch specified conversation, or create a new one
  if (prompt.conversationId !== undefined) {
    conversation = await ConversationService.getConversation(
      prompt.conversationId
    );
  } else {
    conversation = await ConversationService.createConversationForUser(user.id);
  }

  if (conversation == null) {
    throw Error("Couldn't find or create conversation");
  }

  // search and gather previous messages in the context of the specified
  // conversation to send to OpenAI, if applicable
  const pastMessages = await MessageService.getConversationMessages(
    conversation.id
  );

  // will include both prompts from user and OpenAI bot
  const conversationMessages = pastMessages.map((message) => ({
    role: message.role,
    content: message.content
  }));

  // also add current user prompt
  conversationMessages.push({
    content: prompt.content,
    role: userRole
  });

  // request a new bot prompt based on all previous messages
  const chatResponse = await openai.createChatCompletion({
    model: modelId,
    messages: conversationMessages
  });

  // check bot response
  if (chatResponse !== undefined) {
    const choices = chatResponse.data.choices;

    if (choices !== undefined) {
      const answer = choices.shift();
      if (answer?.message?.content !== undefined) {
        // response looks good, so save both the user and bot messages
        const content = answer.message.content;
        const role = answer.message.role;
        const newBotMessage: IMessage = { conversation, content, role };
        const newUserMessage: IMessage = {
          conversation,
          content: prompt.content,
          role: userRole
        };

        await MessageService.createMessage(newUserMessage);
        await MessageService.createMessage(newBotMessage);

        // send back a response prompt
        return { content, conversationId: conversation.id };
      }
    }
  }

  throw Error("OpenAI API couldn't be parsed");
}
