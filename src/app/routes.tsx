import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { DashboardLayout } from "./components/DashboardLayout";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { GestionPannes } from "./pages/GestionPannes";
import { GestionInterventions } from "./pages/GestionInterventions";
import { GestionClients } from "./pages/GestionClients";
import { PlanificationTravaux } from "./pages/PlanificationTravaux";
import { Factures } from "./pages/Factures";
import { EspaceClient } from "./pages/client/EspaceClient";
import { Notifications } from "./pages/Notifications";
import { GestionUtilisateurs } from "./pages/GestionUtilisateurs";
import { TechnicienDashboard } from "./pages/technicien/Dashboard";
import { ChefTechnicienDashboard } from "./pages/chef-technicien/Dashboard";
import { AgentDashboard } from "./pages/agent/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <DashboardLayout role="admin" />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "pannes", element: <GestionPannes /> },
      { path: "interventions", element: <GestionInterventions /> },
      { path: "clients", element: <GestionClients /> },
      { path: "planning", element: <PlanificationTravaux /> },
      { path: "factures", element: <Factures /> },
      { path: "notifications", element: <Notifications /> },
      { path: "utilisateurs", element: <GestionUtilisateurs /> },
    ],
  },
  {
    path: "/technicien",
    element: <DashboardLayout role="technicien" />,
    children: [
      { index: true, element: <TechnicienDashboard /> },
      { path: "interventions", element: <GestionInterventions /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
  {
    path: "/chef-technicien",
    element: <DashboardLayout role="chef-technicien" />,
    children: [
      { index: true, element: <ChefTechnicienDashboard /> },
      { path: "pannes", element: <GestionPannes /> },
      { path: "interventions", element: <GestionInterventions /> },
      { path: "planning", element: <PlanificationTravaux /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
  {
    path: "/agent",
    element: <DashboardLayout role="agent" />,
    children: [
      { index: true, element: <AgentDashboard /> },
      { path: "pannes", element: <GestionPannes /> },
      { path: "clients", element: <GestionClients /> },
      { path: "factures", element: <Factures /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
  {
    path: "/client",
    element: <DashboardLayout role="client" />,
    children: [
      { index: true, element: <EspaceClient /> },
      { path: "notifications", element: <Notifications /> },
    ],
  },
]);
