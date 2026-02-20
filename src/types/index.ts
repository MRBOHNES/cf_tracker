// Codeforces User Types
export interface UserInfo {
  handle: string;
  email?: string;
  vkId?: number;
  openTag?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  organization?: string;
  contribution: number;
  rank: string;
  rating: number;
  maxRank: string;
  maxRating: number;
  lastOnlineTimeSeconds: number;
  registrationTimeSeconds: number;
  friendOfCount: number;
  avatar: string;
  titlePhoto: string;
}

export interface Submission {
  id: number;
  contestId: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: Problem;
  author: Author;
  programmingLanguage: string;
  verdict: 'OK' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR' | 'SKIPPED' | null;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

export interface Problem {
  contestId: number;
  index: string;
  name: string;
  type: string;
  points?: number;
  rating?: number;
  tags: string[];
}

export interface Author {
  contestId: number;
  members: Member[];
  participantType: string;
  ghost: boolean;
  room?: number;
  startTimeSeconds?: number;
}

export interface Member {
  handle: string;
  name?: string;
}

export interface RatingChange {
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

// App State Types
export interface UpsolveProblem {
  problem: Problem;
  verdicts: ('WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'MEMORY_LIMIT_EXCEEDED')[];
  notes: string;
  submissionTime: number;
}

export interface DifficultyCount {
  rating: number;
  count: number;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface AppState {
  handle: string | null;
  userInfo: UserInfo | null;
  submissions: Submission[];
  ratingHistory: RatingChange[];
  upsolveProblem: UpsolveProblem[];
  solvedProblems: Set<string>;
  recentSubmissions: Submission[];
  loading: boolean;
  error: string | null;
}

export interface ContextType extends AppState {
  setHandle: (handle: string) => void;
  fetchUserData: (handle: string) => Promise<void>;
  updateUpsolveProblemNotes: (problemId: string, notes: string) => void;
  clearError: () => void;
}
