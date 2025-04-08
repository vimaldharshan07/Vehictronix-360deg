
export interface VehicleModel {
  id: string;
  name: string;
  type: string;
  status: "active" | "maintenance" | "inactive";
  createdAt: string;
  usageHours: number;
  lastMaintenance: string;
  faultStatus: "normal" | "warning" | "alert";
  imageUrl: string;
  // Added properties
  model: string;
  manufacturer: string;
  year: number;
  specs: {
    engine: string;
    power: string;
    weight: string;
    dimensions: string;
    fuelType: string;
    transmission: string;
  };
  maintenanceHistory: {
    date: string;
    type: string;
    description: string;
    technician: string;
    cost: number;
  }[];
}

export interface IoTSensorData {
  id: string;
  vehicleId: string;
  type: "temperature" | "pressure" | "voltage" | "vibration" | "fuel" | "oil" | "battery";
  value: number;
  unit: string;
  timestamp: string;
  status: "normal" | "warning" | "critical";
  min: number;
  max: number;
  average: number;
}

export interface ARVisualizationPoint {
  id: string;
  vehicleId: string;
  position: { x: number; y: number; z: number };
  type: "info" | "warning" | "critical";
  label: string;
  description: string;
  component: string;
  imageUrl?: string;
}

export interface VRTrainingModule {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  difficulty: "beginner" | "intermediate" | "advanced";
  steps: {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
  }[];
  componentsCovered: string[];
  completionRate: number; // percentage
}
