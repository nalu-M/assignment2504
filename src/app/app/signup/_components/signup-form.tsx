type SignUpFormProps = {
  email: string;
  password: string;
  confirmPassword: string;
  error: string | null;
  loading: boolean;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setConfirmPassword: (val: string) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  errors: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

export const SignUpForm = ({
  email,
  password,
  confirmPassword,
  setEmail,
  setPassword,
  setConfirmPassword,
  handleSignUp,
  errors,
  error,
  loading,
}: SignUpFormProps) => (
  <>
    <h2 className="text-2xl font-bold mb-6 text-center">サインアップ</h2>
    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
    <form onSubmit={handleSignUp}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-bold mb-1">メールアドレス</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-bold mb-1">パスワード</label>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-sm font-bold mb-1">パスワード確認</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        {loading ? '登録中...' : 'サインアップ'}
      </button>
    </form>
  </>
);