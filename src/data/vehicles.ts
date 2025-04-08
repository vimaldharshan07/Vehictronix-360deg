import { VehicleModel } from "@/types/vehicle";

export const vehicles: VehicleModel[] = [
  {
    id: "BUS-001",
    name: "City Transit Bus XL-5000",
    type: "bus",
    status: "active",
    createdAt: "2023-06-15",
    usageHours: 2450,
    lastMaintenance: "2024-03-20",
    faultStatus: "normal",
    imageUrl: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?q=80&w=2940&auto=format&fit=crop",
    model: "XL-5000",
    manufacturer: "UrbanTransit Inc.",
    year: 2023,
    specs: {
      engine: "Cummins B6.7 Diesel Hybrid",
      power: "280 HP / 660 lb-ft",
      weight: "13,600 kg",
      dimensions: "12.2m x 2.55m x 3.4m",
      fuelType: "Diesel-Electric Hybrid",
      transmission: "Allison B500R"
    },
    maintenanceHistory: [
      {
        date: "2024-03-20",
        type: "Regular",
        description: "Scheduled 10,000 mile service",
        technician: "Maria Rodriguez",
        cost: 1250
      },
      {
        date: "2023-12-05",
        type: "Repair",
        description: "Brake system overhaul",
        technician: "John Deere",
        cost: 3200
      }
    ]
  },
  {
    id: "FIRE-002",
    name: "Fire Truck Responder 9000",
    type: "fire-truck",
    status: "active",
    createdAt: "2022-11-10",
    usageHours: 1245,
    lastMaintenance: "2024-02-15",
    faultStatus: "warning",
    imageUrl: "https://images.unsplash.com/photo-1600100591289-ad2087bcce22?q=80&w=1974&auto=format&fit=crop",
    model: "Responder 9000",
    manufacturer: "EmergencyTech",
    year: 2022,
    specs: {
      engine: "Detroit Diesel DD13",
      power: "525 HP / 1850 lb-ft",
      weight: "19,500 kg",
      dimensions: "10.5m x 2.6m x 3.8m",
      fuelType: "Diesel",
      transmission: "Allison 4000 EVS"
    },
    maintenanceHistory: [
      {
        date: "2024-02-15",
        type: "Inspection",
        description: "Annual pump testing and certification",
        technician: "Robert Chang",
        cost: 1800
      },
      {
        date: "2023-09-22",
        type: "Repair",
        description: "Hydraulic system pressure issue",
        technician: "Sarah Williams",
        cost: 4500
      }
    ]
  },
  {
    id: "CONST-003",
    name: "Heavy Excavator E-750",
    type: "construction",
    status: "maintenance",
    createdAt: "2021-09-22",
    usageHours: 3670,
    lastMaintenance: "2024-04-01",
    faultStatus: "alert",
    imageUrl: "https://images.unsplash.com/photo-1603321544554-9f4a331bf8ed?q=80&w=1974&auto=format&fit=crop",
    model: "E-750",
    manufacturer: "BuildCraft",
    year: 2021,
    specs: {
      engine: "Caterpillar C15",
      power: "428 HP / 1750 lb-ft",
      weight: "75,000 kg",
      dimensions: "11.2m x 3.5m x 4.2m",
      fuelType: "Diesel",
      transmission: "Powershift 5F/3R"
    },
    maintenanceHistory: [
      {
        date: "2024-04-01",
        type: "Major",
        description: "Hydraulic system overhaul",
        technician: "Mike Johnson",
        cost: 12500
      },
      {
        date: "2023-11-15",
        type: "Repair",
        description: "Track assembly replacement",
        technician: "David Kim",
        cost: 8700
      },
      {
        date: "2023-06-30",
        type: "Regular",
        description: "2000-hour service",
        technician: "Lisa Chen",
        cost: 3400
      }
    ]
  },
  {
    id: "BUS-004",
    name: "Electric Transit Bus E-2000",
    type: "bus",
    status: "active",
    createdAt: "2023-03-05",
    usageHours: 1120,
    lastMaintenance: "2024-03-10",
    faultStatus: "normal",
    imageUrl: "https://images.unsplash.com/photo-1594678780448-fea672d0e93d?q=80&w=2787&auto=format&fit=crop",
    model: "E-2000",
    manufacturer: "TransTech",
    year: 2023,
    specs: {
      engine: "Mercedes-Benz E200",
      power: "180 HP / 400 lb-ft",
      weight: "10,000 kg",
      dimensions: "10.5m x 2.5m x 3.2m",
      fuelType: "Electric",
      transmission: "E-CVT"
    },
    maintenanceHistory: [
      {
        date: "2024-03-10",
        type: "Regular",
        description: "Scheduled 5000 mile service",
        technician: "Emily Johnson",
        cost: 800
      },
      {
        date: "2023-08-15",
        type: "Repair",
        description: "Battery pack replacement",
        technician: "Alex Smith",
        cost: 1500
      }
    ]
  },
  {
    id: "EMR-005",
    name: "Ambulance Response Unit",
    type: "emergency",
    status: "active",
    createdAt: "2023-01-18",
    usageHours: 2210,
    lastMaintenance: "2024-02-28",
    faultStatus: "normal",
    imageUrl: "https://images.unsplash.com/photo-1613617639768-bc066d45527f?q=80&w=1942&auto=format&fit=crop",
    model: "Ambulance",
    manufacturer: "HealthCareTech",
    year: 2023,
    specs: {
      engine: "Volkswagen TDI",
      power: "150 HP / 350 lb-ft",
      weight: "7,500 kg",
      dimensions: "9.5m x 2.4m x 3.0m",
      fuelType: "Diesel",
      transmission: "6-speed manual"
    },
    maintenanceHistory: [
      {
        date: "2024-02-28",
        type: "Inspection",
        description: "Annual engine tune-up",
        technician: "James Brown",
        cost: 1200
      },
      {
        date: "2023-10-10",
        type: "Repair",
        description: "Brake system inspection",
        technician: "Samantha Davis",
        cost: 1000
      }
    ]
  },
  {
    id: "HAUL-006",
    name: "Mining Haul Truck H-3500",
    type: "mining",
    status: "active",
    createdAt: "2022-04-12",
    usageHours: 4580,
    lastMaintenance: "2024-01-25",
    faultStatus: "warning",
    imageUrl: "https://images.unsplash.com/photo-1562309555-a6e75287de44?q=80&w=1935&auto=format&fit=crop",
    model: "H-3500",
    manufacturer: "MiningTech",
    year: 2022,
    specs: {
      engine: "Komatsu K250",
      power: "600 HP / 1800 lb-ft",
      weight: "120,000 kg",
      dimensions: "12.5m x 3.8m x 4.5m",
      fuelType: "Diesel",
      transmission: "ZF 1000"
    },
    maintenanceHistory: [
      {
        date: "2024-01-25",
        type: "Major",
        description: "Engine overhaul",
        technician: "Chris Wilson",
        cost: 25000
      },
      {
        date: "2023-07-10",
        type: "Repair",
        description: "Track assembly replacement",
        technician: "Linda Johnson",
        cost: 10000
      },
      {
        date: "2023-03-15",
        type: "Regular",
        description: "2500-hour service",
        technician: "David Lee",
        cost: 5000
      }
    ]
  },
  {
    id: "FARM-007",
    name: "Agricultural Harvester A-200",
    type: "agricultural",
    status: "inactive",
    createdAt: "2021-08-30",
    usageHours: 3200,
    lastMaintenance: "2023-11-15",
    faultStatus: "normal",
    imageUrl: "https://images.unsplash.com/photo-1590923559909-eb5245128679?q=80&w=1965&auto=format&fit=crop",
    model: "A-200",
    manufacturer: "Agritech",
    year: 2021,
    specs: {
      engine: "John Deere 3200",
      power: "200 HP / 400 lb-ft",
      weight: "10,000 kg",
      dimensions: "10.0m x 2.5m x 3.0m",
      fuelType: "Diesel",
      transmission: "6-speed manual"
    },
    maintenanceHistory: [
      {
        date: "2023-11-15",
        type: "Regular",
        description: "2000-hour service",
        technician: "Michael Brown",
        cost: 3000
      },
      {
        date: "2023-05-10",
        type: "Repair",
        description: "Brake system inspection",
        technician: "Emily Davis",
        cost: 1500
      }
    ]
  },
  {
    id: "CONST-008",
    name: "Mobile Crane MC-500",
    type: "construction",
    status: "active",
    createdAt: "2022-06-25",
    usageHours: 2840,
    lastMaintenance: "2024-03-05",
    faultStatus: "normal",
    imageUrl: "https://images.unsplash.com/photo-1589756713299-be2388b3179f?q=80&w=1972&auto=format&fit=crop",
    model: "MC-500",
    manufacturer: "ConstructionTech",
    year: 2022,
    specs: {
      engine: "Caterpillar C15",
      power: "428 HP / 1750 lb-ft",
      weight: "75,000 kg",
      dimensions: "11.2m x 3.5m x 4.2m",
      fuelType: "Diesel",
      transmission: "Powershift 5F/3R"
    },
    maintenanceHistory: [
      {
        date: "2024-03-05",
        type: "Regular",
        description: "2000-hour service",
        technician: "David Lee",
        cost: 3000
      },
      {
        date: "2023-10-10",
        type: "Repair",
        description: "Track assembly replacement",
        technician: "Linda Johnson",
        cost: 10000
      }
    ]
  },
  {
    id: "WASTE-009",
    name: "Waste Collection Truck W-100",
    type: "utility",
    status: "maintenance",
    createdAt: "2022-10-10",
    usageHours: 2050,
    lastMaintenance: "2024-04-02",
    faultStatus: "alert",
    imageUrl: "https://images.unsplash.com/photo-1563254336574-f8325043f1f0?q=80&w=1935&auto=format&fit=crop",
    model: "W-100",
    manufacturer: "WasteTech",
    year: 2022,
    specs: {
      engine: "Cummins B6.7 Diesel",
      power: "280 HP / 660 lb-ft",
      weight: "13,600 kg",
      dimensions: "12.2m x 2.55m x 3.4m",
      fuelType: "Diesel-Electric Hybrid",
      transmission: "Allison B500R"
    },
    maintenanceHistory: [
      {
        date: "2024-04-02",
        type: "Major",
        description: "Engine overhaul",
        technician: "John Deere",
        cost: 25000
      },
      {
        date: "2023-08-15",
        type: "Repair",
        description: "Brake system inspection",
        technician: "Samantha Davis",
        cost: 1500
      }
    ]
  }
];
