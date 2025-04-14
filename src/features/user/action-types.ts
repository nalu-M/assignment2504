// types.ts
import { CognitoUser } from 'amazon-cognito-identity-js';
import { UserAttributes } from '@/features/user/user-state';

export type Action =
  | { type: 'SET_USER'; payload: { user: CognitoUser; attributes: UserAttributes } }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGOUT' };
