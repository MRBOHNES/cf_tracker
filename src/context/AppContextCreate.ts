import { createContext } from 'react';
import type { ContextType } from '../types';

export const AppContext = createContext<ContextType | undefined>(undefined);
