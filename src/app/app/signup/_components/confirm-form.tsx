// ConfirmForm.tsx
type ConfirmFormProps = {
    code: string;
    error: string | null;
    loading: boolean;
    setCode: (val: string) => void;
    handleConfirmSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  };
  
  export const ConfirmForm = ({
    code,
    error,
    loading,
    setCode,
    handleConfirmSignUp
  }: ConfirmFormProps) => (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">確認コードを入力</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleConfirmSignUp}>
        <div className="mb-4">
          <label htmlFor="code" className="block text-gray-700 text-sm font-bold mb-2">
            確認コード
          </label>
          <input
            id="code"
            name="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          {loading ? "確認中..." : "確認"}
        </button>
      </form>
    </>
  );
  