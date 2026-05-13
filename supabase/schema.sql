-- ==========================================
-- SCHÉMA BASE DE DONNÉES - EDH PLATEFORME ZÉRO PAPIER
-- ==========================================
-- Ce fichier crée toutes les tables nécessaires pour l'application EDH
-- Exécutez ce script dans le SQL Editor de Supabase

-- ==========================================
-- 1. TABLE UTILISATEURS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.utilisateurs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    nom TEXT NOT NULL,
    prenom TEXT,
    role TEXT NOT NULL CHECK (role IN ('admin', 'technicien', 'chef-technicien', 'agent', 'client')),
    telephone TEXT,
    adresse TEXT,
    statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif', 'suspendu')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherche rapide par email et rôle
CREATE INDEX IF NOT EXISTS idx_utilisateurs_email ON public.utilisateurs(email);
CREATE INDEX IF NOT EXISTS idx_utilisateurs_role ON public.utilisateurs(role);

-- ==========================================
-- 2. TABLE PANNES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.pannes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference TEXT UNIQUE NOT NULL,
    client_id UUID REFERENCES public.utilisateurs(id) ON DELETE SET NULL,
    client_nom TEXT NOT NULL,
    client_telephone TEXT,
    adresse TEXT NOT NULL,
    quartier TEXT,
    type TEXT NOT NULL CHECK (type IN ('coupure', 'tension-faible', 'court-circuit', 'poteau-endommage', 'autre')),
    description TEXT NOT NULL,
    priorite TEXT DEFAULT 'moyenne' CHECK (priorite IN ('haute', 'moyenne', 'basse')),
    statut TEXT DEFAULT 'signale' CHECK (statut IN ('signale', 'en-attente', 'en-cours', 'resolue', 'annulee')),
    technicien_assigne_id UUID REFERENCES public.utilisateurs(id) ON DELETE SET NULL,
    date_signalement TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_resolution TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_pannes_reference ON public.pannes(reference);
CREATE INDEX IF NOT EXISTS idx_pannes_client_id ON public.pannes(client_id);
CREATE INDEX IF NOT EXISTS idx_pannes_statut ON public.pannes(statut);
CREATE INDEX IF NOT EXISTS idx_pannes_priorite ON public.pannes(priorite);
CREATE INDEX IF NOT EXISTS idx_pannes_technicien ON public.pannes(technicien_assigne_id);

-- ==========================================
-- 3. TABLE INTERVENTIONS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.interventions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference TEXT UNIQUE NOT NULL,
    panne_id UUID REFERENCES public.pannes(id) ON DELETE CASCADE,
    technicien_id UUID REFERENCES public.utilisateurs(id) ON DELETE SET NULL,
    technicien_nom TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('reparation', 'maintenance', 'installation', 'inspection', 'urgence')),
    description TEXT,
    statut TEXT DEFAULT 'planifiee' CHECK (statut IN ('planifiee', 'en-cours', 'terminee', 'annulee')),
    date_debut TIMESTAMP WITH TIME ZONE,
    date_fin TIMESTAMP WITH TIME ZONE,
    duree_estimee INTEGER, -- en minutes
    materiel_utilise TEXT,
    cout_materiel DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_interventions_reference ON public.interventions(reference);
CREATE INDEX IF NOT EXISTS idx_interventions_panne_id ON public.interventions(panne_id);
CREATE INDEX IF NOT EXISTS idx_interventions_technicien ON public.interventions(technicien_id);
CREATE INDEX IF NOT EXISTS idx_interventions_statut ON public.interventions(statut);

