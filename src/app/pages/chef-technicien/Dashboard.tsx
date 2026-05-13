import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, Wrench, AlertCircle, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatusBadge } from "../../components/StatusBadge";

const teamPerformance = [
  { technicien: "Marc Antoine", interventions: 15, enCours: 2 },
  { technicien: "Lucie Moreau", interventions: 12, enCours: 1 },
  { technicien: "Jacques Pierre", interventions: 18, enCours: 3 },
  { technicien: "André Joseph", interventions: 9, enCours: 1 },
];

const recentPannes = [
  {
    id: "P001",
    client: "Jean Baptiste",
    description: "Coupure de courant complète",
    status: "assigne" as const,
    technicien: "Marc Antoine",
  },
  {
    id: "P002",
    client: "Marie Dupont",
    description: "Tension faible, fluctuations",
    status: "en-cours" as const,
    technicien: "Jacques Pierre",
  },
  {
    id: "P005",
    client: "Restaurant Le Coin",
    description: "Disjoncteur défaillant",
    status: "en-attente" as const,
    technicien: "-",
  },
];

export function ChefTechnicienDashboard() {
  const totalInterventions = teamPerformance.reduce((acc, t) => acc + t.interventions, 0);
  const activeInterventions = teamPerformance.reduce((acc, t) => acc + t.enCours, 0);
  const unassignedPannes = recentPannes.filter((p) => p.status === "en-attente").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Tableau de bord - Chef des techniciens</h1>
        <p className="text-gray-500 mt-1">Supervision de l'équipe technique</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Équipe</p>
                <p className="text-3xl mt-2" style={{ color: "#1A3A5C" }}>
                  {teamPerformance.length}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#1A3A5C20" }}
              >
                <Users className="w-6 h-6" style={{ color: "#1A3A5C" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Interventions totales</p>
                <p className="text-3xl mt-2" style={{ color: "#5B9BD5" }}>
                  {totalInterventions}
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
                <p className="text-sm text-gray-500">En cours</p>
                <p className="text-3xl mt-2" style={{ color: "#F5A623" }}>
                  {activeInterventions}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#F5A62320" }}
              >
                <TrendingUp className="w-6 h-6" style={{ color: "#F5A623" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Non assignées</p>
                <p className="text-3xl mt-2" style={{ color: "#EF4444" }}>
                  {unassignedPannes}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#EF444420" }}
              >
                <AlertCircle className="w-6 h-6" style={{ color: "#EF4444" }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance de l'équipe</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="technicien" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="interventions" fill="#5B9BD5" name="Interventions" />
                <Bar dataKey="enCours" fill="#F5A623" name="En cours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Pannes */}
        <Card>
          <CardHeader>
            <CardTitle>Pannes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPannes.map((panne) => (
                <div
                  key={panne.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm" style={{ color: "#F5A623" }}>
                          {panne.id}
                        </span>
                        <StatusBadge status={panne.status} />
                      </div>
                      <p className="text-sm" style={{ color: "#1A1A1A" }}>{panne.client}</p>
                      <p className="text-sm text-gray-500 mt-1">{panne.description}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {panne.status !== "en-attente"
                          ? `Assigné à: ${panne.technicien}`
                          : "Non assigné"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Vue d'ensemble de l'équipe</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamPerformance.map((tech) => (
              <div
                key={tech.technicien}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <h4 className="font-medium" style={{ color: "#1A1A1A" }}>{tech.technicien}</h4>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Total</span>
                    <span style={{ color: "#5B9BD5" }}>{tech.interventions}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">En cours</span>
                    <span style={{ color: "#F5A623" }}>{tech.enCours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
