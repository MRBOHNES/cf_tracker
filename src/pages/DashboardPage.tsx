import { useState } from 'react';
import { useAppContext } from '../hooks/useAppContext';
import { ProfileHeader } from '../components/ProfileHeader';
import { RecentActivity } from '../components/RecentActivity';
import { RatingChart } from '../components/RatingChart';
import { DifficultyChart } from '../components/DifficultyChart';
import { TagChart } from '../components/TagChart';
import { UpsolveProblemsList } from '../components/UpsolveProblemsList';

type Tab = 'overview' | 'upsolve' | 'analytics';

export function DashboardPage() {
  const { userInfo, handle } = useAppContext();
  const [activeTab, setActiveTab] = useState<Tab>('overview');

  if (!userInfo || !handle) {
    return null; // Should be handled at App level
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header with Navigation */}
      <div className="bg-slate-800 border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">CF Tracker</h1>
            <button
              onClick={() => {
                localStorage.removeItem('cf_handle');
                window.location.reload();
              }}
              className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded-lg transition"
            >
              Change Handle
            </button>
          </div>

          {/* Profile Quick Info */}
          <div className="flex items-center gap-4 text-sm">
            <span className="text-slate-400">Handle:</span>
            <span className="font-mono font-bold">{handle}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-slate-700 flex">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 px-4 font-medium transition ${
              activeTab === 'overview'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setActiveTab('upsolve')}
            className={`flex-1 py-3 px-4 font-medium transition ${
              activeTab === 'upsolve'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔧 Upsolve
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 py-3 px-4 font-medium transition ${
              activeTab === 'analytics'
                ? 'border-b-2 border-blue-500 text-blue-400'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            📈 Analytics
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <ProfileHeader />
            <RecentActivity />
            <RatingChart />
          </div>
        )}

        {activeTab === 'upsolve' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Problems to Upsolve</h2>
            <UpsolveProblemsList />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Analytics & Weakness Detection</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DifficultyChart />
              <TagChart />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
