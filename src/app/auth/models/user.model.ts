export interface UserProfile {
  id: string;
  username: string;
  password: string;
  role?: string | 'ADMIN';
  avatarUrl?: string;
}
