// userReducer.ts
import { UserState, initialState } from '@/features/user/user-state';
import { Action } from '@/features/user/action-types';

export function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user,
        attributes: action.payload.attributes,
        error: null,
        loading: false,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    default:
      return state;
  }
}
