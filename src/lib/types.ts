// Types pour l'application EDH Zéro Papier

export type Role = 'admin' | 'technicien' | 'chef-technicien' | 'agent' | 'client';

export type StatutUtilisateur = 'actif' | 'inactif' | 'suspendu';

export type StatutPanne = 'signale' | 'en-attente' | 'en-cours' | 'resolue' | 'annulee';

export type PrioritePanne = 'haute' | 'moyenne' | 'basse';

export type TypePanne = 'coupure' | 'tension-faible' | 'court-circuit' | 'poteau-endommage' | 'autre';

export type StatutIntervention = 'planifiee' | 'en-cours' | 'terminee' | 'annulee';

export type TypeIntervention = 'reparation' | 'maintenance' | 'installation' | 'inspection' | 'urgence';

export type StatutFacture = 'impayee' | 'payee' | 'en-retard' | 'partiellement-payee' | 'annulee';

export type ModePaiement = 'especes' | 'carte' | 'virement' | 'moncash' | 'natcash';

export interface Utilisateur {
  id: string;
  email: string;
  nom: string;
  prenom?: string;
  role: Role;
  telephone?: string;
  adresse?: string;
  statut: StatutUtilisateur;
  createdAt: string;
  updatedAt: string;
}

export interface Panne {
  id: string;
  reference: string;
  clientId?: string;
  clientNom: string;
  clientTelephone?: string;
  adresse: string;
  quartier?: string;
  type: TypePanne;
  description: string;
  priorite: PrioritePanne;
  statut: StatutPanne;
  technicienAssigneId?: string;
  dateSignalement: string;
  dateResolution?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Intervention {
  id: string;
  reference: string;
  panneId?: string;
  technicienId?: string;
  technicienNom: string;
  type: TypeIntervention;
  description?: string;
  statut: StatutIntervention;
  dateDebut?: string;
  dateFin?: string;
  dureeEstimee?: number;
  materielUtilise?: string;
  coutMateriel?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  utilisateurId?: string;
  numeroContrat: string;
  nomComplet: string;
  email?: string;
  telephone: string;
  adresse: string;
  quartier?: string;
  ville: string;
  typeCompteur?: 'prepaye' | 'postpaye';
  numeroCompteur?: string;
  consommationMoyenne?: number;
  solde: number;
  statut: 'actif' | 'inactif' | 'suspendu' | 'debiteur';
  createdAt: string;
  updatedAt: string;
}

export interface Facture {
  id: string;
  numeroFacture: string;
  clientId: string;
  clientNom: string;
  periode: string;
  montant: number;
  montantPaye: number;
  consommation?: number;
  dateEmission: string;
  dateEcheance: string;
  datePaiement?: string;
  statut: StatutFacture;
  modePaiement?: ModePaiement;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  utilisateurId: string;
  titre: string;
  message: string;
  type: 'panne' | 'intervention' | 'facture' | 'systeme' | 'alerte';
  priorite: 'haute' | 'normale' | 'basse';
  lue: boolean;
  dateCreation: string;
  dateLecture?: string;
  createdAt: string;
}
