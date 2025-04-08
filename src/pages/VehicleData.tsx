
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronDown, Clock, Database, Filter, Plus, Search, Settings, Train } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { vehicles } from "@/data/vehicles";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { VehicleModel } from "@/types/vehicle";
import { toast } from "sonner";

const VehicleData = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<"table" | "grid">("table");
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(null);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Filter vehicles based on search term
  const filteredVehicles = vehicles.filter(vehicle => 
    vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehicle.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditVehicle = (vehicle: VehicleModel) => {
    setSelectedVehicle(vehicle);
    toast.info(`Editing ${vehicle.name}`, {
      description: "This functionality is under development."
    });
  };

  const handleDeleteVehicle = (vehicle: VehicleModel) => {
    toast.error(`Are you sure you want to delete ${vehicle.name}?`, {
      description: "This action cannot be undone.",
      action: {
        label: "Confirm",
        onClick: () => toast.success("Vehicle deleted successfully!")
      }
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Vehicle Configuration</h1>
            <p className="text-muted-foreground mt-1">Manage and configure your vehicle fleet</p>
          </div>
          
          <div className="flex gap-2">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Vehicle
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Vehicle Fleet</CardTitle>
              <div className="flex gap-2">
                <Tabs value={view} onValueChange={(v) => setView(v as "table" | "grid")}>
                  <TabsList>
                    <TabsTrigger value="table">Table</TabsTrigger>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            <CardDescription>
              Manage all your vehicles and their configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search vehicles..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 h-4 w-4" />
                    Options
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>View Options</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Export to CSV</DropdownMenuItem>
                  <DropdownMenuItem>Print List</DropdownMenuItem>
                  <DropdownMenuItem>Bulk Edit</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {view === "table" ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Usage Hours</TableHead>
                      <TableHead>Last Maintenance</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVehicles.map((vehicle) => (
                      <TableRow key={vehicle.id} className="cursor-pointer hover:bg-muted/30" onClick={() => handleEditVehicle(vehicle)}>
                        <TableCell className="font-medium">{vehicle.name}</TableCell>
                        <TableCell>{vehicle.id}</TableCell>
                        <TableCell className="capitalize">{vehicle.type}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              vehicle.status === "active" ? "default" :
                              vehicle.status === "maintenance" ? "outline" : "secondary"
                            }
                          >
                            {vehicle.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{vehicle.usageHours}</TableCell>
                        <TableCell>{vehicle.lastMaintenance}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <Settings className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                handleEditVehicle(vehicle);
                              }}>
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Maintenance History</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteVehicle(vehicle);
                                }}
                                className="text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {filteredVehicles.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No vehicles found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="cursor-pointer hover:bg-secondary/20 transition-colors" onClick={() => handleEditVehicle(vehicle)}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-secondary/40 h-12 w-12 rounded-full flex items-center justify-center shrink-0">
                          <Train className="h-6 w-6 text-foreground" />
                        </div>
                        <div className="overflow-hidden">
                          <h3 className="font-medium truncate">{vehicle.name}</h3>
                          <p className="text-sm text-muted-foreground">{vehicle.id}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Badge 
                          variant={
                            vehicle.status === "active" ? "default" :
                            vehicle.status === "maintenance" ? "outline" : "secondary"
                          }
                        >
                          {vehicle.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{vehicle.usageHours} hrs</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Database className="h-3 w-3" />
                          <span>{new Date(vehicle.lastMaintenance).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                {filteredVehicles.length === 0 && (
                  <div className="text-center py-12 col-span-full">
                    <p className="text-muted-foreground">No vehicles found. Try adjusting your search.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default VehicleData;
