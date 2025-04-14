import { API, graphqlOperation } from 'aws-amplify';
import { deleteFormEntry as deleteFormEntryById} from '@/graphql/mutations';

export async function deleteFormEntry(id: string): Promise<void> {
  try {
    await API.graphql(
      graphqlOperation(deleteFormEntryById, { input: { id } })
    );
  } catch (error) {
    console.error('フォーム削除失敗:', error);
    throw error;
  }
}
