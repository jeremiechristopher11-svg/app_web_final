import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from './supabase';
import { mockPannes, mockInterventions, mockClients, mockFactures, mockNotifications, mockUtilisateurs } from './mockData';
import type { Panne, Intervention, Client, Facture, Notification, Utilisateur } from './types';

// Hook pour récupérer les pannes
export function usePannes() {
  const [pannes, setPannes] = useState<Panne[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPannes();
  }, []);

  async function fetchPannes() {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('pannes').select('*');
        if (error) throw error;
        setPannes(data || []);
      } else {
        setPannes(mockPannes);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { pannes, loading, error, refetch: fetchPannes };
}

// Hook pour récupérer les interventions
export function useInterventions() {
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchInterventions();
  }, []);

  async function fetchInterventions() {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('interventions').select('*');
        if (error) throw error;
        setInterventions(data || []);
      } else {
        setInterventions(mockInterventions);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { interventions, loading, error, refetch: fetchInterventions };
}

// Hook pour récupérer les clients
export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('clients').select('*');
        if (error) throw error;
        setClients(data || []);
      } else {
        setClients(mockClients);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { clients, loading, error, refetch: fetchClients };
}

// Hook pour récupérer les factures
export function useFactures() {
  const [factures, setFactures] = useState<Facture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFactures();
  }, []);

  async function fetchFactures() {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('factures').select('*');
        if (error) throw error;
        setFactures(data || []);
      } else {
        setFactures(mockFactures);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { factures, loading, error, refetch: fetchFactures };
}

// Hook pour récupérer les notifications
export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  async function fetchNotifications() {
    try {
      if (isSupabaseConfigured && userId) {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('utilisateur_id', userId)
          .order('date_creation', { ascending: false });
        
        if (error) throw error;
        setNotifications(data || []);
      } else {
        setNotifications(mockNotifications);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { notifications, loading, error, refetch: fetchNotifications };
}

// Hook pour récupérer les utilisateurs
export function useUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  async function fetchUtilisateurs() {
    try {
      if (isSupabaseConfigured) {
        const { data, error } = await supabase.from('utilisateurs').select('*');
        if (error) throw error;
        setUtilisateurs(data || []);
      } else {
        setUtilisateurs(mockUtilisateurs);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { utilisateurs, loading, error, refetch: fetchUtilisateurs };
}
