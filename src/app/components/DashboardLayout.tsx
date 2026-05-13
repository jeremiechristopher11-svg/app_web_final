import { Outlet, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import edhLogo from "../../imports/edh.jpg";
import {
  LayoutDashboard,
  AlertCircle,
  Wrench,
  Users,
  Calendar,
  FileText,
  Bell,
  UserCog,
  Menu,
  X,
  Search,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Role = "admin" | "technicien" | "chef-technicien" | "agent" | "client";

interface DashboardLayoutProps {
  role: Role;
}

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
}

const navigationByRole: Record<Role, NavItem[]> = {
  admin: [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/admin" },
    { icon: AlertCircle, label: "Gestion des pannes", path: "/admin/pannes" },
    { icon: Wrench, label: "Interventions", path: "/admin/interventions" },
    { icon: Users, label: "Clients", path: "/admin/clients" },
    { icon: Calendar, label: "Planification", path: "/admin/planning" },
    { icon: FileText, label: "Factures", path: "/admin/factures" },
    { icon: UserCog, label: "Utilisateurs", path: "/admin/utilisateurs" },
  ],
  technicien: [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/technicien" },
    { icon: Wrench, label: "Mes interventions", path: "/technicien/interventions" },
  ],
  "chef-technicien": [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/chef-technicien" },
    { icon: AlertCircle, label: "Pannes", path: "/chef-technicien/pannes" },
    { icon: Wrench, label: "Interventions", path: "/chef-technicien/interventions" },
    { icon: Calendar, label: "Planification", path: "/chef-technicien/planning" },
  ],
  agent: [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/agent" },
    { icon: AlertCircle, label: "Pannes", path: "/agent/pannes" },
    { icon: Users, label: "Clients", path: "/agent/clients" },
    { icon: FileText, label: "Factures", path: "/agent/factures" },
  ],
  client: [
    { icon: LayoutDashboard, label: "Accueil", path: "/client" },
  ],
};

const roleLabels: Record<Role, string> = {
  admin: "Administrateur",
  technicien: "Technicien",
  "chef-technicien": "Chef des techniciens",
  agent: "Agent service client",
  client: "Client",
};

export function DashboardLayout({ role }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = navigationByRole[role];
  const currentPath = location.pathname;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img src={edhLogo} alt="EDH" className="w-12 h-12 object-contain" />
              <div>
                <h1 className="text-sm" style={{ color: "#1A1A1A" }}>EDH</h1>
                <p className="text-xs text-gray-500">Zéro Papier</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  style={isActive ? { backgroundColor: "#F5A623" } : {}}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="h-full px-4 flex items-center justify-between gap-4">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
              <div className="relative w-96 hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher..."
                  className="pl-10 bg-gray-50"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => navigate(`/${role}/notifications`)}
              >
                <Bell className="w-5 h-5" />
                <span
                  className="absolute top-1 right-1 w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#F5A623" }}
                />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback style={{ backgroundColor: "#F5A623", color: "white" }}>
                        {roleLabels[role].substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden md:block">
                      <p className="text-sm" style={{ color: "#1A1A1A" }}>Utilisateur</p>
                      <p className="text-xs text-gray-500">{roleLabels[role]}</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Paramètres
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
