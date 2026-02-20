import { useState } from 'react';
import { useAppContext } from '../context/AppContext';

export function UpsolveProblemsList() {
  const { upsolveProblem, updateUpsolveProblemNotes } = useAppContext();
  const [expandedProblem, setExpandedProblem] = useState<string | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>({});

  const handleNotesChange = (problemId: string, content: string) => {
    setNotes(prev => ({ ...prev, [problemId]: content }));
    updateUpsolveProblemNotes(problemId, content);
  };

  const getProblemUrl = (contestId: number, index: string) => {
    return `https://codeforces.com/problemset/problem/${contestId}/${index}`;
  };

  const getVerdictEmoji = (verdict: string) => {
    const verdictMap: Record<string, string> = {
      'WRONG_ANSWER': '❌',
      'TIME_LIMIT_EXCEEDED': '⏱️',
      'RUNTIME_ERROR': '💥',
      'MEMORY_LIMIT_EXCEEDED': '🔴',
    };
    return verdictMap[verdict] || '❓';
  };

  if (upsolveProblem.length === 0) {
    return (
      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
        <h2 className="text-xl font-bold mb-4">Upsolve Problems</h2>
        <div className="text-center text-slate-400 py-12">
          <p className="text-lg">🎉 No upsolve problems!</p>
          <p className="text-sm mt-2">All your attempted problems have been solved or you haven't attempted any yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-bold">Upsolve Problems</h2>
        <p className="text-slate-400 text-sm mt-1">Problems you've attempted but haven't solved yet</p>
      </div>

      <div className="divide-y divide-slate-700">
        {upsolveProblem.map((problem) => {
          const problemId = `${problem.problem.contestId}-${problem.problem.index}`;
          const isExpanded = expandedProblem === problemId;
          const problemNotes = notes[problemId] || '';

          return (
            <div key={problemId} className="hover:bg-slate-700/30 transition">
              <button
                onClick={() => setExpandedProblem(isExpanded ? null : problemId)}
                className="w-full p-4 flex items-start gap-4 text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <a
                      href={getProblemUrl(problem.problem.contestId, problem.problem.index)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono font-bold text-blue-400 hover:text-blue-300 flex items-center gap-2"
                    >
                      {problem.problem.contestId}{problem.problem.index}
                      <span className="text-xs">↗</span>
                    </a>
                    <h3 className="font-semibold text-white">{problem.problem.name}</h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    {problem.verdicts.map((v, i) => (
                      <span key={i} title={v} className="text-lg">
                        {getVerdictEmoji(v)}
                      </span>
                    ))}
                    {problem.problem.rating && (
                      <span className="ml-auto text-slate-400 text-sm">
                        Rating: <span className="text-white font-semibold">{problem.problem.rating}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-2xl text-slate-400">
                  {isExpanded ? '▼' : '▶'}
                </div>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 bg-slate-700/20 border-t border-slate-700">
                  <div className="mb-3">
                    <p className="text-xs text-slate-400 mb-1">Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {problem.problem.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-600 text-slate-200 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Personal Notes
                    </label>
                    <textarea
                      value={problemNotes}
                      onChange={(e) => handleNotesChange(problemId, e.target.value)}
                      placeholder="Add your personal notes here... (auto-saved)"
                      className="w-full px-3 py-2 bg-slate-700 text-white border border-slate-600 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
