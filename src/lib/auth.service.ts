import { supabase, isSupabaseConfigured } from './supabase';
import { mockUtilisateurs } from './mockData';
import type { Utilisateur, Role } from './types';

// Service d'authentification unifié (Supabase + Mode offline)
export class AuthService {
  // Login
  async login(email: string, password: string): Promise<Utilisateur> {
    if (isSupabaseConfigured) {
      // Mode Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);
      if (!data.user) throw new Error('Utilisateur non trouvé');

      // Récupérer les infos utilisateur depuis la table
      const { data: userData, error: userError } = await supabase
        .from('utilisateurs')
        .select('*')
        .eq('email', email)
        .single();

      if (userError || !userData) throw new Error('Profil utilisateur non trouvé');

      return this.mapUserFromDB(userData);
    } else {
      // Mode offline (mockData)
      const user = mockUtilisateurs.find((u) => u.email === email);
      if (!user) throw new Error('Email ou mot de passe incorrect');
      
      // Simuler un délai réseau
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      return user;
    }
  }

  // Logout
  async logout(): Promise<void> {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    // En mode offline, rien à faire
  }

  // Récupérer l'utilisateur actuel
  async getCurrentUser(): Promise<Utilisateur | null> {
    if (isSupabaseConfigured) {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return null;

      const { data: userData } = await supabase
        .from('utilisateurs')
        .select('*')
        .eq('email', data.user.email)
        .single();

      if (!userData) return null;
      return this.mapUserFromDB(userData);
    } else {
      // En mode offline, retourner null (pas de session persistante)
      return null;
    }
  }

  // Helper: Mapper les données DB vers le type Utilisateur
  private mapUserFromDB(data: any): Utilisateur {
    return {
      id: data.id,
      email: data.email,
      nom: data.nom,
      prenom: data.prenom,
      role: data.role as Role,
      telephone: data.telephone,
      adresse: data.adresse,
      statut: data.statut,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  }
}

export const authService = new AuthService();
