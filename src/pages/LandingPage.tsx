import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export function LandingPage() {
  const [inputHandle, setInputHandle] = useState('');
  const { loading, error, clearError, fetchUserData } = useAppContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputHandle.trim()) {
      await fetchUserData(inputHandle.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">CF Tracker</h1>
            <p className="text-slate-400 text-sm">Your personal Codeforces analytics hub</p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-lg">
              <p className="text-red-300 text-sm flex items-start gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </p>
              <button
                onClick={clearError}
                className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="handle" className="block text-sm font-medium text-slate-300 mb-2">
                Codeforces Handle
              </label>
              <input
                id="handle"
                type="text"
                value={inputHandle}
                onChange={(e) => setInputHandle(e.target.value)}
                placeholder="e.g., tourist"
                disabled={loading}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !inputHandle.trim()}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Loading...
                </>
              ) : (
                <>
                  <span>🚀</span>
                  Analyze My Profile
                </>
              )}
            </button>
          </form>

          {/* Footer Info */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-xs text-slate-500 text-center">
              💡 This app is 100% client-side. Your data is fetched from the public Codeforces API and stored locally in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
