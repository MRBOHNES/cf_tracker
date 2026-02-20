import type { Submission, UpsolveProblem, DifficultyCount, TagCount, Problem } from '../types';

/**
 * Find all problems that were attempted but never solved
 * (Wrong Answer, TLE, Runtime Error, etc. but no Accepted verdict)
 */
export function findUpsolveProblem(submissions: Submission[]): UpsolveProblem[] {
  const problemMap = new Map<string, {
    problem: Problem;
    verdicts: ('WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'MEMORY_LIMIT_EXCEEDED')[];
    submissionTime: number;
  }>();

  const solvedProblems = new Set<string>();

  // First pass: identify solved problems
  for (const submission of submissions) {
    if (submission.verdict === 'OK') {
      solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
    }
  }

  // Second pass: find failed attempts for unsolved problems
  for (const submission of submissions) {
    const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;

    // Skip if problem is solved
    if (solvedProblems.has(problemKey)) {
      continue;
    }

    // Check if it's a failure verdict we care about
    if (['WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'MEMORY_LIMIT_EXCEEDED'].includes(submission.verdict || '')) {
      if (!problemMap.has(problemKey)) {
        problemMap.set(problemKey, {
          problem: submission.problem,
          verdicts: [],
          submissionTime: submission.creationTimeSeconds,
        });
      }
      const entry = problemMap.get(problemKey)!;
      const verdict = submission.verdict as 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'MEMORY_LIMIT_EXCEEDED';
      if (!entry.verdicts.includes(verdict)) {
        entry.verdicts.push(verdict);
      }
      entry.submissionTime = Math.max(entry.submissionTime, submission.creationTimeSeconds);
    }
  }

  return Array.from(problemMap.values()).map(entry => ({
    problem: entry.problem,
    verdicts: entry.verdicts,
    notes: '',
    submissionTime: entry.submissionTime,
  }));
}

/**
 * Get the most recent N accepted submissions
 */
export function getRecentAcceptedSubmissions(submissions: Submission[], count: number = 10): Submission[] {
  return submissions
    .filter(s => s.verdict === 'OK')
    .sort((a, b) => b.creationTimeSeconds - a.creationTimeSeconds)
    .slice(0, count);
}

/**
 * Count accepted problems by difficulty rating
 */
export function getDifficultyDistribution(submissions: Submission[]): DifficultyCount[] {
  const solvedProblems = new Set<string>();
  
  // Get all solved problems
  for (const submission of submissions) {
    if (submission.verdict === 'OK') {
      solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
    }
  }

  const difficultyMap = new Map<number, number>();

  // Count problems by difficulty
  const processedProblems = new Set<string>();
  for (const submission of submissions) {
    const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
    if (solvedProblems.has(problemKey) && !processedProblems.has(problemKey)) {
      processedProblems.add(problemKey);
      const rating = submission.problem.rating || 0;
      if (rating > 0) {
        difficultyMap.set(rating, (difficultyMap.get(rating) || 0) + 1);
      }
    }
  }

  return Array.from(difficultyMap.entries())
    .map(([rating, count]) => ({ rating, count }))
    .sort((a, b) => a.rating - b.rating);
}

/**
 * Count accepted problems by tag
 */
export function getTagDistribution(submissions: Submission[]): TagCount[] {
  const solvedProblems = new Set<string>();
  
  // Get all solved problems
  for (const submission of submissions) {
    if (submission.verdict === 'OK') {
      solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
    }
  }

  const tagMap = new Map<string, number>();
  const processedProblems = new Set<string>();

  // Count tags
  for (const submission of submissions) {
    const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
    if (solvedProblems.has(problemKey) && !processedProblems.has(problemKey)) {
      processedProblems.add(problemKey);
      for (const tag of submission.problem.tags) {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
      }
    }
  }

  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Top 10 tags
}

/**
 * Get total solved and attempted problem counts
 */
export function getSubmissionStats(submissions: Submission[]): {
  totalSolved: number;
  totalAttempted: number;
  totalSubmissions: number;
} {
  const solvedProblems = new Set<string>();
  const attemptedProblems = new Set<string>();

  for (const submission of submissions) {
    const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
    
    if (submission.verdict === 'OK') {
      solvedProblems.add(problemKey);
    } else {
      attemptedProblems.add(problemKey);
    }
  }

  return {
    totalSolved: solvedProblems.size,
    totalAttempted: attemptedProblems.size,
    totalSubmissions: submissions.length,
  };
}

/**
 * Get the codeforcesColorassociated with a rank
 */
export function getRankColor(rank: string): string {
  const rankColors: Record<string, string> = {
    'newbie': 'text-gray-400',
    'pupil': 'text-green-500',
    'specialist': 'text-cyan-400',
    'expert': 'text-blue-600',
    'candidate master': 'text-purple-600',
    'master': 'text-orange-500',
    'international master': 'text-orange-500',
    'grandmaster': 'text-red-600',
    'international grandmaster': 'text-red-600',
    'legendary grandmaster': 'text-red-800',
  };

  return rankColors[rank.toLowerCase()] || 'text-gray-500';
}

/**
 * Format timestamp to readable date
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format timestamp to time ago string
 */
export function timeAgo(timestamp: number): string {
  const now = Math.floor(Date.now() / 1000);
  const diff = now - timestamp;

  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  
  return formatDate(timestamp);
}
