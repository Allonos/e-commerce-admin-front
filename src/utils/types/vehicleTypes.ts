export type Transmission = "AUTOMATIC" | "MANUAL" | "SEMI_AUTOMATIC" | "CVT";
export type FuelType =
  | "GASOLINE"
  | "DIESEL"
  | "ELECTRIC"
  | "HYBRID"
  | "PLUG_IN_HYBRID"
  | "LPG"
  | "CNG"
  | "HYDROGEN";
export type VehicleCondition = "NEW" | "USED";
export type VehicleStatus = "ACTIVE" | "INACTIVE" | "SOLD";

export interface Vehicle {
  createdAt: string;
  id: string;
  images: string[];
  location: string;
  modelId: string;
  price: number;
  year: number;
  owner: {
    id: string;
    username: string;
  };
  make: {
    id: string;
    name: string;
  };
  model: {
    id: string;
    name: string;
  };
  type: {
    id: string;
    name: string;
  };
  lot: string;
  status: VehicleStatus;
  isFeatured: boolean;
  priority: number;
  views: number;
  mileage: number;
  engine: number;
  transmission: Transmission;
  condition: VehicleCondition;
  fuelType: FuelType;
}

export interface VehicleResponse {
  vehicles: Vehicle[];
  page: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}
