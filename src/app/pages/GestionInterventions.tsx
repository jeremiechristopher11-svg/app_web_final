import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { StatusBadge } from "../components/StatusBadge";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

type Intervention = {
  id: string;
  panne: string;
  technicien: string;
  date: string;
  status: "en-cours" | "termine";
  rapport?: string;
};

const mockInterventions: Intervention[] = [
  {
    id: "I001",
    panne: "P003",
    technicien: "Marc Antoine",
    date: "2026-04-01",
    status: "en-cours",
  },
  {
    id: "I002",
    panne: "P004",
    technicien: "Lucie Moreau",
    date: "2026-03-30",
    status: "termine",
    rapport: "Compteur remplacé avec succès. Test effectué.",
  },
  {
    id: "I003",
    panne: "P002",
    technicien: "Jacques Pierre",
    date: "2026-04-01",
    status: "en-cours",
  },
];

export function GestionInterventions() {
  const [interventions] = useState<Intervention[]>(mockInterventions);
  const [selectedPanne, setSelectedPanne] = useState("");
  const [selectedTechnicien, setSelectedTechnicien] = useState("");
  const [rapport, setRapport] = useState("");
  const [signatureData, setSignatureData] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPanne || !selectedTechnicien) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }
    toast.success("Intervention enregistrée avec succès");
    // Reset form
    setSelectedPanne("");
    setSelectedTechnicien("");
    setRapport("");
    setSignatureData("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Gestion des interventions</h1>
        <p className="text-gray-500 mt-1">Créer et suivre les interventions techniques</p>
      </div>

      <Tabs defaultValue="form" className="space-y-6">
        <TabsList>
          <TabsTrigger value="form">Nouvelle intervention</TabsTrigger>
          <TabsTrigger value="list">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="space-y-6">
          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle>Créer une intervention</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="panne">Panne liée *</Label>
                    <Select value={selectedPanne} onValueChange={setSelectedPanne}>
                      <SelectTrigger id="panne">
                        <SelectValue placeholder="Sélectionner une panne" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="P001">P001 - Jean Baptiste</SelectItem>
                        <SelectItem value="P002">P002 - Marie Dupont</SelectItem>
                        <SelectItem value="P003">P003 - Pierre Louis</SelectItem>
                        <SelectItem value="P005">P005 - Restaurant Le Coin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="technicien">Technicien assigné *</Label>
                    <Select value={selectedTechnicien} onValueChange={setSelectedTechnicien}>
                      <SelectTrigger id="technicien">
                        <SelectValue placeholder="Sélectionner un technicien" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech1">Marc Antoine</SelectItem>
                        <SelectItem value="tech2">Lucie Moreau</SelectItem>
                        <SelectItem value="tech3">Jacques Pierre</SelectItem>
                        <SelectItem value="tech4">André Joseph</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date d'intervention</Label>
                    <Input id="date" type="date" defaultValue="2026-04-02" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="heure">Heure</Label>
                    <Input id="heure" type="time" defaultValue="09:00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rapport">Rapport d'intervention</Label>
                  <Textarea
                    id="rapport"
                    placeholder="Décrivez les travaux effectués, les matériaux utilisés, etc..."
                    rows={6}
                    value={rapport}
                    onChange={(e) => setRapport(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Signature numérique</Label>
                  <div
                    className="border-2 border-dashed border-gray-300 rounded-lg h-48 flex items-center justify-center cursor-pointer hover:border-[#F5A623] transition-colors"
                    onClick={() => setSignatureData("signature-data")}
                  >
                    {signatureData ? (
                      <p className="text-gray-600">✓ Signature capturée</p>
                    ) : (
                      <p className="text-gray-400">Cliquez pour signer</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full text-white"
                  style={{ backgroundColor: "#F5A623" }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Enregistrer l'intervention
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          {/* List of interventions */}
          <Card>
            <CardHeader>
              <CardTitle>Historique des interventions ({interventions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Panne</TableHead>
                    <TableHead>Technicien</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {interventions.map((intervention) => (
                    <TableRow key={intervention.id}>
                      <TableCell className="font-mono">{intervention.id}</TableCell>
                      <TableCell className="font-mono">{intervention.panne}</TableCell>
                      <TableCell>{intervention.technicien}</TableCell>
                      <TableCell>
                        {new Date(intervention.date).toLocaleDateString("fr-FR")}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={intervention.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Voir rapport
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
