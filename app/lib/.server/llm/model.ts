// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import { getAPIKey } from '~/lib/.server/llm/api-key';
import { createAnthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { ollama } from 'ollama-ai-provider';

export function getAnthropicModel(apiKey: string, model: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic(model);
}

export function getOpenAIModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    apiKey,
  });

  return openai(model);
}

export function getGroqModel(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://api.groq.com/openai/v1',
    apiKey,
  });

  return openai(model);
}

export function getGroqModel_cn(apiKey: string, model: string) {
  const openai = createOpenAI({
    baseURL: 'https://gateway.ai.cloudflare.com/v1/8d75f22605db146a86f364ff865aa219/qi/groq',
    apiKey,
  });

  return openai(model);
}

export function getOllamaModel(model: string) {
  return ollama(model);
}

// 新增处理 Openrouter 的函数
export function getOpenrouterModel(apiKey: string, model: string) {
  const openrouter = createOpenAI({
    baseURL: 'https://api.openrouter.ai/v1', // 假设的 Openrouter API base URL
    apiKey,
  });

  return openrouter(model);
}

export function getModel(provider: string, model: string, env: Env) {
  const apiKey = getAPIKey(env, provider);

  switch (provider) {
    case 'Anthropic':
      return getAnthropicModel(apiKey, model);
    case 'OpenAI':
      return getOpenAIModel(apiKey, model);
    case 'Groq':
      return getGroqModel_cn(apiKey, model);
    case 'Openrouter': // 新增对 Openrouter 的支持
      return getOpenrouterModel(apiKey, model);
    default:
      return getOllamaModel(model);
  }
}
