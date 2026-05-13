import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { AlertCircle, Wrench, FileText, Users, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { StatusBadge } from "../../components/StatusBadge";

const kpiData = [
  {
    title: "Total Pannes",
    value: "142",
    change: "+12%",
    trend: "up",
    icon: AlertCircle,
    color: "#F5A623",
  },
  {
    title: "Interventions en cours",
    value: "28",
    change: "-5%",
    trend: "down",
    icon: Wrench,
    color: "#5B9BD5",
  },
  {
    title: "Factures émises",
    value: "1,847",
    change: "+23%",
    trend: "up",
    icon: FileText,
    color: "#4CAF50",
  },
  {
    title: "Clients actifs",
    value: "12,450",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "#1A3A5C",
  },
];

const chartData = [
  { month: "Jan", pannes: 65, interventions: 58 },
  { month: "Fév", pannes: 78, interventions: 72 },
  { month: "Mar", pannes: 90, interventions: 85 },
  { month: "Avr", pannes: 81, interventions: 78 },
  { month: "Mai", pannes: 95, interventions: 89 },
  { month: "Juin", pannes: 112, interventions: 105 },
];

const recentActivity = [
  {
    id: 1,
    type: "panne",
    description: "Nouvelle panne signalée - Cité Militaire",
    status: "en-attente" as const,
    time: "Il y a 5 min",
  },
  {
    id: 2,
    type: "intervention",
    description: "Intervention terminée - Delmas 33",
    status: "termine" as const,
    time: "Il y a 15 min",
  },
  {
    id: 3,
    type: "facture",
    description: "Facture #1847 envoyée",
    status: "en-cours" as const,
    time: "Il y a 1h",
  },
  {
    id: 4,
    type: "panne",
    description: "Panne assignée - Pétion-Ville",
    status: "assigne" as const,
    time: "Il y a 2h",
  },
];

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Tableau de bord</h1>
        <p className="text-gray-500 mt-1">Vue d'ensemble de la plateforme EDH</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
          return (
            <Card key={kpi.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{kpi.title}</p>
                    <p className="text-3xl mt-2" style={{ color: "#1A1A1A" }}>{kpi.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendIcon
                        className="w-4 h-4"
                        style={{ color: kpi.trend === "up" ? "#4CAF50" : "#EF4444" }}
                      />
                      <span
                        className="text-sm"
                        style={{ color: kpi.trend === "up" ? "#4CAF50" : "#EF4444" }}
                      >
                        {kpi.change}
                      </span>
                      <span className="text-sm text-gray-400 ml-1">ce mois</span>
                    </div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${kpi.color}20` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: kpi.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Statistiques mensuelles</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pannes" fill="#F5A623" name="Pannes" />
                <Bar dataKey="interventions" fill="#5B9BD5" name="Interventions" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Activité récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: "#1A1A1A" }}>{activity.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                  </div>
                  <StatusBadge status={activity.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              className="p-4 rounded-lg border border-gray-200 hover:border-[#F5A623] transition-colors text-center"
            >
              <AlertCircle className="w-8 h-8 mx-auto mb-2" style={{ color: "#F5A623" }} />
              <p className="text-sm" style={{ color: "#1A1A1A" }}>Nouvelle panne</p>
            </button>
            <button
              className="p-4 rounded-lg border border-gray-200 hover:border-[#F5A623] transition-colors text-center"
            >
              <Wrench className="w-8 h-8 mx-auto mb-2" style={{ color: "#5B9BD5" }} />
              <p className="text-sm" style={{ color: "#1A1A1A" }}>Assigner intervention</p>
            </button>
            <button
              className="p-4 rounded-lg border border-gray-200 hover:border-[#F5A623] transition-colors text-center"
            >
              <Users className="w-8 h-8 mx-auto mb-2" style={{ color: "#4CAF50" }} />
              <p className="text-sm" style={{ color: "#1A1A1A" }}>Ajouter client</p>
            </button>
            <button
              className="p-4 rounded-lg border border-gray-200 hover:border-[#F5A623] transition-colors text-center"
            >
              <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: "#1A3A5C" }} />
              <p className="text-sm" style={{ color: "#1A1A1A" }}>Émettre facture</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
