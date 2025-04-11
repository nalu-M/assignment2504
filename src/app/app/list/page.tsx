'use client';

import { useEffect } from '@/hooks/use-effect';
import { useState } from '@/hooks/use-state';
import { fetchFormEntries, FormEntry } from '@/lib/api/fetch-form';

export default function FormListPage() {
  const [entries, setEntries] = useState<FormEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const items = await fetchFormEntries();
        setEntries(items);
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
