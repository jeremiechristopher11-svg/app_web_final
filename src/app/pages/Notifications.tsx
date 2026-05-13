import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Bell, Check, Trash2, AlertCircle, Wrench, FileText, Users } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";

type Notification = {
  id: string;
  type: "panne" | "intervention" | "facture" | "system";
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "panne",
    title: "Nouvelle panne signalée",
    message: "Une panne a été signalée à Cité Militaire par Jean Baptiste",
    time: "Il y a 5 min",
    read: false,
  },
  {
    id: "2",
    type: "intervention",
    title: "Intervention terminée",
    message: "Marc Antoine a terminé l'intervention P003 à Delmas 33",
    time: "Il y a 15 min",
    read: false,
  },
  {
    id: "3",
    type: "facture",
    title: "Facture envoyée",
    message: "La facture F2026-001 a été envoyée à Jean Baptiste",
    time: "Il y a 1h",
    read: false,
  },
  {
    id: "4",
    type: "system",
    title: "Mise à jour système",
    message: "Le système sera mis à jour ce soir à 23h00",
    time: "Il y a 2h",
    read: true,
  },
  {
    id: "5",
    type: "intervention",
    title: "Intervention assignée",
    message: "Lucie Moreau a été assignée à la panne P002",
    time: "Il y a 3h",
    read: true,
  },
  {
    id: "6",
    type: "panne",
    title: "Panne mise à jour",
    message: "Le statut de la panne P005 a été changé en 'En cours'",
    time: "Il y a 5h",
    read: true,
  },
];

const typeConfig = {
  panne: { icon: AlertCircle, color: "#F5A623", bg: "#F5A62310" },
  intervention: { icon: Wrench, color: "#5B9BD5", bg: "#5B9BD510" },
  facture: { icon: FileText, color: "#4CAF50", bg: "#4CAF5010" },
  system: { icon: Bell, color: "#1A3A5C", bg: "#1A3A5C10" },
};

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl" style={{ color: "#1A1A1A" }}>Centre de notifications</h1>
          <p className="text-gray-500 mt-1">
            {unreadCount > 0 ? `${unreadCount} notification(s) non lue(s)` : "Aucune notification non lue"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={markAllAsRead}
          >
            <Check className="w-4 h-4 mr-2" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Bell className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400">Aucune notification</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;
            return (
              <Card
                key={notification.id}
                className={`transition-all ${
                  notification.read ? "opacity-60" : "border-l-4"
                }`}
                style={
                  !notification.read
                    ? { borderLeftColor: config.color }
                    : {}
                }
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: config.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: config.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium" style={{ color: "#1A1A1A" }}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: config.color }}
                              />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.time}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
