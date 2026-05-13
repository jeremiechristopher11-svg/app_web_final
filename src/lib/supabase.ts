import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Vérification des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Mode offline (si Supabase n'est pas configuré)
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'https://placeholder.supabase.co'
);

if (!isSupabaseConfigured) {
  console.warn(
    '⚠️ Mode OFFLINE activé - Les données mockées seront utilisées.\n' +
    'Pour utiliser Supabase, configurez .env.local avec vos vraies clés.'
  );
}

// Créer le client Supabase
export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key-for-offline-mode',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
      flowType: 'implicit',
    },
  }
);

// Helper pour gérer les erreurs Supabase
export function handleSupabaseError(error: any): string {
  if (!error) return 'Une erreur inconnue est survenue';

  if (error.message) {
    const errorMessages: Record<string, string> = {
      'Invalid login credentials': 'Email ou mot de passe incorrect',
      'Email not confirmed': 'Veuillez confirmer votre email',
      'User already registered': 'Cet email est déjà utilisé',
      'Invalid email': 'Email invalide',
      'Password should be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères',
    };

    return errorMessages[error.message] || error.message;
  }

  return 'Une erreur est survenue';
}
