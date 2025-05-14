export interface User {
  id: number;
  email: string;
  name: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserDto {
  email?: string;
  name?: string;
  password?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

export type Npc = {
  id: number;
  townId: number;
  town: Town;
  name: string;
  race: string;
  age: string;
  description: string;
  ocupation: string;
  history: string;
  interest: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Town = {
  id: number;
  name: string;
  size: string;
  whether: string;
  history: string;
  locationDescription: string;
  economy: string;
  criminality: string;
  createdAt: string;
  updatedAt: string;
  locations: Location[];
  npcs: Npc[];
};

export type Location = {
  id: number;
  name: string;
  description: string;
};

