
import { VRTrainingModule } from "@/types/vehicle";

export const vrTrainingModules: VRTrainingModule[] = [
  {
    id: "vr-module-1",
    title: "Engine Diagnostics Fundamentals",
    description: "Learn the basics of engine diagnostic procedures using interactive 3D models and simulations.",
    duration: 45,
    difficulty: "beginner",
    steps: [
      {
        id: "step-1-1",
        title: "Engine Overview",
        description: "Explore the 3D model of the engine and identify key components.",
        imageUrl: "https://images.unsplash.com/photo-1613214150384-4868c5108116?w=500&auto=format&fit=crop"
      },
      {
        id: "step-1-2",
        title: "Basic Diagnostic Tools",
        description: "Learn to use diagnostic scanners and interpret error codes.",
        imageUrl: "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop"
      },
      {
        id: "step-1-3",
        title: "Common Faults",
        description: "Identify and troubleshoot common engine faults in virtual environment.",
        imageUrl: "https://images.unsplash.com/photo-1565103427314-ad79428ccbd3?w=500&auto=format&fit=crop"
      }
    ],
    componentsCovered: ["Engine Block", "Fuel Injection System", "Ignition System", "Sensors"],
    completionRate: 78
  },
  {
    id: "vr-module-2",
    title: "Hydraulic System Maintenance",
    description: "Comprehensive training on hydraulic system operation, maintenance, and troubleshooting.",
    duration: 60,
    difficulty: "intermediate",
    steps: [
      {
        id: "step-2-1",
        title: "Hydraulic Principles",
        description: "Review fundamental hydraulic principles with interactive fluid simulations.",
        imageUrl: "https://images.unsplash.com/photo-1577248139802-fa9105543362?w=500&auto=format&fit=crop"
      },
      {
        id: "step-2-2",
        title: "System Components",
        description: "Explore and interact with pumps, valves, cylinders, and other hydraulic components.",
        imageUrl: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=500&auto=format&fit=crop"
      },
      {
        id: "step-2-3",
        title: "Pressure Testing",
        description: "Perform virtual pressure tests and diagnose common hydraulic issues.",
        imageUrl: "https://images.unsplash.com/photo-1621905252574-c5c4dba1058e?w=500&auto=format&fit=crop"
      },
      {
        id: "step-2-4",
        title: "Repair Procedures",
        description: "Practice repair and maintenance procedures in a safe virtual environment.",
        imageUrl: "https://images.unsplash.com/photo-1621905252887-b2c211cb901d?w=500&auto=format&fit=crop"
      }
    ],
    componentsCovered: ["Pumps", "Valves", "Cylinders", "Hoses", "Fluid Reservoirs"],
    completionRate: 65
  },
  {
    id: "vr-module-3",
    title: "Advanced Electrical Diagnostics",
    description: "Master complex electrical systems diagnostics and repairs for heavy vehicles.",
    duration: 90,
    difficulty: "advanced",
    steps: [
      {
        id: "step-3-1",
        title: "Electrical Schematics",
        description: "Learn to read and interpret complex electrical schematics in 3D space.",
        imageUrl: "https://images.unsplash.com/photo-1565343976898-4099c7e2dcb8?w=500&auto=format&fit=crop"
      },
      {
        id: "step-3-2",
        title: "Diagnostic Equipment",
        description: "Use advanced multimeters, oscilloscopes, and specialized tools in VR.",
        imageUrl: "https://images.unsplash.com/photo-1601084881623-cdf9a8ea242c?w=500&auto=format&fit=crop"
      },
      {
        id: "step-3-3",
        title: "Troubleshooting Methodology",
        description: "Apply systematic troubleshooting to complex electrical faults.",
        imageUrl: "https://images.unsplash.com/photo-1581092921461-7d65ca45cf7b?w=500&auto=format&fit=crop"
      },
      {
        id: "step-3-4",
        title: "Computer Control Systems",
        description: "Diagnose and repair electronic control modules and networks.",
        imageUrl: "https://images.unsplash.com/photo-1563770557117-73e223615ed3?w=500&auto=format&fit=crop"
      }
    ],
    componentsCovered: ["Control Modules", "Sensors", "Actuators", "Wiring Harnesses", "Communication Networks"],
    completionRate: 42
  }
];
