
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Eye, Maximize2, Minimize2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getARPointsForVehicle } from "@/data/arData";
import { vehicles } from "@/data/vehicles";
import { ARVisualizationPoint } from "@/types/vehicle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const ARVisualization = () => {
  const navigate = useNavigate();
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || "");
  const [arPoints, setArPoints] = useState<ARVisualizationPoint[]>([]);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [showLabels, setShowLabels] = useState(true);
  const [showIoTData, setShowIoTData] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<ARVisualizationPoint | null>(null);
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Load AR visualization points for selected vehicle
  useEffect(() => {
    if (!selectedVehicleId) return;
    const points = getARPointsForVehicle(selectedVehicleId);
    setArPoints(points);
  }, [selectedVehicleId]);

  // Get selected vehicle data
  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  const handlePointClick = (point: ARVisualizationPoint) => {
    setSelectedPoint(point);
    if (point.type === "critical") {
      toast.error(`Critical Issue: ${point.label}`, {
        description: point.description
      });
    } else if (point.type === "warning") {
      toast.warning(`Warning: ${point.label}`, {
        description: point.description
      });
    }
  };

  const getMarkerColor = (type: string) => {
    switch (type) {
      case "info": return "border-primary bg-primary/20";
      case "warning": return "border-warning bg-warning/20";
      case "critical": return "border-destructive bg-destructive/20";
      default: return "border-primary bg-primary/20";
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case "info": return "bg-primary text-primary-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "critical": return "bg-destructive text-destructive-foreground";
      default: return "bg-primary text-primary-foreground";
    }
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
            <h1 className="text-3xl font-bold">AR Fault Visualization</h1>
            <p className="text-muted-foreground mt-1">Visually inspect vehicle components and identify faults</p>
          </div>
          
          <div className="flex gap-2">
            <Select
              value={selectedVehicleId}
              onValueChange={setSelectedVehicleId}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select vehicle" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>{selectedVehicle?.name || "Vehicle"} - AR View</CardTitle>
                <div className="flex items-center gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(zoom + 10, 150))}>
                          <ZoomIn className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Zoom In</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(zoom - 10, 50))}>
                          <ZoomOut className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Zoom Out</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setRotation((rotation + 90) % 360)}>
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Rotate</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => setFullscreen(!fullscreen)}>
                          {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <CardDescription>
                Augmented Reality visualization with interactive component markers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                className={`relative bg-secondary/20 rounded-lg overflow-hidden transition-all border border-border ${fullscreen ? 'fixed top-0 left-0 w-full h-full z-50 p-4' : 'h-[500px]'}`}
                style={{ 
                  backgroundImage: `url(${selectedVehicle?.imageUrl})`,
                  backgroundSize: `${zoom}%`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  transform: `rotate(${rotation}deg)`
                }}
              >
                {fullscreen && (
                  <Button 
                    className="absolute top-4 right-4 z-10" 
                    size="sm" 
                    onClick={() => setFullscreen(false)}
                  >
                    <Minimize2 className="h-4 w-4 mr-2" />
                    Exit Fullscreen
                  </Button>
                )}
                
                {arPoints.map((point) => (
                  <TooltipProvider key={point.id}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          className={`absolute rounded-full border-2 ${getMarkerColor(point.type)} ${point.type === 'critical' ? 'animate-pulse' : ''} hover:scale-110 transition-transform focus:outline-none`}
                          style={{
                            left: `${point.position.x * 100}%`,
                            top: `${point.position.y * 100}%`,
                            width: '24px',
                            height: '24px',
                            transform: showLabels ? 'scale(1.2)' : 'scale(1)'
                          }}
                          onClick={() => handlePointClick(point)}
                        >
                          <span className="sr-only">{point.label}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{point.label}</span>
                            <Badge className={getBadgeColor(point.type)}>
                              {point.type}
                            </Badge>
                          </div>
                          {showIoTData && (
                            <span className="text-xs text-muted-foreground">Click for details</span>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
                
                {showLabels && (
                  <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg border border-border">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full border border-primary bg-primary/20`}></div>
                        <span className="text-xs">Information</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full border border-warning bg-warning/20`}></div>
                        <span className="text-xs">Warning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full border border-destructive bg-destructive/20 animate-pulse`}></div>
                        <span className="text-xs">Critical</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Visualization Controls</CardTitle>
              <CardDescription>Adjust display settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="zoom">Zoom ({zoom}%)</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={() => setZoom(Math.max(zoom - 10, 50))}>
                      <ZoomOut className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => setZoom(Math.min(zoom + 10, 150))}>
                      <ZoomIn className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Input
                  id="zoom"
                  type="range"
                  min="50"
                  max="150"
                  value={zoom}
                  onChange={(e) => setZoom(parseInt(e.target.value))}
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="rotation">Rotation ({rotation}°)</Label>
                  <Button variant="outline" size="icon" onClick={() => setRotation((rotation + 90) % 360)}>
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  id="rotation"
                  type="range"
                  min="0"
                  max="359"
                  step="15"
                  value={rotation}
                  onChange={(e) => setRotation(parseInt(e.target.value))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-labels">Show Labels</Label>
                  <p className="text-xs text-muted-foreground">Display component labels</p>
                </div>
                <Switch
                  id="show-labels"
                  checked={showLabels}
                  onCheckedChange={setShowLabels}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="show-iot">IoT Data Overlay</Label>
                  <p className="text-xs text-muted-foreground">Show real-time sensor data</p>
                </div>
                <Switch
                  id="show-iot"
                  checked={showIoTData}
                  onCheckedChange={setShowIoTData}
                />
              </div>
              
              <Button className="w-full mt-4" onClick={() => setFullscreen(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Enter AR View
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Dialog open={!!selectedPoint} onOpenChange={(open) => !open && setSelectedPoint(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedPoint?.label}</DialogTitle>
            <DialogDescription>Component details and diagnostic information</DialogDescription>
          </DialogHeader>
          {selectedPoint && (
            <div className="mt-4 space-y-4">
              <div className="rounded-lg overflow-hidden h-56">
                <img 
                  src={selectedPoint.imageUrl} 
                  alt={selectedPoint.label} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{selectedPoint.component}</h3>
                <Badge className={getBadgeColor(selectedPoint.type)}>
                  {selectedPoint.type}
                </Badge>
              </div>
              
              <p className="text-muted-foreground">{selectedPoint.description}</p>
              
              {showIoTData && selectedPoint.type !== "info" && (
                <div className="bg-secondary/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Sensor Readings</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Temperature:</span>
                      <span className={selectedPoint.type === "critical" ? "text-destructive font-medium" : ""}>
                        {75 + Math.floor(Math.random() * 40)}°C
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pressure:</span>
                      <span>
                        {30 + Math.floor(Math.random() * 30)} PSI
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Vibration:</span>
                      <span className={selectedPoint.type === "warning" ? "text-warning font-medium" : ""}>
                        {Math.floor(Math.random() * 10)} mm/s
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="flex justify-between pt-4">
                <Button variant="outline">View Documentation</Button>
                <Button>
                  {selectedPoint.type === "info" ? "Schedule Inspection" : "Request Repair"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ARVisualization;
