export interface JwtPayload {
  sub: string;
  email: string;
  aud: 'access' | 'refresh';
  tokenId?: string;
}