import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Users, AlertCircle, FileText, Phone } from "lucide-react";
import { StatusBadge } from "../../components/StatusBadge";

const recentTickets = [
  {
    id: "T001",
    client: "Jean Baptiste",
    type: "Panne",
    description: "Coupure de courant depuis ce matin",
    status: "en-cours" as const,
    time: "Il y a 15 min",
  },
  {
    id: "T002",
    client: "Marie Dupont",
    type: "Facture",
    description: "Question sur la facture de mars",
    status: "en-attente" as const,
    time: "Il y a 30 min",
  },
  {
    id: "T003",
    client: "Restaurant Le Coin",
    type: "Information",
    description: "Demande de devis pour nouvelle installation",
    status: "termine" as const,
    time: "Il y a 1h",
  },
];

const clientsContacted = [
  { client: "Sophie Charles", reason: "Suivi facture", time: "10:30" },
  { client: "Pierre Louis", reason: "Confirmation intervention", time: "11:15" },
  { client: "Jean Baptiste", reason: "Mise à jour panne", time: "14:00" },
];

export function AgentDashboard() {
  const pendingTickets = recentTickets.filter((t) => t.status === "en-attente").length;
  const activeTickets = recentTickets.filter((t) => t.status === "en-cours").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Tableau de bord - Agent service client</h1>
        <p className="text-gray-500 mt-1">Support et assistance aux clients EDH</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Demandes en attente</p>
                <p className="text-3xl mt-2" style={{ color: "#F5A623" }}>
                  {pendingTickets}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#F5A62320" }}
              >
                <AlertCircle className="w-6 h-6" style={{ color: "#F5A623" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">En cours</p>
                <p className="text-3xl mt-2" style={{ color: "#5B9BD5" }}>
                  {activeTickets}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#5B9BD520" }}
              >
                <FileText className="w-6 h-6" style={{ color: "#5B9BD5" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Clients contactés</p>
                <p className="text-3xl mt-2" style={{ color: "#4CAF50" }}>
                  {clientsContacted.length}
                </p>
              </div>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#4CAF5020" }}
              >
                <Phone className="w-6 h-6" style={{ color: "#4CAF50" }} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total clients</p>
                <p className="text-3xl mt-2" style={{ color: "#1A3A5C" }}>248</p>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>Demandes récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-[#F5A623] transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm" style={{ color: "#F5A623" }}>
                          {ticket.id}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{ticket.type}</span>
                      </div>
                      <p className="text-sm" style={{ color: "#1A1A1A" }}>{ticket.client}</p>
                      <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{ticket.time}</p>
                    </div>
                    <StatusBadge status={ticket.status} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Clients Contacted Today */}
        <Card>
          <CardHeader>
            <CardTitle>Clients contactés aujourd'hui</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clientsContacted.map((contact, index) => (
                <div
                  key={index}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5" style={{ color: "#4CAF50" }} />
                    <div className="flex-1">
                      <p className="text-sm" style={{ color: "#1A1A1A" }}>{contact.client}</p>
                      <p className="text-xs text-gray-500 mt-1">{contact.reason}</p>
                    </div>
                    <span className="text-xs text-gray-400">{contact.time}</span>
                  </div>
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
              <p className="text-sm" style={{ color: "#1A1A1A" }}>Nouvelle demande</p>
            </button>
            <button
              className="p-4 rounded-lg border border-gray-200 hover:border-[#F5A623] transition-colors text-center"
            >
              <Users className="w-8 h-8 mx-auto mb-2" style={{ color: "#1A3A5C" }} />
              <p className="text-sm" style={{ color: "#1A1A1A" }}>Rechercher client</p>
            </button>
            <button
              className="p-4 rounded-lg border border-gray-200 hover:border-[#F5A623] transition-colors text-center"
            >
              <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: "#4CAF50" }} />
              <p className="text-sm" style={{ color: "#1A1A1A" }}>Consulter factures</p>
            </button>
            <button
              className="p-4 rounded-lg border border-gray-200 hover:border-[#F5A623] transition-colors text-center"
            >
              <Phone className="w-8 h-8 mx-auto mb-2" style={{ color: "#5B9BD5" }} />
              <p className="text-sm" style={{ color: "#1A1A1A" }}>Journal d'appels</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
