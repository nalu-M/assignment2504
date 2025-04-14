'use client';

import { createContext, ReactNode } from 'react';
import { useState } from '@/hooks/use-state';
import { useEffect } from '@/hooks/use-effect';
import { useContext } from '@/hooks/use-context';
import { fetchFormEntries, FormEntry } from '@/lib/api/fetch-form';
import { deleteFormEntry } from '@/lib/api/delete-form'; // 👈 削除APIを用意する

type FormListContextType = {
  entries: FormEntry[];
  loading: boolean;
  error: string | null;
  refreshEntries: () => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
};

const FormListContext = createContext<FormListContextType | undefined>(undefined);

export const FormListProvider = ({ children }: { children: ReactNode }) => {
  const [entries, setEntries] = useState<FormEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchFormEntries();
      setEntries(data);
    } catch (err) {
      console.error('データ取得失敗:', err);
      setError('データ取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await deleteFormEntry(id);
      setEntries((prev) => prev.filter((entry) => entry.id !== id)); // 👈 ローカルでも即時更新
    } catch (err) {
      console.error('削除失敗:', err);
      setError('削除に失敗しました。');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <FormListContext.Provider value={{ entries, loading, error, refreshEntries: fetchData, deleteEntry }}>
      {children}
    </FormListContext.Provider>
  );
};

export const useFormListContext = () => {
  const context = useContext(FormListContext);
  if (!context) {
    throw new Error('useFormListContext must be used within a FormListProvider');
  }
  return context;
};
