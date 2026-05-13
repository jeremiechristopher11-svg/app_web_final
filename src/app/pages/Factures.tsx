import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { StatusBadge } from "../components/StatusBadge";
import { Search, Send, Download, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import edhLogo from "../../imports/edh.jpg";

type Facture = {
  id: string;
  client: string;
  montant: number;
  date: string;
  status: "en-attente" | "en-cours" | "termine";
  periode: string;
};

const mockFactures: Facture[] = [
  {
    id: "F2026-001",
    client: "Jean Baptiste",
    montant: 3450,
    date: "2026-04-01",
    status: "en-attente",
    periode: "Mars 2026",
  },
  {
    id: "F2026-002",
    client: "Marie Dupont",
    montant: 2890,
    date: "2026-04-01",
    status: "termine",
    periode: "Mars 2026",
  },
  {
    id: "F2026-003",
    client: "Pierre Louis",
    montant: 4120,
    date: "2026-04-01",
    status: "en-cours",
    periode: "Mars 2026",
  },
  {
    id: "F2026-004",
    client: "Restaurant Le Coin",
    montant: 18750,
    date: "2026-04-01",
    status: "termine",
    periode: "Mars 2026",
  },
  {
    id: "F2026-005",
    client: "Sophie Charles",
    montant: 3120,
    date: "2026-04-01",
    status: "en-attente",
    periode: "Mars 2026",
  },
];

export function Factures() {
  const [factures] = useState<Facture[]>(mockFactures);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewFacture, setPreviewFacture] = useState<Facture | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredFactures = factures.filter(
    (facture) =>
      facture.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facture.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendFacture = (facture: Facture) => {
    toast.success(`Facture ${facture.id} envoyée à ${facture.client}`);
  };

  const handleDownloadPDF = (facture: Facture) => {
    setPreviewFacture(facture);
    setDialogOpen(true);
  };

  const generatePDF = () => {
    toast.success("PDF téléchargé avec succès");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Gestion des factures</h1>
        <p className="text-gray-500 mt-1">Émission et suivi des factures clients</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher par numéro de facture ou nom de client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des factures ({filteredFactures.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Numéro</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Date d'émission</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFactures.map((facture) => (
                <TableRow key={facture.id}>
                  <TableCell className="font-mono">{facture.id}</TableCell>
                  <TableCell>{facture.client}</TableCell>
                  <TableCell>{facture.periode}</TableCell>
                  <TableCell>
                    <span className="font-medium" style={{ color: "#4CAF50" }}>
                      {facture.montant.toLocaleString("fr-HT")} HTG
                    </span>
                  </TableCell>
                  <TableCell>
                    {new Date(facture.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={facture.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadPDF(facture)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadPDF(facture)}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSendFacture(facture)}
                        style={{ color: "#F5A623" }}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* PDF Preview Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Aperçu de la facture</DialogTitle>
            <DialogDescription>
              Facture {previewFacture?.id}
            </DialogDescription>
          </DialogHeader>
          {previewFacture && (
            <div className="space-y-6 py-4">
              {/* Invoice Header */}
              <div className="flex items-start justify-between border-b pb-6">
                <div>
                  <img src={edhLogo} alt="EDH" className="w-24 h-24 object-contain" />
                </div>
                <div className="text-right">
                  <h2 className="text-2xl" style={{ color: "#1A1A1A" }}>FACTURE</h2>
                  <p className="text-sm text-gray-500 mt-1">{previewFacture.id}</p>
                  <p className="text-sm text-gray-500">
                    Date: {new Date(previewFacture.date).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              {/* EDH Info */}
              <div>
                <h3 className="font-medium mb-2" style={{ color: "#1A1A1A" }}>
                  ÉLECTRICITÉ D'HAÏTI
                </h3>
                <p className="text-sm text-gray-600">Angle Rues Oswald Durand et des Miracles</p>
                <p className="text-sm text-gray-600">Port-au-Prince, Haïti</p>
                <p className="text-sm text-gray-600">Tél: +509 2222-0000</p>
              </div>

              {/* Client Info */}
              <div>
                <h3 className="font-medium mb-2" style={{ color: "#1A1A1A" }}>
                  Facturé à:
                </h3>
                <p className="text-sm text-gray-600">{previewFacture.client}</p>
                <p className="text-sm text-gray-600">Client EDH</p>
              </div>

              {/* Invoice Details */}
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm" style={{ color: "#1A1A1A" }}>
                        Description
                      </th>
                      <th className="px-4 py-3 text-right text-sm" style={{ color: "#1A1A1A" }}>
                        Montant
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t">
                      <td className="px-4 py-3 text-sm text-gray-600">
                        Consommation électrique - {previewFacture.periode}
                      </td>
                      <td className="px-4 py-3 text-sm text-right text-gray-600">
                        {previewFacture.montant.toLocaleString("fr-HT")} HTG
                      </td>
                    </tr>
                    <tr className="border-t bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium" style={{ color: "#1A1A1A" }}>
                        Total
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-right" style={{ color: "#4CAF50" }}>
                        {previewFacture.montant.toLocaleString("fr-HT")} HTG
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="text-center text-sm text-gray-500 pt-6 border-t">
                <p>Merci de votre confiance</p>
                <p className="mt-1">Pour toute question, contactez-nous au +509 2222-0000</p>
              </div>

              <Button
                onClick={generatePDF}
                className="w-full text-white"
                style={{ backgroundColor: "#F5A623" }}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger PDF
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
