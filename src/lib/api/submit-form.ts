import { API } from 'aws-amplify';
import { createFormEntry } from '@/graphql/mutations';

export type FormData = {
  name: string;
  email: string;
  message: string;
};

export const submitFormEntry = async (formData: FormData): Promise<void> => {
  try {
    await API.graphql({
      query: createFormEntry,
      variables: { input: formData },
      authMode: 'AMAZON_COGNITO_USER_POOLS',
    });
  } catch (error) {
    console.error('フォーム送信エラー:', error);
    throw error;
  }
};
