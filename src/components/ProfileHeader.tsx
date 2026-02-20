import { useAppContext } from '../hooks/useAppContext';
import { getRankColor } from '../utils/helpers';

export function ProfileHeader() {
  const { userInfo } = useAppContext();

  if (!userInfo) return null;

  const rankColor = getRankColor(userInfo.rank);

  return (
    <div className="bg-slate-800 rounded-lg border border-slate-700 p-6">
      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={userInfo.avatar}
            alt={userInfo.handle}
            className="w-20 h-20 rounded-lg border border-slate-600"
          />
        </div>

        {/* Info */}
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{userInfo.handle}</h1>
            <span className={`text-xl font-bold ${rankColor}`}>
              {userInfo.rank}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <p className="text-slate-400 text-sm">Current Rating</p>
              <p className="text-2xl font-bold text-blue-400">{userInfo.rating}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Max Rating</p>
              <p className="text-2xl font-bold text-green-400">{userInfo.maxRating}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Max Rank</p>
              <p className="text-lg font-bold">{userInfo.maxRank}</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Friends</p>
              <p className="text-2xl font-bold">{userInfo.friendOfCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
