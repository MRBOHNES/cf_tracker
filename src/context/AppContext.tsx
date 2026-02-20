import React, { createContext, useReducer, useCallback, useEffect, type ReactNode } from 'react';
import type { AppState, ContextType, UpsolveProblem } from '../types';
import { CodeforcesAPI } from '../services/codeforcesAPI';
import { findUpsolveProblem, getRecentAcceptedSubmissions } from '../utils/helpers';

const initialState: AppState = {
  handle: null,
  userInfo: null,
  submissions: [],
  ratingHistory: [],
  upsolveProblem: [],
  solvedProblems: new Set(),
  recentSubmissions: [],
  loading: false,
  error: null,
};

type Action = 
  | { type: 'SET_HANDLE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_USER_DATA'; payload: any }
  | { type: 'UPDATE_UPSOLVE_NOTES'; payload: { problemId: string; notes: string } }
  | { type: 'CLEAR_ERROR' };

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_HANDLE':
      return { ...state, handle: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_USER_DATA': {
      const { userInfo, submissions, ratingHistory } = action.payload;
      
      // Build set of solved problems
      const solvedProblems = new Set<string>();
      for (const submission of submissions) {
        if (submission.verdict === 'OK') {
          solvedProblems.add(`${submission.problem.contestId}-${submission.problem.index}`);
        }
      }

      // Find upsolve problems
      const upsolveProblem = findUpsolveProblem(submissions);

      // Get recent submissions
      const recentSubmissions = getRecentAcceptedSubmissions(submissions, 10);

      return {
        ...state,
        userInfo,
        submissions,
        ratingHistory,
        solvedProblems,
        upsolveProblem,
        recentSubmissions,
        loading: false,
        error: null,
      };
    }
    case 'UPDATE_UPSOLVE_NOTES': {
      const updatedUpsolve = state.upsolveProblem.map(p => 
        `${p.problem.contestId}-${p.problem.index}` === action.payload.problemId
          ? { ...p, notes: action.payload.notes }
          : p
      );
      return { ...state, upsolveProblem: updatedUpsolve };
    }
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

export const AppContext = createContext<ContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load saved handle from localStorage
  useEffect(() => {
    const savedHandle = localStorage.getItem('cf_handle');
    if (savedHandle) {
      dispatch({ type: 'SET_HANDLE', payload: savedHandle });
    }
  }, []);

  const setHandle = useCallback((handle: string) => {
    dispatch({ type: 'SET_HANDLE', payload: handle });
    localStorage.setItem('cf_handle', handle);
  }, []);

  const fetchUserData = useCallback(async (handle: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const data = await CodeforcesAPI.fetchAllUserData(handle);
      dispatch({ type: 'SET_USER_DATA', payload: data });
      setHandle(handle);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user data';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [setHandle]);

  const updateUpsolveProblemNotes = useCallback((problemId: string, notes: string) => {
    dispatch({ type: 'UPDATE_UPSOLVE_NOTES', payload: { problemId, notes } });
    
    // Save to localStorage
    const upsolveProblem: UpsolveProblem[] = JSON.parse(localStorage.getItem('upsolve_notes') || '[]');
    const index = upsolveProblem.findIndex(p => `${p.problem.contestId}-${p.problem.index}` === problemId);
    if (index >= 0) {
      upsolveProblem[index].notes = notes;
    }
    localStorage.setItem('upsolve_notes', JSON.stringify(upsolveProblem));
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const value: ContextType = {
    ...state,
    setHandle,
    fetchUserData,
    updateUpsolveProblemNotes,
    clearError,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
