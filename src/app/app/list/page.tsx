// app/form/list.tsx
'use client';

import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { listFormEntries } from '@/graphql/queries';
import { ListFormEntriesQuery } from '@/API';

type FormEntry = {
    id: string;
    name: string;
    email: string;
    message: string;
  };
  

export default function FormListPage() {
  const [entries, setEntries] = useState<FormEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.graphql(
          graphqlOperation(listFormEntries)
        );

        const result = response as GraphQLResult<ListFormEntriesQuery>;
        const items = result.data?.listFormEntries?.items;

        if (items) {
          setEntries(items as FormEntry[]);
        }
      } catch (error) {
          console.error('データ取得失敗:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">送信されたフォーム一覧</h1>
      {entries.length === 0 ? (
        <p>まだ送信されたデータがありません。</p>
      ) : (
        <ul className="space-y-2">
          {entries.map((entry) => (
            <li key={entry.id} className="border p-2 rounded shadow">
              <p><strong>名前:</strong> {entry.name}</p>
              <p><strong>メール:</strong> {entry.email}</p>
              <p><strong>メッセージ:</strong> {entry.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
