import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Wrench, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";

const myInterventions = [
  {
    id: "I001",
    panne: "P003",
    client: "Pierre Louis",
    adresse: "Pétion-Ville, Rue Lambert",
    description: "Câble endommagé après tempête",
    status: "en-cours" as const,
    date: "2026-04-02",
    heure: "09:00",
  },
  {
    id: "I006",
    panne: "P001",
    client: "Jean Baptiste",
    adresse: "Cité Militaire",
    description: "Coupure de courant complète",
    status: "assigne" as const,
    date: "2026-04-02",
    heure: "14:00",
  },
];

const completedToday = [
  {
    id: "I005",
    panne: "P007",
    client: "Marie Laporte",
    description: "Installation nouveau compteur",
    completedAt: "11:30",
  },
];

export function TechnicienDashboard() {
  const activeInterventions = myInterventions.filter((i) => i.status === "en-cours");
  const assignedInterventions = myInterventions.filter((i) => i.status === "assigne");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Tableau de bord - Technicien</h1>
        <p className="text-gray-500 mt-1">Vos interventions et tâches du jour</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">En cours</p>
                <p className="text-3xl mt-2" style={{ color: "#5B9BD5" }}>
                  {activeInterventions.length}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#5B9BD520" }}
              >
                <Wrench className="w-6 h-6" style={{ color: "#5B9BD5" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">À faire</p>
                <p className="text-3xl mt-2" style={{ color: "#F5A623" }}>
                  {assignedInterventions.length}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#F5A62320" }}
              >
                <Clock className="w-6 h-6" style={{ color: "#F5A623" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Terminées aujourd'hui</p>
                <p className="text-3xl mt-2" style={{ color: "#4CAF50" }}>
                  {completedToday.length}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#4CAF5020" }}
              >
                <CheckCircle className="w-6 h-6" style={{ color: "#4CAF50" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Urgentes</p>
                <p className="text-3xl mt-2" style={{ color: "#EF4444" }}>0</p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#EF444420" }}
              >
                <AlertTriangle className="w-6 h-6" style={{ color: "#EF4444" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interventions du jour */}
      <Card>
        <CardHeader>
          <CardTitle>Mes interventions du jour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myInterventions.map((intervention) => (
              <div
                key={intervention.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-[#F5A623] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-mono text-sm" style={{ color: "#F5A623" }}>
                        {intervention.panne}
                      </span>
                      <span className="text-sm text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{intervention.heure}</span>
                      <StatusBadge status={intervention.status} />
                    </div>
                    <h4 className="font-medium" style={{ color: "#1A1A1A" }}>
                      {intervention.client}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{intervention.adresse}</p>
                    <p className="text-sm text-gray-500 mt-2">{intervention.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Completed today */}
      {completedToday.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Interventions terminées aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedToday.map((intervention) => (
                <div
                  key={intervention.id}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" style={{ color: "#4CAF50" }} />
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: "#1A1A1A" }}>
                        <span className="font-mono">{intervention.panne}</span> - {intervention.client}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {intervention.description} • Terminé à {intervention.completedAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
