'use client';

import { useEffect } from 'react';
import { useRouter } from '@/hooks/use-router';
import { useUserContext } from '@/features/user/user-context';
import { useFormContext } from '@/features/user/form-context';
import { isAuthenticated } from '@/lib/auth/check-user';
import { submitFormEntry } from '@/lib/api/submit-form';

export default function FormPage() {
  const router = useRouter();
  const { state: userState } = useUserContext();
  const { formData, setFormData } = useFormContext();
  const { user, loading } = userState;

  // 認証が確認された後にフォームが表示される
  useEffect(() => {
    if (!loading && !user) {
      router.push('/app/login');
    }
  }, [loading, user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitFormEntry(formData);
      alert('送信完了！');
      // フォーム送信後にデータをリセット
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('送信失敗:', err);
    }
  };

  if (loading || !user) {
    return <p className="text-center mt-20">認証を確認中...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-md w-full p-4 bg-white shadow-md rounded">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="名前"
          required
          className="border p-2 rounded"
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="メール"
          required
          className="border p-2 rounded"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="メッセージ"
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          送信
        </button>
      </form>
    </div>
  );
}
