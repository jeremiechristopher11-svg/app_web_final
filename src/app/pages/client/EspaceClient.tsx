import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { FileText, AlertCircle, Bell, Download } from "lucide-react";
import edhLogo from "../../../imports/edh.jpg";
import { StatusBadge } from "../../components/StatusBadge";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

type Demande = {
  id: string;
  type: string;
  description: string;
  status: "en-attente" | "en-cours" | "termine";
  date: string;
};

const mockDemandes: Demande[] = [
  {
    id: "D001",
    type: "Panne",
    description: "Coupure de courant depuis ce matin",
    status: "en-cours",
    date: "2026-04-01",
  },
  {
    id: "D002",
    type: "Information",
    description: "Question sur ma facture",
    status: "termine",
    date: "2026-03-28",
  },
];

const mockFactures = [
  {
    id: "F2026-001",
    periode: "Mars 2026",
    montant: 3450,
    status: "en-attente" as const,
    dateEmission: "2026-04-01",
  },
  {
    id: "F2025-012",
    periode: "Février 2026",
    montant: 3200,
    status: "termine" as const,
    dateEmission: "2026-03-01",
  },
  {
    id: "F2025-011",
    periode: "Janvier 2026",
    montant: 3780,
    status: "termine" as const,
    dateEmission: "2026-02-01",
  },
];

export function EspaceClient() {
  const [demandes] = useState<Demande[]>(mockDemandes);
  const [problemDescription, setProblemDescription] = useState("");

  const handleSubmitProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemDescription.trim()) {
      toast.error("Veuillez décrire le problème");
      return;
    }
    toast.success("Votre problème a été signalé. Un technicien vous contactera bientôt.");
    setProblemDescription("");
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card
        className="border-t-4"
        style={{
          borderTopColor: "#F5A623",
          background: "linear-gradient(135deg, #F5A62310 0%, #5B9BD510 100%)",
        }}
      >
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <img src={edhLogo} alt="EDH" className="w-16 h-16 object-contain" />
            <div>
              <h1 className="text-2xl" style={{ color: "#1A1A1A" }}>
                Bienvenue dans votre espace client
              </h1>
              <p className="text-gray-600 mt-1">
                Gérez vos factures et signalez les problèmes en toute simplicité
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Signaler un problème */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" style={{ color: "#F5A623" }} />
                <CardTitle>Signaler un problème</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitProblem} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="problem">Description du problème *</Label>
                  <Textarea
                    id="problem"
                    placeholder="Décrivez le problème que vous rencontrez (coupure de courant, tension faible, etc.)"
                    rows={5}
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full text-white"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  Envoyer la demande
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Mes demandes */}
          <Card>
            <CardHeader>
              <CardTitle>Historique de mes demandes</CardTitle>
            </CardHeader>
            <CardContent>
              {demandes.length === 0 ? (
                <p className="text-center text-gray-400 py-8">Aucune demande pour le moment</p>
              ) : (
                <div className="space-y-3">
                  {demandes.map((demande) => (
                    <div
                      key={demande.id}
                      className="p-4 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm text-gray-500">{demande.id}</span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{demande.type}</span>
                          </div>
                          <p className="text-sm mt-1" style={{ color: "#1A1A1A" }}>
                            {demande.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(demande.date).toLocaleDateString("fr-FR")}
                          </p>
                        </div>
                        <StatusBadge status={demande.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Factures */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5" style={{ color: "#4CAF50" }} />
                <CardTitle>Mes factures</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockFactures.map((facture) => (
                  <div
                    key={facture.id}
                    className="p-4 border border-gray-200 rounded-lg hover:border-[#F5A623] transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-medium" style={{ color: "#1A1A1A" }}>
                          {facture.periode}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">{facture.id}</p>
                      </div>
                      <StatusBadge status={facture.status} />
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <p className="text-lg font-medium" style={{ color: "#4CAF50" }}>
                        {facture.montant.toLocaleString("fr-HT")} HTG
                      </p>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Informations utiles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm" style={{ color: "#5B9BD5" }}>
                  📞 Service client: +509 2222-0000
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm" style={{ color: "#4CAF50" }}>
                  ⚡ Urgences 24/7: +509 2222-1111
                </p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm" style={{ color: "#F5A623" }}>
                  📧 Email: contact@edh.ht
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
