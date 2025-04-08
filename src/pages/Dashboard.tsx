
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ModuleCard } from "@/components/ModuleCard";
import { VehicleCard } from "@/components/VehicleCard";
import { vehicles } from "@/data/vehicles";
import { Database, Video, Monitor, Search, Settings, Train, ArrowDown, ArrowUp, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [activeTab, setActiveTab] = useState("all");
  const [stats, setStats] = useState({
    active: 0,
    maintenance: 0,
    inactive: 0,
    alerts: 0
  });
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  useEffect(() => {
    // Calculate dashboard stats
    setStats({
      active: vehicles.filter(v => v.status === "active").length,
      maintenance: vehicles.filter(v => v.status === "maintenance").length,
      inactive: vehicles.filter(v => v.status === "inactive").length,
      alerts: vehicles.filter(v => v.faultStatus !== "normal").length
    });
    
    // Welcome notification
    const timer = setTimeout(() => {
      toast.info("Welcome to Vehictronix360 Dashboard", {
        description: "Explore the modules to manage your vehicle fleet."
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter and sort vehicles
  const filteredVehicles = vehicles
    .filter((vehicle) => 
      (activeTab === "all" || vehicle.status === activeTab) &&
      (
        vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortBy === "name") {
        return sortOrder === "asc" 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      } else if (sortBy === "createdAt") {
        return sortOrder === "asc" 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "usageHours") {
        return sortOrder === "asc" 
          ? a.usageHours - b.usageHours 
          : b.usageHours - a.usageHours;
      }
      return 0;
    });
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <section className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Vehicles</p>
                    <h3 className="text-3xl font-bold">{stats.active}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Train className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">In Maintenance</p>
                    <h3 className="text-3xl font-bold">{stats.maintenance}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                    <Settings className="h-6 w-6 text-warning animate-spin-slow" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Inactive</p>
                    <h3 className="text-3xl font-bold">{stats.inactive}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-muted/40 flex items-center justify-center">
                    <Train className="h-6 w-6 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="card-gradient">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Active Alerts</p>
                    <h3 className="text-3xl font-bold">{stats.alerts}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-alert/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-alert animate-pulse" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ModuleCard
              title="Vehicle Data"
              description="Configure and view vehicle information"
              icon={Train}
              to="/vehicles"
              iconClassName="bg-primary/10"
            />
            <ModuleCard
              title="IoT Fault Detection"
              description="Real-time sensor monitoring and alerts"
              icon={Database}
              to="/iot"
              iconClassName="bg-primary/10"
            />
            <ModuleCard
              title="AR Visualization"
              description="Augmented reality fault visualization"
              icon={Monitor}
              to="/ar"
              iconClassName="bg-primary/10"
            />
            <ModuleCard
              title="VR Training"
              description="Virtual reality training environment"
              icon={Video}
              to="/vr"
              iconClassName="bg-primary/10"
            />
          </div>
        </section>
        
        <section className="animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Vehicle Fleet</h2>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Manage Fleet
            </Button>
          </div>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Vehicles</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="maintenance">In Maintenance</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Card className="mb-6 card-gradient">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search vehicles..."
                    className="pl-9 bg-background/50"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px] bg-background/50">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="createdAt">Creation Date</SelectItem>
                      <SelectItem value="usageHours">Usage Hours</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={toggleSortOrder}>
                    {sortOrder === "asc" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          
          {filteredVehicles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No vehicles found. Try adjusting your search.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
