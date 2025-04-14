'use client';

import { useFormListContext } from '@/features/user/list-context';

export default function FormListPage() {
  const { entries, loading, error, deleteEntry } = useFormListContext();

  const handleDelete = async (id: string) => {
    if (confirm('本当に削除しますか？')) {
      await deleteEntry(id);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">送信されたフォーム一覧</h1>

      {loading && <p>読み込み中...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && entries.length === 0 && <p>まだ送信されたデータがありません。</p>}

      <ul className="space-y-2">
        {entries.map((entry) => (
          <li key={entry.id} className="border p-4 rounded shadow relative">
            <button
              onClick={() => handleDelete(entry.id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
            >
              削除
            </button>
            <p><strong>名前:</strong> {entry.name}</p>
            <p><strong>メール:</strong> {entry.email}</p>
            <p><strong>メッセージ:</strong> {entry.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
