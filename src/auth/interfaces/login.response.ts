export interface LoginResponse {
  userId: number;
  username: string;
  role: string | undefined;
  token: string;
}
