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
import { Plus, Search, Eye, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

type Panne = {
  id: string;
  client: string;
  description: string;
  status: "en-attente" | "en-cours" | "termine" | "assigne";
  date: string;
  adresse: string;
};

const mockPannes: Panne[] = [
  {
    id: "P001",
    client: "Jean Baptiste",
    description: "Coupure de courant complète",
    status: "en-attente",
    date: "2026-04-02",
    adresse: "Cité Militaire, Port-au-Prince",
  },
  {
    id: "P002",
    client: "Marie Dupont",
    description: "Tension faible, fluctuations",
    status: "assigne",
    date: "2026-04-01",
    adresse: "Delmas 33",
  },
  {
    id: "P003",
    client: "Pierre Louis",
    description: "Câble endommagé après tempête",
    status: "en-cours",
    date: "2026-03-31",
    adresse: "Pétion-Ville, Rue Lambert",
  },
  {
    id: "P004",
    client: "Sophie Charles",
    description: "Compteur défectueux",
    status: "termine",
    date: "2026-03-30",
    adresse: "Tabarre 27",
  },
  {
    id: "P005",
    client: "Restaurant Le Coin",
    description: "Disjoncteur défaillant",
    status: "en-attente",
    date: "2026-04-02",
    adresse: "Avenue Martin Luther King",
  },
];

export function GestionPannes() {
  const [pannes] = useState<Panne[]>(mockPannes);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredPannes = pannes.filter((panne) => {
    const matchesSearch =
      panne.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panne.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panne.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || panne.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleNewPanne = () => {
    toast.success("Nouvelle panne enregistrée");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Gestion des pannes</h1>
          <p className="text-gray-500 mt-1">Suivi et gestion des pannes signalées</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-white"
              style={{ backgroundColor: "#F5A623" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle panne
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enregistrer une nouvelle panne</DialogTitle>
              <DialogDescription>
                Remplissez les informations sur la panne signalée
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Input id="client" placeholder="Nom du client" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse</Label>
                <Input id="adresse" placeholder="Adresse complète" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez le problème..."
                  rows={4}
                />
              </div>
              <Button
                onClick={handleNewPanne}
                className="w-full text-white"
                style={{ backgroundColor: "#F5A623" }}
              >
                Enregistrer
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Rechercher par ID, client ou description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filtrer par statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="en-attente">En attente</SelectItem>
                <SelectItem value="assigne">Assigné</SelectItem>
                <SelectItem value="en-cours">En cours</SelectItem>
                <SelectItem value="termine">Terminé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des pannes ({filteredPannes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPannes.map((panne) => (
                <TableRow key={panne.id}>
                  <TableCell className="font-mono">{panne.id}</TableCell>
                  <TableCell>{panne.client}</TableCell>
                  <TableCell className="max-w-xs truncate">{panne.adresse}</TableCell>
                  <TableCell className="max-w-xs truncate">{panne.description}</TableCell>
                  <TableCell>
                    <StatusBadge status={panne.status} />
                  </TableCell>
                  <TableCell>{new Date(panne.date).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
