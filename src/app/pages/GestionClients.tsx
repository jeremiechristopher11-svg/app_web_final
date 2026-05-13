import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Plus, Search, Edit, Trash2, Phone, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import { toast } from "sonner";

type Client = {
  id: string;
  nom: string;
  adresse: string;
  numeroCompteur: string;
  telephone: string;
  email: string;
  type: "Ménage" | "Entreprise";
};

const mockClients: Client[] = [
  {
    id: "C001",
    nom: "Jean Baptiste",
    adresse: "Cité Militaire, Port-au-Prince",
    numeroCompteur: "EDH-001-2024",
    telephone: "+509 3456-7890",
    email: "jean.baptiste@email.ht",
    type: "Ménage",
  },
  {
    id: "C002",
    nom: "Marie Dupont",
    adresse: "Delmas 33",
    numeroCompteur: "EDH-002-2024",
    telephone: "+509 3123-4567",
    email: "marie.dupont@email.ht",
    type: "Ménage",
  },
  {
    id: "C003",
    nom: "Pierre Louis",
    adresse: "Pétion-Ville, Rue Lambert",
    numeroCompteur: "EDH-003-2024",
    telephone: "+509 3789-0123",
    email: "pierre.louis@email.ht",
    type: "Ménage",
  },
  {
    id: "C004",
    nom: "Restaurant Le Coin",
    adresse: "Avenue Martin Luther King",
    numeroCompteur: "EDH-004-2024",
    telephone: "+509 2987-6543",
    email: "contact@lecoin.ht",
    type: "Entreprise",
  },
  {
    id: "C005",
    nom: "Sophie Charles",
    adresse: "Tabarre 27",
    numeroCompteur: "EDH-005-2024",
    telephone: "+509 3654-3210",
    email: "sophie.charles@email.ht",
    type: "Ménage",
  },
];

export function GestionClients() {
  const [clients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);

  const filteredClients = clients.filter(
    (client) =>
      client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.numeroCompteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.adresse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClient = () => {
    toast.success("Nouveau client ajouté avec succès");
    setSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Gestion des clients</h1>
          <p className="text-gray-500 mt-1">Base de données des clients EDH</p>
        </div>
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button
              className="text-white"
              style={{ backgroundColor: "#F5A623" }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter client
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Nouveau client</SheetTitle>
              <SheetDescription>
                Enregistrer un nouveau client dans le système
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 py-6">
              <div className="space-y-2">
                <Label htmlFor="nom">Nom complet *</Label>
                <Input id="nom" placeholder="Nom du client" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type de client</Label>
                <select
                  id="type"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="menage">Ménage</option>
                  <option value="entreprise">Entreprise</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="adresse">Adresse *</Label>
                <Input id="adresse" placeholder="Adresse complète" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="compteur">Numéro de compteur</Label>
                <Input id="compteur" placeholder="EDH-XXX-2026" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input id="telephone" placeholder="+509 XXXX-XXXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.ht" />
              </div>
              <Button
                onClick={handleAddClient}
                className="w-full text-white"
                style={{ backgroundColor: "#F5A623" }}
              >
                Enregistrer
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, numéro de compteur ou adresse..."
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
          <CardTitle>Liste des clients ({filteredClients.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Numéro compteur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div>
                      <p style={{ color: "#1A1A1A" }}>{client.nom}</p>
                      <p className="text-xs text-gray-500">{client.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs"
                      style={{
                        backgroundColor: client.type === "Entreprise" ? "#5B9BD520" : "#4CAF5020",
                        color: client.type === "Entreprise" ? "#5B9BD5" : "#4CAF50",
                      }}
                    >
                      {client.type}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">{client.adresse}</TableCell>
                  <TableCell className="font-mono text-sm">{client.numeroCompteur}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{client.telephone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="truncate max-w-[150px]">{client.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
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
