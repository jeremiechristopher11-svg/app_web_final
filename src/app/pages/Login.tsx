import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import edhLogo from "../../imports/edh.jpg";
import { toast } from "sonner";
import { Zap } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !role) {
      toast.error("Veuillez remplir tous les champs");
      return;
    }

    // Mock login - redirect based on role
    const roleRoutes: Record<string, string> = {
      admin: "/admin",
      technicien: "/technicien",
      "chef-technicien": "/chef-technicien",
      agent: "/agent",
      client: "/client",
    };

    toast.success(`Connexion réussie en tant que ${role}`);
    navigate(roleRoutes[role]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F4F6F9 0%, #E8EDF3 100%)" }}>
      {/* Background pattern with gear and lightning motif */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, #F5A623 0%, transparent 70%)" }} />
        <Zap className="absolute top-40 right-40 w-32 h-32" style={{ color: "#F5E642" }} />
        <Zap className="absolute bottom-40 left-40 w-24 h-24" style={{ color: "#F5E642" }} />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-t-4" style={{ borderTopColor: "#F5A623" }}>
        <CardHeader className="space-y-4 text-center pb-2">
          <div className="flex justify-center">
            <img src={edhLogo} alt="EDH Logo" className="w-40 h-40 object-contain" />
          </div>
          <div>
            <CardTitle className="text-3xl" style={{ color: "#1A1A1A" }}>Plateforme Zéro Papier</CardTitle>
            <CardDescription className="text-base mt-2">
              Système de gestion intégré pour l'Électricité d'Haïti
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="exemple@edh.ht"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="h-11">
                  <SelectValue placeholder="Sélectionnez votre rôle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="technicien">Technicien de terrain</SelectItem>
                  <SelectItem value="chef-technicien">Chef des techniciens</SelectItem>
                  <SelectItem value="agent">Agent service client</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              className="w-full h-11 text-white text-base"
              style={{ backgroundColor: "#F5A623" }}
            >
              Se connecter
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
