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
}

export interface CarResponse {
  cars: Car[];
}
