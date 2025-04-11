import { API, graphqlOperation } from 'aws-amplify';
import { listFormEntries } from '@/graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { ListFormEntriesQuery } from '@/API';

export type FormEntry = {
  id: string;
  name: string;
  email: string;
  message: string;
};

export const fetchFormEntries = async (): Promise<FormEntry[]> => {
  try {
    const response = await API.graphql(graphqlOperation(listFormEntries));
    const result = response as GraphQLResult<ListFormEntriesQuery>;
    const items = result.data?.listFormEntries?.items;

    return (items?.filter(Boolean) ?? []) as FormEntry[];
  } catch (error) {
    console.error('フォームデータの取得に失敗:', error);
    throw error;
  }
};
