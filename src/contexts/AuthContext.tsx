import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '../lib/auth.service';
import { isSupabaseConfigured } from '../lib/supabase';
import type { Utilisateur } from '../lib/types';

interface AuthContextType {
  user: Utilisateur | null;
  loading: boolean;
  isSupabaseMode: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Utilisateur | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si un utilisateur est déjà connecté
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'utilisateur:', error);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    const loggedInUser = await authService.login(email, password);
    setUser(loggedInUser);
  }

  async function logout() {
    await authService.logout();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isSupabaseMode: isSupabaseConfigured,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider');
  }
  return context;
}
