export interface HeroVehicle {
  id: string;
  tagLine: string;
  subtitle: string;
  image: string;
}

export interface HeroVehiclesResponse {
  heroVehicles: HeroVehicle[];
}
