
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VehicleModel } from "@/types/vehicle";
import { Link } from "react-router-dom";
import { Settings, AlertTriangle, CheckCircle } from "lucide-react";

interface VehicleCardProps {
  vehicle: VehicleModel;
}

export const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "maintenance": return "bg-warning text-warning-foreground";
      case "inactive": return "bg-secondary text-secondary-foreground";
      default: return "bg-primary";
    }
  };

  const getFaultIcon = (faultStatus: string) => {
    switch (faultStatus) {
      case "alert": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "normal": return <CheckCircle className="h-4 w-4 text-success" />;
      default: return null;
    }
  };

  return (
    <Link to={`/vehicle/${vehicle.id}`} className="block hover-scale focus:outline-none">
      <Card className="overflow-hidden h-full interactive-card card-gradient border-border/40">
        <div className="h-40 overflow-hidden relative">
          <img 
            src={vehicle.imageUrl} 
            alt={vehicle.name} 
            className="w-full h-full object-cover"
          />
          <Badge className={`absolute top-2 right-2 ${getStatusColor(vehicle.status)}`}>
            {vehicle.status}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1">{vehicle.name}</h3>
            <div className="flex items-center">
              {getFaultIcon(vehicle.faultStatus)}
            </div>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{vehicle.id}</span>
            <span>{vehicle.usageHours} hrs</span>
          </div>
          <div className="mt-3 text-xs flex items-center text-muted-foreground">
            <Settings className="h-3 w-3 mr-1" />
            <span>Last maintenance: {new Date(vehicle.lastMaintenance).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
