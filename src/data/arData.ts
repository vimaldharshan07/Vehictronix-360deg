
import { ARVisualizationPoint } from "@/types/vehicle";

export const getARPointsForVehicle = (vehicleId: string): ARVisualizationPoint[] => {
  const points: ARVisualizationPoint[] = [
    {
      id: `${vehicleId}-ar-1`,
      vehicleId,
      position: { x: 0.35, y: 0.45, z: 0.1 },
      type: "info",
      label: "Engine Compartment",
      description: "Main power unit housing. Access panel requires removal of 4 bolts.",
      component: "Engine",
      imageUrl: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&auto=format&fit=crop"
    },
    {
      id: `${vehicleId}-ar-2`,
      vehicleId,
      position: { x: 0.2, y: 0.6, z: 0.2 },
      type: "warning",
      label: "Cooling System",
      description: "Radiator and cooling system. Warning: Temperature sensor indicates values above normal range.",
      component: "Radiator",
      imageUrl: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop"
    },
    {
      id: `${vehicleId}-ar-3`,
      vehicleId,
      position: { x: 0.5, y: 0.3, z: 0.15 },
      type: vehicleId === "CONST-003" ? "critical" : "info",
      label: "Hydraulic System",
      description: vehicleId === "CONST-003" ? "Critical failure detected in primary hydraulic circuit. Immediate maintenance required." : "Hydraulic system controls. Regular inspection recommended.",
      component: "Hydraulics",
      imageUrl: "https://images.unsplash.com/photo-1519823467902-30e3510003bc?w=500&auto=format&fit=crop"
    },
    {
      id: `${vehicleId}-ar-4`,
      vehicleId,
      position: { x: 0.7, y: 0.5, z: 0.1 },
      type: "info",
      label: "Transmission",
      description: "Automatic transmission system. Last serviced on 2024-02-15.",
      component: "Transmission",
      imageUrl: "https://images.unsplash.com/photo-1619438600624-a71d2a22e743?w=500&auto=format&fit=crop"
    },
    {
      id: `${vehicleId}-ar-5`,
      vehicleId,
      position: { x: 0.8, y: 0.2, z: 0.2 },
      type: vehicleId === "FIRE-002" ? "warning" : "info",
      label: "Electrical System",
      description: vehicleId === "FIRE-002" ? "Warning: Battery voltage fluctuations detected." : "Main electrical harness and control unit.",
      component: "Electrical",
      imageUrl: "https://images.unsplash.com/photo-1555436169-20e93ea9a7ff?w=500&auto=format&fit=crop"
    }
  ];

  // Add random position variations
  return points.map(point => ({
    ...point,
    position: {
      x: point.position.x + (Math.random() * 0.05 - 0.025),
      y: point.position.y + (Math.random() * 0.05 - 0.025),
      z: point.position.z
    }
  }));
};
