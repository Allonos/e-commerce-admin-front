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
  status: string;
}

export interface VehicleResponse {
  vehicles: Vehicle[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}
