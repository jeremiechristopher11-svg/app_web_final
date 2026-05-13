import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Calendar, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { toast } from "sonner";

type Assignment = {
  id: string;
  day: string;
  technicien: string;
  task: string;
  time: string;
  panne: string;
};

const days = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const mockAssignments: Assignment[] = [
  {
    id: "1",
    day: "Lundi",
    technicien: "Marc Antoine",
    task: "Réparer câble",
    time: "09:00",
    panne: "P003",
  },
  {
    id: "2",
    day: "Lundi",
    technicien: "Lucie Moreau",
    task: "Installer compteur",
    time: "14:00",
    panne: "P005",
  },
  {
    id: "3",
    day: "Mardi",
    technicien: "Jacques Pierre",
    task: "Vérifier tension",
    time: "10:00",
    panne: "P002",
  },
  {
    id: "4",
    day: "Mercredi",
    technicien: "Marc Antoine",
    task: "Maintenance préventive",
    time: "08:30",
    panne: "P001",
  },
  {
    id: "5",
    day: "Jeudi",
    technicien: "André Joseph",
    task: "Réparation disjoncteur",
    time: "11:00",
    panne: "P005",
  },
];

const techniciens = ["Marc Antoine", "Lucie Moreau", "Jacques Pierre", "André Joseph"];

export function PlanificationTravaux() {
  const [assignments] = useState<Assignment[]>(mockAssignments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTechnicien, setSelectedTechnicien] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedPanne, setSelectedPanne] = useState("");

  const handleAssign = () => {
    if (!selectedTechnicien || !selectedDay || !selectedPanne) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }
    toast.success("Technicien assigné avec succès");
    setDialogOpen(false);
    setSelectedTechnicien("");
    setSelectedDay("");
    setSelectedPanne("");
  };

  const getAssignmentsForDay = (day: string) => {
    return assignments.filter((a) => a.day === day);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Planification des travaux</h1>
          <p className="text-gray-500 mt-1">Planning hebdomadaire des techniciens</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-white"
              style={{ backgroundColor: "#F5A623" }}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Assigner technicien
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assigner un technicien</DialogTitle>
              <DialogDescription>
                Planifier une intervention pour un technicien
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="panne-assign">Panne</Label>
                <Select value={selectedPanne} onValueChange={setSelectedPanne}>
                  <SelectTrigger id="panne-assign">
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
                <Label htmlFor="tech-assign">Technicien</Label>
                <Select value={selectedTechnicien} onValueChange={setSelectedTechnicien}>
                  <SelectTrigger id="tech-assign">
                    <SelectValue placeholder="Sélectionner un technicien" />
                  </SelectTrigger>
                  <SelectContent>
                    {techniciens.map((tech) => (
                      <SelectItem key={tech} value={tech}>
                        {tech}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="day-assign">Jour</Label>
                <Select value={selectedDay} onValueChange={setSelectedDay}>
                  <SelectTrigger id="day-assign">
                    <SelectValue placeholder="Sélectionner un jour" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map((day) => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAssign}
                className="w-full text-white"
                style={{ backgroundColor: "#F5A623" }}
              >
                Assigner
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" style={{ color: "#F5A623" }} />
            <CardTitle>Semaine du 31 Mars au 5 Avril 2026</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {days.map((day) => {
              const dayAssignments = getAssignmentsForDay(day);
              return (
                <div
                  key={day}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium" style={{ color: "#1A1A1A" }}>{day}</h3>
                    <Badge variant="secondary">{dayAssignments.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {dayAssignments.length === 0 ? (
                      <p className="text-sm text-gray-400 text-center py-8">
                        Aucune intervention planifiée
                      </p>
                    ) : (
                      dayAssignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="p-3 rounded-lg border-l-4"
                          style={{
                            backgroundColor: "#F5A62310",
                            borderLeftColor: "#F5A623",
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-sm" style={{ color: "#1A1A1A" }}>
                                {assignment.technicien}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">{assignment.task}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge
                                  variant="outline"
                                  className="text-xs font-mono"
                                >
                                  {assignment.panne}
                                </Badge>
                                <span className="text-xs text-gray-400">{assignment.time}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Technicians availability */}
      <Card>
        <CardHeader>
          <CardTitle>Disponibilité des techniciens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {techniciens.map((tech) => {
              const techAssignments = assignments.filter((a) => a.technicien === tech);
              return (
                <div
                  key={tech}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <h4 className="font-medium" style={{ color: "#1A1A1A" }}>{tech}</h4>
                  <p className="text-2xl mt-2" style={{ color: "#F5A623" }}>
                    {techAssignments.length}
                  </p>
                  <p className="text-sm text-gray-500">interventions cette semaine</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
