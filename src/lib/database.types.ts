// Types générés depuis le schéma Supabase
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      utilisateurs: {
        Row: {
          id: string
          email: string
          nom: string
          prenom: string | null
          role: string
          telephone: string | null
          adresse: string | null
          statut: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          nom: string
          prenom?: string | null
          role: string
          telephone?: string | null
          adresse?: string | null
          statut?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nom?: string
          prenom?: string | null
          role?: string
          telephone?: string | null
          adresse?: string | null
          statut?: string
          created_at?: string
          updated_at?: string
        }
      }
      pannes: {
        Row: {
          id: string
          reference: string
          client_id: string | null
          client_nom: string
          client_telephone: string | null
          adresse: string
          quartier: string | null
          type: string
          description: string
          priorite: string
          statut: string
          technicien_assigne_id: string | null
          date_signalement: string
          date_resolution: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reference: string
          client_id?: string | null
          client_nom: string
          client_telephone?: string | null
          adresse: string
          quartier?: string | null
          type: string
          description: string
          priorite?: string
          statut?: string
          technicien_assigne_id?: string | null
          date_signalement?: string
          date_resolution?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reference?: string
          client_id?: string | null
          client_nom?: string
          client_telephone?: string | null
          adresse?: string
          quartier?: string | null
          type?: string
          description?: string
          priorite?: string
          statut?: string
          technicien_assigne_id?: string | null
          date_signalement?: string
          date_resolution?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      interventions: {
        Row: {
          id: string
          reference: string
          panne_id: string | null
          technicien_id: string | null
          technicien_nom: string
          type: string
          description: string | null
          statut: string
          date_debut: string | null
          date_fin: string | null
          duree_estimee: number | null
          materiel_utilise: string | null
          cout_materiel: number | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          reference: string
          panne_id?: string | null
          technicien_id?: string | null
          technicien_nom: string
          type: string
          description?: string | null
          statut?: string
          date_debut?: string | null
          date_fin?: string | null
          duree_estimee?: number | null
          materiel_utilise?: string | null
          cout_materiel?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          reference?: string
          panne_id?: string | null
          technicien_id?: string | null
          technicien_nom?: string
          type?: string
          description?: string | null
          statut?: string
          date_debut?: string | null
          date_fin?: string | null
          duree_estimee?: number | null
          materiel_utilise?: string | null
          cout_materiel?: number | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          utilisateur_id: string | null
          numero_contrat: string
          nom_complet: string
          email: string | null
          telephone: string
          adresse: string
          quartier: string | null
          ville: string
          type_compteur: string | null
          numero_compteur: string | null
          consommation_moyenne: number | null
          solde: number
          statut: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          utilisateur_id?: string | null
          numero_contrat: string
          nom_complet: string
          email?: string | null
          telephone: string
          adresse: string
          quartier?: string | null
          ville?: string
          type_compteur?: string | null
          numero_compteur?: string | null
          consommation_moyenne?: number | null
          solde?: number
          statut?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          utilisateur_id?: string | null
          numero_contrat?: string
          nom_complet?: string
          email?: string | null
          telephone?: string
          adresse?: string
          quartier?: string | null
          ville?: string
          type_compteur?: string | null
          numero_compteur?: string | null
          consommation_moyenne?: number | null
          solde?: number
          statut?: string
          created_at?: string
          updated_at?: string
        }
      }
      factures: {
        Row: {
          id: string
          numero_facture: string
          client_id: string
          client_nom: string
          periode: string
          montant: number
          montant_paye: number
          consommation: number | null
          date_emission: string
          date_echeance: string
          date_paiement: string | null
          statut: string
          mode_paiement: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          numero_facture: string
          client_id: string
          client_nom: string
          periode: string
          montant: number
          montant_paye?: number
          consommation?: number | null
          date_emission?: string
          date_echeance: string
          date_paiement?: string | null
          statut?: string
          mode_paiement?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          numero_facture?: string
          client_id?: string
          client_nom?: string
          periode?: string
          montant?: number
          montant_paye?: number
          consommation?: number | null
          date_emission?: string
          date_echeance?: string
          date_paiement?: string | null
          statut?: string
          mode_paiement?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          utilisateur_id: string
          titre: string
          message: string
          type: string
          priorite: string
          lue: boolean
          date_creation: string
          date_lecture: string | null
          created_at: string
        }
        Insert: {
          id?: string
          utilisateur_id: string
          titre: string
          message: string
          type: string
          priorite?: string
          lue?: boolean
          date_creation?: string
          date_lecture?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          utilisateur_id?: string
          titre?: string
          message?: string
          type?: string
          priorite?: string
          lue?: boolean
          date_creation?: string
          date_lecture?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
