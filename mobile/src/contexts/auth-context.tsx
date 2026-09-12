import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { apiRequest } from '@/services/api';
import type { AuthResponse, MessageResponse, RegisterResponse, User } from '@/types/user';

const TOKEN_KEY = 'lsgfit.token';

type SignInInput = { email: string; password: string };
type SignUpInput = { name: string; email: string; password: string; confirmPassword: string };
type VerifyEmailInput = { email: string; code: string };
type ResendVerificationInput = { email: string };
type RequestPasswordResetInput = { email: string };
type ResetPasswordInput = { email: string; code: string; password: string; confirmPassword: string };

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
  verifyEmail: (input: VerifyEmailInput) => Promise<void>;
  resendVerificationCode: (input: ResendVerificationInput) => Promise<void>;
  requestPasswordReset: (input: RequestPasswordResetInput) => Promise<void>;
  resetPassword: (input: ResetPasswordInput) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
        if (!storedToken) return;

        const restoredUser = await apiRequest<User>('/users/me', { token: storedToken });
        setToken(storedToken);
        setUser(restoredUser);
      } catch {
        await AsyncStorage.removeItem(TOKEN_KEY);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  const persistSession = useCallback(async (result: AuthResponse) => {
    await AsyncStorage.setItem(TOKEN_KEY, result.token);
    setToken(result.token);
    setUser(result.user);
  }, []);

  const signIn = useCallback(
    async (input: SignInInput) => {
      const result = await apiRequest<AuthResponse>('/sessions', { method: 'POST', body: input });
      await persistSession(result);
    },
    [persistSession],
  );

  const signUp = useCallback(async (input: SignUpInput) => {
    // Account is created unverified: no session is persisted until the
    // e-mail code is confirmed via verifyEmail.
    await apiRequest<RegisterResponse>('/users', { method: 'POST', body: input });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  }, []);

  const verifyEmail = useCallback(
    async (input: VerifyEmailInput) => {
      const result = await apiRequest<AuthResponse>('/users/verify', { method: 'POST', body: input });
      await persistSession(result);
    },
    [persistSession],
  );

  const resendVerificationCode = useCallback(async (input: ResendVerificationInput) => {
    await apiRequest<MessageResponse>('/users/resend-verification', { method: 'POST', body: input });
  }, []);

  const requestPasswordReset = useCallback(async (input: RequestPasswordResetInput) => {
    await apiRequest<MessageResponse>('/users/forgot-password', { method: 'POST', body: input });
  }, []);

  const resetPassword = useCallback(
    async (input: ResetPasswordInput) => {
      const result = await apiRequest<AuthResponse>('/users/reset-password', { method: 'POST', body: input });
      await persistSession(result);
    },
    [persistSession],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      isAuthenticated: Boolean(token && user),
      signIn,
      signUp,
      signOut,
      verifyEmail,
      resendVerificationCode,
      requestPasswordReset,
      resetPassword,
    }),
    [
      user,
      isLoading,
      token,
      signIn,
      signUp,
      signOut,
      verifyEmail,
      resendVerificationCode,
      requestPasswordReset,
      resetPassword,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
