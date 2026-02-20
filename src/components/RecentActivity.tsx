import { useAppContext } from '../context/AppContext';
import { timeAgo } from '../utils/helpers';

export function RecentActivity() {
  const { recentSubmissions, submissions } = useAppContext();

  const acceptedCount = submissions.filter(s => s.verdict === 'OK').length;
  const totalSubmissions = submissions.length;
  const successRate = totalSubmissions > 0 ? Math.round((acceptedCount / totalSubmissions) * 100) : 0;

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <h2 className="text-xl font-bold mb-4">Recent Activity</h2>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <p className="text-slate-400 text-sm">Total Submissions</p>
          <p className="text-2xl font-bold">{totalSubmissions}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Accepted</p>
          <p className="text-2xl font-bold text-green-400">{acceptedCount}</p>
        </div>
        <div>
          <p className="text-slate-400 text-sm">Success Rate</p>
          <p className="text-2xl font-bold text-blue-400">{successRate}%</p>
        </div>
      </div>

      {/* Last 10 Submissions */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3">Last 10 Submissions</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {recentSubmissions.length > 0 ? (
            recentSubmissions.map((submission) => (
              <div key={submission.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg text-sm">
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-blue-400">
                      {submission.problem.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      ({submission.problem.contestId}{submission.problem.index})
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{timeAgo(submission.creationTimeSeconds)}</p>
                </div>
                <span className="text-green-400 font-semibold">✓ AC</span>
              </div>
            ))
          ) : (
            <p className="text-slate-400 text-sm">No submissions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
