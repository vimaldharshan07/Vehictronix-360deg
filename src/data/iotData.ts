
import { IoTSensorData } from "@/types/vehicle";

export const generateSensorData = (vehicleId: string, timestamp = new Date().toISOString()): IoTSensorData[] => {
  return [
    {
      id: `${vehicleId}-temp-1`,
      vehicleId,
      type: "temperature",
      value: Math.round((80 + Math.random() * 40) * 10) / 10,
      unit: "°C",
      timestamp,
      status: Math.random() > 0.8 ? "warning" : "normal",
      min: 75,
      max: 115,
      average: 92.5
    },
    {
      id: `${vehicleId}-pressure-1`,
      vehicleId,
      type: "pressure",
      value: Math.round((40 + Math.random() * 25) * 10) / 10,
      unit: "PSI",
      timestamp,
      status: Math.random() > 0.9 ? "critical" : Math.random() > 0.7 ? "warning" : "normal",
      min: 35,
      max: 65,
      average: 50
    },
    {
      id: `${vehicleId}-voltage-1`,
      vehicleId,
      type: "voltage",
      value: Math.round((11.5 + Math.random() * 2.5) * 10) / 10,
      unit: "V",
      timestamp,
      status: Math.random() > 0.85 ? "warning" : "normal",
      min: 11.2,
      max: 14.2,
      average: 12.8
    },
    {
      id: `${vehicleId}-vibration-1`,
      vehicleId,
      type: "vibration",
      value: Math.round((0.5 + Math.random() * 3.5) * 10) / 10,
      unit: "mm/s",
      timestamp,
      status: Math.random() > 0.75 ? "warning" : "normal",
      min: 0.2,
      max: 4.0,
      average: 1.5
    },
    {
      id: `${vehicleId}-fuel-1`,
      vehicleId,
      type: "fuel",
      value: Math.round(Math.random() * 100),
      unit: "%",
      timestamp,
      status: Math.random() < 0.2 ? "warning" : "normal",
      min: 0,
      max: 100,
      average: 60
    },
    {
      id: `${vehicleId}-oil-1`,
      vehicleId,
      type: "oil",
      value: Math.round((75 + Math.random() * 25) * 10) / 10,
      unit: "%",
      timestamp,
      status: "normal",
      min: 70,
      max: 100,
      average: 90
    },
    {
      id: `${vehicleId}-battery-1`,
      vehicleId,
      type: "battery",
      value: Math.round((11 + Math.random() * 3) * 10) / 10,
      unit: "V",
      timestamp,
      status: Math.random() > 0.9 ? "warning" : "normal",
      min: 10.8,
      max: 14.5,
      average: 13.2
    }
  ];
};

export const generateFaultLogs = (vehicleId: string) => {
  const faults = [
    {
      id: `${vehicleId}-fault-1`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      component: "Engine Cooling System",
      description: "Temperature exceeds normal operating range",
      severity: "warning",
      status: Math.random() > 0.5 ? "active" : "resolved"
    },
    {
      id: `${vehicleId}-fault-2`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
      component: "Hydraulic Pressure System",
      description: "Pressure drop detected in primary circuit",
      severity: Math.random() > 0.7 ? "critical" : "warning",
      status: Math.random() > 0.6 ? "active" : "resolved"
    },
    {
      id: `${vehicleId}-fault-3`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      component: "Battery System",
      description: "Voltage fluctuation outside normal parameters",
      severity: "warning",
      status: "resolved"
    },
    {
      id: `${vehicleId}-fault-4`,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      component: "Transmission",
      description: "Unusual vibration pattern detected",
      severity: Math.random() > 0.8 ? "critical" : "warning",
      status: "resolved"
    }
  ];

  return faults.filter(() => Math.random() > 0.3); // Randomly include only some faults
};
