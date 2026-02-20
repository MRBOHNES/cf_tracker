import type { UserInfo, Submission, RatingChange } from '../types';

const API_BASE = 'https://codeforces.com/api';

// Add a small delay to avoid rate limiting
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class CodeforcesAPI {
  static async getUserInfo(handle: string): Promise<UserInfo> {
    const response = await fetch(`${API_BASE}/user.info?handles=${handle}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.status === 'FAILED') {
      throw new Error(data.comment || 'Failed to fetch user info');
    }
    return data.result[0];
  }

  static async getUserSubmissions(handle: string): Promise<Submission[]> {
    const response = await fetch(`${API_BASE}/user.status?handle=${handle}&from=1&count=100000`);
    if (!response.ok) {
      throw new Error(`Failed to fetch submissions: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.status === 'FAILED') {
      throw new Error(data.comment || 'Failed to fetch submissions');
    }
    return data.result;
  }

  static async getUserRating(handle: string): Promise<RatingChange[]> {
    const response = await fetch(`${API_BASE}/user.rating?handle=${handle}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch rating history: ${response.statusText}`);
    }
    const data = await response.json();
    if (data.status === 'FAILED') {
      throw new Error(data.comment || 'Failed to fetch rating history');
    }
    return data.result;
  }

  static async fetchAllUserData(handle: string) {
    await delay(500); // Avoid rate limiting
    
    const [userInfo, submissions, ratingHistory] = await Promise.all([
      this.getUserInfo(handle),
      this.getUserSubmissions(handle),
      this.getUserRating(handle),
    ]);

    return {
      userInfo,
      submissions,
      ratingHistory,
    };
  }
}