-- ==========================================
-- 4. TABLE CLIENTS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID REFERENCES public.utilisateurs(id) ON DELETE CASCADE,
    numero_contrat TEXT UNIQUE NOT NULL,
    nom_complet TEXT NOT NULL,
    email TEXT,
    telephone TEXT NOT NULL,
    adresse TEXT NOT NULL,
    quartier TEXT,
    ville TEXT DEFAULT 'Port-au-Prince',
    type_compteur TEXT CHECK (type_compteur IN ('prepaye', 'postpaye')),
    numero_compteur TEXT,
    consommation_moyenne DECIMAL(10,2),
    solde DECIMAL(10,2) DEFAULT 0,
    statut TEXT DEFAULT 'actif' CHECK (statut IN ('actif', 'inactif', 'suspendu', 'debiteur')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_clients_numero_contrat ON public.clients(numero_contrat);
CREATE INDEX IF NOT EXISTS idx_clients_utilisateur_id ON public.clients(utilisateur_id);
CREATE INDEX IF NOT EXISTS idx_clients_statut ON public.clients(statut);

-- ==========================================
-- 5. TABLE FACTURES
-- ==========================================
CREATE TABLE IF NOT EXISTS public.factures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    numero_facture TEXT UNIQUE NOT NULL,
    client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
    client_nom TEXT NOT NULL,
    periode TEXT NOT NULL, -- ex: "Janvier 2024"
    montant DECIMAL(10,2) NOT NULL,
    montant_paye DECIMAL(10,2) DEFAULT 0,
    consommation DECIMAL(10,2), -- en kWh
    date_emission TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_echeance TIMESTAMP WITH TIME ZONE NOT NULL,
    date_paiement TIMESTAMP WITH TIME ZONE,
    statut TEXT DEFAULT 'impayee' CHECK (statut IN ('impayee', 'payee', 'en-retard', 'partiellement-payee', 'annulee')),
    mode_paiement TEXT CHECK (mode_paiement IN ('especes', 'carte', 'virement', 'moncash', 'natcash')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_factures_numero ON public.factures(numero_facture);
CREATE INDEX IF NOT EXISTS idx_factures_client_id ON public.factures(client_id);
CREATE INDEX IF NOT EXISTS idx_factures_statut ON public.factures(statut);
CREATE INDEX IF NOT EXISTS idx_factures_date_echeance ON public.factures(date_echeance);

-- ==========================================
-- 6. TABLE NOTIFICATIONS
-- ==========================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    utilisateur_id UUID REFERENCES public.utilisateurs(id) ON DELETE CASCADE,
    titre TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('panne', 'intervention', 'facture', 'systeme', 'alerte')),
    priorite TEXT DEFAULT 'normale' CHECK (priorite IN ('haute', 'normale', 'basse')),
    lue BOOLEAN DEFAULT FALSE,
    date_creation TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    date_lecture TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_notifications_utilisateur ON public.notifications(utilisateur_id);
CREATE INDEX IF NOT EXISTS idx_notifications_lue ON public.notifications(lue);
CREATE INDEX IF NOT EXISTS idx_notifications_date ON public.notifications(date_creation);

-- ==========================================
-- 7. TABLE PLANIFICATION (pour le calendrier)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.planification (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    intervention_id UUID REFERENCES public.interventions(id) ON DELETE CASCADE,
    technicien_id UUID REFERENCES public.utilisateurs(id) ON DELETE CASCADE,
    titre TEXT NOT NULL,
    description TEXT,
    date_debut TIMESTAMP WITH TIME ZONE NOT NULL,
    date_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    statut TEXT DEFAULT 'planifie' CHECK (statut IN ('planifie', 'en-cours', 'termine', 'annule')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour recherches fréquentes
CREATE INDEX IF NOT EXISTS idx_planification_technicien ON public.planification(technicien_id);
CREATE INDEX IF NOT EXISTS idx_planification_date_debut ON public.planification(date_debut);
CREATE INDEX IF NOT EXISTS idx_planification_statut ON public.planification(statut);

-- ==========================================
-- 8. FONCTION TRIGGER - Mise à jour automatique updated_at
-- ==========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger à toutes les tables
CREATE TRIGGER update_utilisateurs_updated_at BEFORE UPDATE ON public.utilisateurs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pannes_updated_at BEFORE UPDATE ON public.pannes FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_interventions_updated_at BEFORE UPDATE ON public.interventions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_factures_updated_at BEFORE UPDATE ON public.factures FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_planification_updated_at BEFORE UPDATE ON public.planification FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 9. DONNÉES DE TEST (OPTIONNEL)
-- ==========================================
-- Décommentez cette section si vous voulez des données de démo

/*
-- Insérer des utilisateurs de test
INSERT INTO public.utilisateurs (email, nom, prenom, role, telephone) VALUES
('admin@edh.ht', 'Admin', 'EDH', 'admin', '+509-1234-5678'),
('tech@edh.ht', 'Dupont', 'Jean', 'technicien', '+509-2345-6789'),
('chef@edh.ht', 'Martin', 'Pierre', 'chef-technicien', '+509-3456-7890'),
('agent@edh.ht', 'Bernard', 'Marie', 'agent', '+509-4567-8901'),
('client@edh.ht', 'Client', 'Test', 'client', '+509-5678-9012');
*/

-- ==========================================
-- 10. POLITIQUES RLS (Row Level Security) - OPTIONNEL
-- ==========================================
-- Décommentez pour activer la sécurité au niveau des lignes

/*
-- Activer RLS sur toutes les tables
ALTER TABLE public.utilisateurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pannes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interventions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.factures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planification ENABLE ROW LEVEL SECURITY;

-- Politique: Les utilisateurs peuvent voir leurs propres données
CREATE POLICY "Utilisateurs peuvent voir leur profil" ON public.utilisateurs
    FOR SELECT USING (auth.uid() = id);

-- Politique: Les clients peuvent voir uniquement leurs pannes
CREATE POLICY "Clients voient leurs pannes" ON public.pannes
    FOR SELECT USING (client_id = auth.uid());

-- etc... (ajoutez plus de politiques selon vos besoins)
*/

-- ==========================================
-- FIN DU SCHÉMA
-- ==========================================
-- Votre base de données EDH est maintenant prête ! 🎉
