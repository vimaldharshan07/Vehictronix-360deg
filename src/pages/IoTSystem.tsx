
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Battery, Droplet, Gauge, LayoutDashboard, RefreshCw, Search, Settings, Thermometer, Vibrate } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateSensorData, generateFaultLogs } from "@/data/iotData";
import { vehicles } from "@/data/vehicles";
import { IoTSensorData } from "@/types/vehicle";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const IoTSystem = () => {
  const navigate = useNavigate();
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || "");
  const [sensorData, setSensorData] = useState<IoTSensorData[]>([]);
  const [faultLogs, setFaultLogs] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [historicalData, setHistoricalData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Filter fault logs with search
  const filteredFaultLogs = faultLogs.filter(log => 
    log.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.severity.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Generate sensor data
  useEffect(() => {
    if (!selectedVehicleId) return;
    
    const data = generateSensorData(selectedVehicleId);
    setSensorData(data);
    setFaultLogs(generateFaultLogs(selectedVehicleId));
    
    // Generate historical data for charts
    const historical = Array.from({ length: 24 }, (_, i) => {
      const time = new Date();
      time.setHours(time.getHours() - (23 - i));
      
      return {
        time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: 80 + Math.random() * 40,
        pressure: 40 + Math.random() * 25,
        vibration: 0.5 + Math.random() * 3.5,
        voltage: 11.5 + Math.random() * 2.5
      };
    });
    setHistoricalData(historical);
    
    // Live data simulation
    let interval: any;
    if (isLive) {
      interval = setInterval(() => {
        const newData = generateSensorData(selectedVehicleId);
        setSensorData(newData);
        
        // Add a chance for a fault to appear
        if (Math.random() > 0.85) {
          const newFault = {
            id: `${selectedVehicleId}-fault-${Date.now()}`,
            timestamp: new Date().toISOString(),
            component: ["Engine", "Hydraulics", "Electrical", "Transmission", "Brakes"][Math.floor(Math.random() * 5)],
            description: ["High temperature detected", "Pressure drop", "Voltage fluctuation", "Abnormal vibration", "Low fluid level"][Math.floor(Math.random() * 5)],
            severity: Math.random() > 0.7 ? "critical" : "warning",
            status: "active"
          };
          setFaultLogs(prev => [newFault, ...prev]);
          
          if (newFault.severity === "critical") {
            toast.error(`Critical Alert: ${newFault.component}`, {
              description: newFault.description
            });
          } else {
            toast.warning(`Warning: ${newFault.component}`, {
              description: newFault.description
            });
          }
        }
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [selectedVehicleId, isLive]);

  const handleLiveToggle = () => {
    setIsLive(prev => !prev);
    toast.info(isLive ? "Live monitoring paused" : "Live monitoring activated");
  };

  const getSensorIcon = (type: string) => {
    switch (type) {
      case "temperature": return <Thermometer className="h-4 w-4 mr-2" />;
      case "pressure": return <Gauge className="h-4 w-4 mr-2" />;
      case "voltage": return <Battery className="h-4 w-4 mr-2" />;
      case "vibration": return <Vibrate className="h-4 w-4 mr-2" />;
      case "oil": return <Droplet className="h-4 w-4 mr-2" />;
      default: return <Settings className="h-4 w-4 mr-2" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal": return "bg-success text-success-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "critical": return "bg-destructive text-destructive-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "normal": return "text-success";
      case "warning": return "text-warning";
      case "critical": return "text-destructive";
      default: return "text-primary";
    }
  };

  const handleRefresh = () => {
    const data = generateSensorData(selectedVehicleId);
    setSensorData(data);
    setFaultLogs(generateFaultLogs(selectedVehicleId));
    toast.success("Sensor data refreshed");
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
            <h1 className="text-3xl font-bold">IoT Fault Detection</h1>
            <p className="text-muted-foreground mt-1">Monitor real-time sensor data and detect faults</p>
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
            
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            
            <Button 
              variant={isLive ? "default" : "outline"} 
              onClick={handleLiveToggle}
              className={isLive ? "bg-success hover:bg-success/90" : ""}
            >
              {isLive ? "Live: ON" : "Live: OFF"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {sensorData.slice(0, 4).map((sensor) => (
            <Card key={sensor.id} className={`transition-all ${sensor.status !== "normal" ? "border-warning/50" : ""}`}>
              <CardHeader className="p-4 pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {getSensorIcon(sensor.type)}
                    <CardTitle className="text-base capitalize">{sensor.type}</CardTitle>
                  </div>
                  <Badge className={getStatusColor(sensor.status)}>
                    {sensor.status}
                  </Badge>
                </div>
                <CardDescription>Current value</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="flex items-end justify-between">
                  <div className="text-2xl font-bold">{sensor.value}<span className="text-sm font-normal ml-1">{sensor.unit}</span></div>
                  <div className="flex flex-col text-xs text-muted-foreground">
                    <span>Min: {sensor.min}</span>
                    <span>Max: {sensor.max}</span>
                  </div>
                </div>
                
                <div className="mt-2">
                  <Progress 
                    value={(sensor.value - sensor.min) / (sensor.max - sensor.min) * 100} 
                    className={`h-2 ${getStatusClass(sensor.status)}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Temperature Trends</CardTitle>
              <CardDescription>24-hour historical data</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={historicalData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis 
                      dataKey="time" 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => value.split(':')[0]}
                    />
                    <YAxis />
                    <Tooltip contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '4px' }} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="temperature"
                      stroke="hsl(var(--primary))"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Sensor Comparison</CardTitle>
              <CardDescription>Current values across key metrics</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      ...sensorData.map(sensor => ({
                        name: sensor.type.charAt(0).toUpperCase() + sensor.type.slice(1),
                        value: sensor.value,
                        min: sensor.min,
                        max: sensor.max,
                        percentage: ((sensor.value - sensor.min) / (sensor.max - sensor.min) * 100).toFixed(0),
                        fill: sensor.status === "normal" ? "hsl(var(--primary))" : 
                               sensor.status === "warning" ? "hsl(var(--warning))" : "hsl(var(--destructive))"
                      }))
                    ]}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value, name, props) => [
                        `${value} (${props.payload.percentage}%)`, 
                        name
                      ]}
                      contentStyle={{ background: 'rgba(0, 0, 0, 0.8)', border: 'none', borderRadius: '4px' }}
                    />
                    <Legend />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Fault Detection Log</CardTitle>
                <CardDescription>Recent alerts and warnings from vehicle sensors</CardDescription>
              </div>
              <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search faults..." 
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Faults</TabsTrigger>
                <TabsTrigger value="all">All Faults</TabsTrigger>
                <TabsTrigger value="resolved">Resolved</TabsTrigger>
              </TabsList>
              
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Component</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaultLogs.length > 0 ? (
                    filteredFaultLogs.map((fault) => (
                      <TableRow key={fault.id}>
                        <TableCell>{new Date(fault.timestamp).toLocaleString()}</TableCell>
                        <TableCell className="font-medium">{fault.component}</TableCell>
                        <TableCell>{fault.description}</TableCell>
                        <TableCell>
                          <Badge className={
                            fault.severity === "critical" ? "bg-destructive text-destructive-foreground" : 
                            "bg-warning text-warning-foreground"
                          }>
                            {fault.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            fault.status === "active" ? "border-destructive text-destructive" : 
                            "border-success text-success"
                          }>
                            {fault.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8">
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            View in AR
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No faults found. The vehicle is operating normally.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IoTSystem;
