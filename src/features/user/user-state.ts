// UserState.ts
import { CognitoUser } from 'amazon-cognito-identity-js';

export type UserAttributes = {
  sub: string;
  email: string;
  email_verified?: boolean;
  [key: string]: unknown;
};

export type UserState = {
  user: CognitoUser | null;
  attributes: UserAttributes | null;
  error: string | null;
  loading: boolean;
};

export const initialState: UserState = {
  user: null,
  attributes: null,
  error: null,
  loading: true,
};
