export default interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  createdAt: string;
  updatedAt: string;
}
