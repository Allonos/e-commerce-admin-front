export interface Car {
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

export interface CarResponse {
  cars: Car[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}
