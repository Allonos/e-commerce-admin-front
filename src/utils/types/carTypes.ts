export interface Car {
  createdAt: string;
  id: string;
  images: string[];
  location: string;
  model: string;
  price: number;
  year: string;
  owner: {
    id: string;
    username: string;
  };
  makes: string;
  type: string;
  lot: string;
}

export interface CarResponse {
  cars: Car[];
  page: number;
  totalPages: number;
  hasNextPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
}
