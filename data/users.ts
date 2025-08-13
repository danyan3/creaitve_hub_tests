export type User = { username: string; password: string };

export const users: Record<'default', User> = {
  default: { username: 'user@example.com', password: 'password' },
}; 